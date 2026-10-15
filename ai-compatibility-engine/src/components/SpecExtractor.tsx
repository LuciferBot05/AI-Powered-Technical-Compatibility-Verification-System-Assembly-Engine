import React, { useState } from 'react';
import { 
  FileJson, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Layers, 
  FileText,
  Database
} from 'lucide-react';
import { extractSpecifications, createProduct } from '../services/api.js';
import { ExtractionResult, Product } from '../types.js';

interface SpecExtractorProps {
  onProductAdded: () => void;
}

const SAMPLE_TEXTS = [
  {
    title: 'Raw AMD Ryzen 7 7800X3D Listing',
    text: `AMD Ryzen 7 7800X3D Desktop Processor. 8 Cores 16 Threads, Socket AM5, 120W TDP, PCIe 5.0 Support. Requires DDR5 memory (DDR4 not supported). Features 104MB cache with 3D V-Cache technology.`
  },
  {
    title: 'Raw MSI B650 Motherboard Datasheet',
    text: `MSI B650 Gaming Plus WiFi ATX Gaming Motherboard. Supports AMD Ryzen 7000 Series Desktop Processors. Socket AM5. 4x DDR5 DIMM slots max 192GB 6000MHz+(OC). PCIe 4.0 x16 slot. 2x M.2 NVMe PCIe Gen4 slots. ATX form factor.`
  },
  {
    title: 'Raw ASUS ROG RTX 4090 GPU Spec Sheet',
    text: `ASUS ROG Strix GeForce RTX 4090 24GB GDDR6X. Card dimensions: 357.6 x 149.3 x 70.1 mm (Length 357.6mm). Requires 12VHPWR 16-pin power connector or 4x PCIe 8-pin adapters. Recommended PSU 850W minimum, 450W TDP.`
  }
];

export const SpecExtractor: React.FC<SpecExtractorProps> = ({ onProductAdded }) => {
  const [inputText, setInputText] = useState(SAMPLE_TEXTS[0].text);
  const [isExtracting, setIsExtracting] = useState(false);
  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleExtract = async () => {
    if (!inputText.trim()) return;
    setIsExtracting(true);
    setSaveSuccess(false);
    try {
      const res = await extractSpecifications(inputText);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSaveToCatalog = async () => {
    if (!result) return;
    setIsSaving(true);
    try {
      const newProd: Partial<Product> = {
        name: `${result.brand} ${result.model}`,
        brand: result.brand,
        model: result.model,
        category: result.category,
        price: 299,
        verified_status: result.needs_verification_fields.length > 0 ? 'NEEDS_VERIFICATION' : 'VERIFIED',
        confidence_score: result.overall_confidence,
        specs: result.specs
      };
      await createProduct(newProd);
      setSaveSuccess(true);
      onProductAdded();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <FileJson className="w-5 h-5 text-purple-400" />
            <span>AI Specification Extractor & Normalizer</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Convert unstructured text, engineering sheets, or product descriptions into canonical hardware schemas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {SAMPLE_TEXTS.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(sample.text);
                setResult(null);
                setSaveSuccess(false);
              }}
              className="text-[11px] font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-lg transition-all"
            >
              Sample #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Raw Datasheet or Unstructured Spec Text
          </label>

          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            rows={10}
            placeholder="Paste raw hardware description, datasheet bullet points, or seller text..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 resize-none flex-1"
          />

          <button
            onClick={handleExtract}
            disabled={isExtracting || !inputText.trim()}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/30 disabled:opacity-50"
          >
            {isExtracting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Gemini Extracting Specifications...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>EXTRACT SPECIFICATIONS WITH AI</span>
              </>
            )}
          </button>
        </div>

        {/* Output Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Extracted Canonical Output</h3>
              {result && (
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  {result.overall_confidence}% Confidence
                </span>
              )}
            </div>

            {!result && !isExtracting && (
              <div className="py-20 text-center text-slate-500 text-xs">
                Click "EXTRACT SPECIFICATIONS WITH AI" to view structured canonical schema output.
              </div>
            )}

            {result && (
              <div className="mt-4 space-y-4 animate-fade-in">
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Brand:</span>
                    <span className="font-bold text-white">{result.brand}</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Model:</span>
                    <span className="font-bold text-white">{result.model}</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Category:</span>
                    <span className="font-bold text-indigo-400 uppercase">{result.category}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Normalized Specification JSON:</span>
                  <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-purple-300 overflow-x-auto max-h-48">
                    {JSON.stringify(result.specs, null, 2)}
                  </pre>
                </div>

                {result.needs_verification_fields.length > 0 && (
                  <div className="bg-amber-950/30 border border-amber-500/30 p-3 rounded-xl text-xs flex items-center gap-2 text-amber-300">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Fields requiring verification (&lt;85% confidence): {result.needs_verification_fields.join(', ')}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {result && (
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              {saveSuccess ? (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Saved to Catalog!</span>
                </span>
              ) : (
                <button
                  onClick={handleSaveToCatalog}
                  disabled={isSaving}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all"
                >
                  <Database className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Product to Catalog'}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
