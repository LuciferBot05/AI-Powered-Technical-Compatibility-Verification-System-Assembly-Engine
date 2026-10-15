import React, { useState } from 'react';
import { Eye, Sparkles, RefreshCw, Upload, Camera, ShieldCheck, AlertTriangle, Layers } from 'lucide-react';
import { analyzeVisualImage } from '../services/api.js';
import { VisualAnalysisResult } from '../types.js';

export const VisualAnalyzer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<VisualAnalysisResult | null>(null);

  // Default sample image generator (synthetic placeholder canvas data URI for demo testing)
  const loadSampleImage = (type: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 400, 300);
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 3;
      ctx.strokeRect(40, 40, 320, 220);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(`Hardware Spec Component: ${type}`, 60, 100);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px sans-serif';
      ctx.fillText('Pin Array Layout & Key Notch Slot', 60, 140);
      ctx.fillText('Mounting Hole Spacing: 75mm x 75mm', 60, 170);

      // Draw synthetic pin grid
      ctx.fillStyle = '#e2e8f0';
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 12; c++) {
          ctx.fillRect(60 + c * 20, 200 + r * 10, 8, 4);
        }
      }
    }
    const base64 = canvas.toDataURL('image/png').split(',')[1];
    setSelectedImage(canvas.toDataURL('image/png'));
    runAnalysis(base64);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setSelectedImage(dataUrl);
      const base64 = dataUrl.split(',')[1];
      runAnalysis(base64);
    };
    reader.readAsDataURL(file);
  };

  const runAnalysis = async (base64: string) => {
    setIsAnalyzing(true);
    try {
      const res = await analyzeVisualImage(base64, 'image/png');
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-400" />
            <span>AI Visual Connector & Pin Analysis</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Multimodal visual inspection of physical sockets, key notches, mounting standoffs, and power connectors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => loadSampleImage('AM5 Socket & LGA Pin Array')}
            className="text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3.5 py-2 rounded-xl transition-all"
          >
            Sample: AM5 Socket Image
          </button>
          <button
            onClick={() => loadSampleImage('12VHPWR 16-Pin GPU Connector')}
            className="text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3.5 py-2 rounded-xl transition-all"
          >
            Sample: 12VHPWR Connector
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload & Canvas Preview */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Component Image Input
            </span>

            <div className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 text-center space-y-3 transition-colors bg-slate-950/60">
              {selectedImage ? (
                <div className="space-y-3">
                  <img src={selectedImage} alt="Hardware preview" className="max-h-56 mx-auto rounded-xl border border-slate-800 shadow-lg" />
                  <p className="text-xs text-slate-400 font-mono">Image loaded for multimodal inspection</p>
                </div>
              ) : (
                <div className="py-8 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Upload Component or Connector Photo</p>
                    <p className="text-[11px] text-slate-500">PNG, JPG, or WEBP up to 10MB</p>
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="visual-upload"
              />
              <label
                htmlFor="visual-upload"
                className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-all shadow-md shadow-indigo-600/20"
              >
                Choose Image File
              </label>
            </div>
          </div>
        </div>

        {/* Multimodal Analysis Output */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Visual Inspection Results</h3>
              {result && (
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  {result.confidence_score}% Visual Match
                </span>
              )}
            </div>

            {isAnalyzing && (
              <div className="py-20 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
                <p className="text-xs font-bold text-white">Gemini 3.6 Flash Analyzing Physical Connectors & Pin Arrays...</p>
              </div>
            )}

            {!isAnalyzing && !result && (
              <div className="py-20 text-center text-slate-500 text-xs">
                Upload an image or select a sample button above to run visual compatibility inspection.
              </div>
            )}

            {!isAnalyzing && result && (
              <div className="mt-4 space-y-3 text-xs animate-fade-in">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Detected Component:</span>
                    <span className="font-bold text-white">{result.detected_category}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Connector / Slot Type:</span>
                    <span className="font-bold text-indigo-300 font-mono">{result.detected_connector}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Pin Count Estimate:</span>
                    <span className="font-bold text-slate-200">{result.pin_count_estimate}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Mounting Pattern:</span>
                    <span className="font-bold text-slate-200">{result.mounting_pattern}</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 block">Perceived Visual Characteristics:</span>
                  <p className="text-slate-300">{result.shape_and_form}</p>
                </div>

                <div className="bg-indigo-950/30 border border-indigo-500/20 p-3.5 rounded-xl space-y-1">
                  <span className="font-bold text-indigo-300 block">Compatibility Observations:</span>
                  <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                    {result.perceived_compatibility_notes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {result && (
            <div className="pt-3 border-t border-slate-800 text-[11px] font-bold text-amber-400 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{result.disclaimer}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
