import express from 'express';
import path from 'path';
// import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

import { db } from './src/server/db.js';
import { evaluateCompatibility } from './src/server/engine.js';
import { generateAIExplanation, extractSpecsFromText, analyzeVisualComponentImage } from './src/server/gemini.js';
import { Product, CompatibilityCheckResult } from './src/types.js';

dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __filename = __filename;
// const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json({ limit: '20mb' }));

  // --- REST API ENDPOINTS ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'AI Compatibility Engine', timestamp: new Date().toISOString() });
  });

  // GET /api/products (with search and filters)
  app.get('/api/products', (req, res) => {
    const { category, search, brand, socket, limit } = req.query;
    let products = db.getAllProducts();

    if (category) {
      products = products.filter(p => p.category.toLowerCase() === String(category).toLowerCase());
    }

    if (brand) {
      products = products.filter(p => p.brand.toLowerCase() === String(brand).toLowerCase());
    }

    if (socket) {
      products = products.filter(p => p.specs.socket?.toLowerCase() === String(socket).toLowerCase());
    }

    if (search) {
      const q = String(search).toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        (p.specs.socket && p.specs.socket.toLowerCase().includes(q)) ||
        (p.specs.chipset && p.specs.chipset.toLowerCase().includes(q)) ||
        (p.specs.ram_type && p.specs.ram_type.toLowerCase().includes(q))
      );
    }

    if (limit) {
      products = products.slice(0, Number(limit));
    }

    res.json({ count: products.length, products });
  });

  // GET /api/products/:id
  app.get('/api/products/:id', (req, res) => {
    const product = db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  });

  // POST /api/products
  app.post('/api/products', (req, res) => {
    const newProduct: Product = {
      id: req.body.id || `prod_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: req.body.name,
      brand: req.body.brand || 'Generic Brand',
      model: req.body.model || 'Model X',
      category: req.body.category,
      price: req.body.price || 99,
      verified_status: req.body.verified_status || 'NEEDS_VERIFICATION',
      confidence_score: req.body.confidence_score || 85,
      specs: req.body.specs || {},
      created_at: new Date().toISOString()
    };

    const created = db.addProduct(newProduct);
    res.status(201).json(created);
  });

  // PUT /api/products/:id
  app.put('/api/products/:id', (req, res) => {
    const updated = db.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updated);
  });

  // DELETE /api/products/:id
  app.delete('/api/products/:id', (req, res) => {
    const deleted = db.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ success: true, id: req.params.id });
  });

  // POST /api/products/import
  app.post('/api/products/import', (req, res) => {
    const items: Product[] = req.body.products || [];
    let importedCount = 0;
    items.forEach(item => {
      if (item.name && item.category) {
        db.addProduct({
          ...item,
          id: item.id || `prod_imp_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
          created_at: item.created_at || new Date().toISOString()
        });
        importedCount++;
      }
    });
    res.json({ success: true, count: importedCount, total_catalog: db.getAllProducts().length });
  });

  // POST /api/products/reset
  app.post('/api/products/reset', (req, res) => {
    db.resetToSeed();
    res.json({ success: true, message: 'Database reset to default realistic seed products', total: db.getAllProducts().length });
  });

  // POST /api/compatibility/check
  app.post('/api/compatibility/check', async (req, res) => {
    try {
      const { product_ids, configuration_name } = req.body;
      let products: Product[] = [];

      if (Array.isArray(product_ids)) {
        products = product_ids
          .map((id: string) => db.getProductById(id))
          .filter((p): p is Product => p !== undefined);
      } else if (Array.isArray(req.body.products)) {
        products = req.body.products;
      }

      if (products.length === 0) {
        return res.status(400).json({ error: 'No valid products provided for compatibility evaluation.' });
      }

      // Step 1: Run Deterministic Engine
      const evalResult = evaluateCompatibility(products);

      // Step 2: Call Gemini AI for natural language explanation
      const partialCheckResult: Omit<CompatibilityCheckResult, 'ai_summary_explanation'> = {
        id: `check_${Date.now()}`,
        timestamp: new Date().toISOString(),
        configuration_name: configuration_name || 'Custom PC Assembly',
        ...evalResult,
        products_analyzed: products
      };

      const aiExplanation = await generateAIExplanation(partialCheckResult);

      const fullCheckResult: CompatibilityCheckResult = {
        ...partialCheckResult,
        ai_summary_explanation: aiExplanation
      };

      // Record check to DB analytics history
      db.recordCheck(fullCheckResult);

      res.json(fullCheckResult);
    } catch (err: any) {
      console.error('Error in /api/compatibility/check:', err);
      res.status(500).json({ error: 'Failed to process compatibility verification.', details: err.message });
    }
  });

  // POST /api/ai/extract-specifications
  app.post('/api/ai/extract-specifications', async (req, res) => {
    try {
      const { text } = req.body;
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Text prompt or raw datasheet string required.' });
      }

      const extractionResult = await extractSpecsFromText(text);
      res.json(extractionResult);
    } catch (err: any) {
      console.error('Error in /api/ai/extract-specifications:', err);
      res.status(500).json({ error: 'Failed to extract specifications using AI.', details: err.message });
    }
  });

  // POST /api/ai/visual-analysis
  app.post('/api/ai/visual-analysis', async (req, res) => {
    try {
      const { image_base64, mime_type } = req.body;
      if (!image_base64) {
        return res.status(400).json({ error: 'Base64 image string required.' });
      }

      const visualResult = await analyzeVisualComponentImage(image_base64, mime_type || 'image/png');
      res.json(visualResult);
    } catch (err: any) {
      console.error('Error in /api/ai/visual-analysis:', err);
      res.status(500).json({ error: 'Failed visual analysis.', details: err.message });
    }
  });

  // GET /api/analytics
  app.get('/api/analytics', (req, res) => {
    res.json(db.getAnalytics());
  });

  // GET /api/rules
  app.get('/api/rules', (req, res) => {
    res.json({
      rules: [
        { id: 'RULE_SOCKET_MATCH', category: 'CPU / Motherboard', name: 'CPU Socket Match', severity: 'CRITICAL', description: 'Ensures CPU socket matches Motherboard socket exactly (e.g., AM5 == AM5).' },
        { id: 'RULE_RAM_TYPE_MATCH', category: 'RAM / Motherboard', name: 'RAM Generation Support', severity: 'CRITICAL', description: 'Verifies motherboard DIMM slots match RAM generation (DDR4 vs DDR5).' },
        { id: 'RULE_FORM_FACTOR_MATCH', category: 'Motherboard / Cabinet', name: 'Form Factor Clearance', severity: 'CRITICAL', description: 'Checks if chassis supports motherboard form factor (ATX, Micro-ATX, ITX).' },
        { id: 'RULE_GPU_LENGTH_CLEARANCE', category: 'GPU / Cabinet', name: 'GPU Physical Clearance', severity: 'CRITICAL', description: 'Checks if GPU length (mm) is within chassis maximum clearance.' },
        { id: 'RULE_COOLER_HEIGHT_CLEARANCE', category: 'Cooler / Cabinet', name: 'Cooler Side Panel Clearance', severity: 'CRITICAL', description: 'Checks if CPU cooler height (mm) is within case side panel clearance.' },
        { id: 'RULE_COOLER_SOCKET_SUPPORT', category: 'Cooler / CPU', name: 'Cooler Bracket Support', severity: 'CRITICAL', description: 'Confirms cooler mounting bracket supports target CPU socket.' },
        { id: 'RULE_PSU_WATTAGE_DEFICIT', category: 'PSU / System Load', name: 'PSU Capacity & Headroom', severity: 'CRITICAL', description: 'Calculates total peak power load + 25% safety headroom vs PSU wattage.' }
      ]
    });
  });

  // --- VITE / STATIC SERVING ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
