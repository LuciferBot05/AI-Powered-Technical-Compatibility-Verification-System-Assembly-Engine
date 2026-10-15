import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  Layers, 
  GitFork, 
  TrendingDown, 
  FileCheck2,
  AlertOctagon
} from 'lucide-react';

interface LandingPageProps {
  onStartClick: () => void;
  onExploreCatalogClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartClick, onExploreCatalogClick }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-10 md:p-14 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verify Before You Buy — Zero Component Incompatibility</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Stop Buying <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Incompatible</span> Components.
          </h1>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            An enterprise AI-powered compatibility verification engine that normalizes raw technical specifications, evaluates deterministic hardware rules, and guarantees multi-component fit before checkout.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onStartClick}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Build & Check Configuration</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreCatalogClick}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 transition-all"
            >
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Explore Verified Catalog</span>
            </button>
          </div>

          <div className="flex items-center gap-6 pt-4 text-xs font-medium text-slate-400 border-t border-slate-800/80">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Socket & Chipset Validation</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> DDR Generation Match</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Physical Length & Clearance</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> PSU Peak Headroom</span>
          </div>
        </div>
      </div>

      {/* Visual Workflow Pipeline */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">System Workflow Architecture</h2>
          <p className="text-xs text-slate-400">How raw datasheets transform into deterministic verification reports</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 relative">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xs">01</div>
            <h3 className="text-sm font-semibold text-white">Product Datasheets</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Raw seller listings, engineering PDFs, or image specifications.</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 relative">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xs">02</div>
            <h3 className="text-sm font-semibold text-white">AI Normalization</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Gemini converts unstructured specs into structured JSON.</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 relative">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs">03</div>
            <h3 className="text-sm font-semibold text-white">Canonical Schema</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Maps "Socket-AM5" and "AM5 AMD" to standardized key = "AM5".</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 relative">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs">04</div>
            <h3 className="text-sm font-semibold text-white">Rule Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Deterministic technical rules calculate score & critical conflicts.</p>
          </div>

          <div className="bg-slate-900/80 border border-indigo-500/30 bg-indigo-950/20 rounded-2xl p-5 space-y-3 relative">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-bold text-xs">05</div>
            <h3 className="text-sm font-semibold text-white">Verified Fit Report</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Interactive graph, exact spec deltas, and replacement recommendations.</p>
          </div>
        </div>
      </div>

      {/* Feature Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Deterministic Rule Engine</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Never relies solely on an LLM for safety-critical checks. Hard mathematical rules evaluate physical clearance, electrical voltage, socket pins, and power headroom.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <GitFork className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Interactive Compatibility Graph</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Visualize relationships between CPU, Motherboard, RAM, GPU, PSU, Storage, Cooler, and Case. Red edges pinpoint exact conflict bottlenecks.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <TrendingDown className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Return Prevention Analytics</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Prevent costly shipping returns, destroyed hardware pins, and customer frustration before checkout occurs.
          </p>
        </div>
      </div>
    </div>
  );
};
