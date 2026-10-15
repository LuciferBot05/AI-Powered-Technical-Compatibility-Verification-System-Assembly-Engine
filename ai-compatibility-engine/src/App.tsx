import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.js';
import { Sidebar } from './components/Sidebar.js';
import { LandingPage } from './components/LandingPage.js';
import { Dashboard } from './components/Dashboard.js';
import { ConfigBuilder } from './components/ConfigBuilder.js';
import { CompatibilityResultsView } from './components/CompatibilityResultsView.js';
import { CompatibilityGraph } from './components/CompatibilityGraph.js';
import { SpecExtractor } from './components/SpecExtractor.js';
import { VisualAnalyzer } from './components/VisualAnalyzer.js';
import { ProductCatalog } from './components/ProductCatalog.js';
import { AnalyticsView } from './components/AnalyticsView.js';
import { AdminPanel } from './components/AdminPanel.js';

import { 
  fetchProducts, 
  deleteProduct, 
  checkCompatibility, 
  fetchAnalytics 
} from './services/api.js';
import { 
  Product, 
  ProductCategory, 
  CompatibilityCheckResult, 
  AnalyticsData 
} from './types.js';
import { PRESET_CONFIGURATIONS } from './data/presets.js';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [catalog, setCatalog] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Map<ProductCategory, Product>>(new Map());
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<CompatibilityCheckResult | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    total_checks: 142,
    compatible_configs_count: 118,
    incompatible_configs_count: 24,
    overall_success_rate: 83.1,
    potential_returns_prevented: 24,
    estimated_cost_saved_usd: 12400,
    top_conflict_types: [
      { type: 'CPU & MB Socket Mismatch', count: 12 },
      { type: 'RAM Generation (DDR4/DDR5)', count: 8 },
      { type: 'PSU Wattage Deficit', count: 6 },
      { type: 'GPU Length Clearance', count: 4 },
      { type: 'Cooler Height Clearance', count: 3 }
    ],
    category_distribution: [
      { category: 'cpu', count: 12 },
      { category: 'motherboard', count: 15 },
      { category: 'ram', count: 14 },
      { category: 'gpu', count: 12 },
      { category: 'psu', count: 10 },
      { category: 'storage', count: 10 },
      { category: 'cabinet', count: 8 },
      { category: 'cooler', count: 8 }
    ],
    recent_checks: []
  });

  // Load catalog & analytics on boot
  const refreshData = async () => {
    try {
      const prods = await fetchProducts();
      setCatalog(prods);
      const stats = await fetchAnalytics();
      setAnalytics(stats);
    } catch (err) {
      console.error('Failed loading data:', err);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleSelectProduct = (category: ProductCategory, product: Product | null) => {
    const updated = new Map(selectedProducts);
    if (product) {
      updated.set(category, product);
    } else {
      updated.delete(category);
    }
    setSelectedProducts(updated);
  };

  const handleClearAll = () => {
    setSelectedProducts(new Map());
    setEvaluationResult(null);
  };

  const handleCheckCompatibility = async (overrideProducts?: Product[]) => {
    const productsToEvaluate = overrideProducts || Array.from(selectedProducts.values());
    if (productsToEvaluate.length === 0) return;

    setIsEvaluating(true);
    try {
      const productIds = productsToEvaluate.map(p => p.id);
      const result = await checkCompatibility(productIds, 'Interactive Verification Assembly');
      setEvaluationResult(result);
      setActiveTab('results');
      refreshData();
    } catch (err) {
      console.error('Check failed:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleLoadPreset = (presetId: string) => {
    const preset = PRESET_CONFIGURATIONS.find(p => p.id === presetId);
    if (!preset) return;

    const newMap = new Map<ProductCategory, Product>();
    preset.product_ids.forEach(id => {
      const prod = catalog.find(p => p.id === id);
      if (prod) {
        newMap.set(prod.category, prod);
      }
    });

    setSelectedProducts(newMap);
    handleCheckCompatibility(Array.from(newMap.values()) as Product[]);
  };

  const handleRunDemoScenario = () => {
    handleLoadPreset('preset_am5_compatible');
  };

  const handleReplaceComponent = (failingCategory: string, newProduct: Product) => {
    const updated = new Map(selectedProducts);
    updated.set(failingCategory as ProductCategory, newProduct);
    setSelectedProducts(updated);
    handleCheckCompatibility(Array.from(updated.values()) as Product[]);
  };

  const handleDeleteProductFromCatalog = async (id: string) => {
    try {
      await deleteProduct(id);
      refreshData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onQuickDemoClick={handleRunDemoScenario} 
      />

      <div className="flex flex-1">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          productsCount={catalog.length} 
        />

        <main className="flex-1 overflow-y-auto">
          {activeTab === 'landing' && (
            <LandingPage 
              onStartClick={() => setActiveTab('builder')} 
              onExploreCatalogClick={() => setActiveTab('products')} 
            />
          )}

          {activeTab === 'dashboard' && (
            <Dashboard 
              analytics={analytics} 
              onNavigateToBuilder={() => setActiveTab('builder')} 
              onRunDemoScenario={handleRunDemoScenario} 
            />
          )}

          {activeTab === 'builder' && (
            <ConfigBuilder 
              catalog={catalog} 
              selectedProducts={selectedProducts} 
              onSelectProduct={handleSelectProduct} 
              onCheckCompatibility={() => handleCheckCompatibility()} 
              onLoadPreset={handleLoadPreset} 
              isEvaluating={isEvaluating} 
              evaluationResult={evaluationResult} 
              onClearAll={handleClearAll} 
            />
          )}

          {activeTab === 'results' && evaluationResult && (
            <CompatibilityResultsView 
              result={evaluationResult} 
              onReplaceComponent={handleReplaceComponent} 
              onViewGraphClick={() => setActiveTab('graph')} 
            />
          )}

          {activeTab === 'graph' && (
            <CompatibilityGraph 
              graph={evaluationResult?.graph || null} 
              products={Array.from(selectedProducts.values())} 
            />
          )}

          {activeTab === 'extractor' && (
            <SpecExtractor onProductAdded={refreshData} />
          )}

          {activeTab === 'visual' && (
            <VisualAnalyzer />
          )}

          {activeTab === 'products' && (
            <ProductCatalog 
              products={catalog} 
              onDeleteProduct={handleDeleteProductFromCatalog} 
              onOpenAddModal={() => setActiveTab('admin')} 
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView analytics={analytics} />
          )}

          {activeTab === 'admin' && (
            <AdminPanel onDatabaseUpdated={refreshData} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
