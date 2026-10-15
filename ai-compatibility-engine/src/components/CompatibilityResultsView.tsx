import React from 'react';
import { 
  CheckCircle2, 
  AlertOctagon, 
  AlertTriangle, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  RefreshCw,
  GitFork,
  Check
} from 'lucide-react';
import { CompatibilityCheckResult, Product, CompatibilityConflict } from '../types.js';

interface CompatibilityResultsViewProps {
  result: CompatibilityCheckResult;
  onReplaceComponent: (failingCategoryId: string, newProduct: Product) => void;
  onViewGraphClick: () => void;
}

export const CompatibilityResultsView: React.FC<CompatibilityResultsViewProps> = ({
  result,
  onReplaceComponent,
  onViewGraphClick
}) => {
  const isCompatible = result.overall_status === 'COMPATIBLE';
  const isPartial = result.overall_status === 'PARTIALLY_COMPATIBLE';

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Top Verification Status Banner */}
      <div className={`border rounded-3xl p-8 relative overflow-hidden shadow-2xl transition-all ${
        isCompatible
          ? 'bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border-emerald-500/40 shadow-emerald-950/30'
          : isPartial
          ? 'bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-950 border-amber-500/40 shadow-amber-950/30'
          : 'bg-gradient-to-br from-rose-950/60 via-slate-900 to-slate-950 border-rose-500/40 shadow-rose-950/30'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border">
              {isCompatible && <span className="text-emerald-400 bg-emerald-500/10 border-emerald-500/20 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> VERIFIED FIT • GUARANTEED COMPATIBLE</span>}
              {isPartial && <span className="text-amber-400 bg-amber-500/10 border-amber-500/20 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> PARTIALLY COMPATIBLE • WARNINGS DETECTED</span>}
              {!isCompatible && !isPartial && <span className="text-rose-400 bg-rose-500/10 border-rose-500/20 flex items-center gap-1"><AlertOctagon className="w-3.5 h-3.5" /> HARD CONFLICT DETECTED • INCOMPATIBLE</span>}
            </div>

            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {isCompatible && 'System Configuration Fully Compatible!'}
              {isPartial && 'Configuration Has Minor Warnings'}
              {!isCompatible && !isPartial && 'Incompatible Assembly Detected'}
            </h1>

            <p className="text-xs text-slate-300 leading-relaxed">
              Tested {result.products_analyzed.length} products against {result.total_rules_evaluated} hardware validation rules ({result.passed_rules_count} Passed).
            </p>
          </div>

          <div className="flex items-center gap-6 bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 shrink-0">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</span>
              <div className={`text-4xl font-extrabold font-mono ${
                result.score >= 85 ? 'text-emerald-400' : result.score >= 60 ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {result.score}<span className="text-xs text-slate-500">/100</span>
              </div>
            </div>

            <div className="h-10 w-[1px] bg-slate-800" />

            <div className="text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Estimated Peak Draw</span>
              <div className="text-xl font-extrabold text-indigo-400 font-mono">
                {result.estimated_system_wattage}W
              </div>
              <span className="text-[10px] text-slate-400 block">Rec PSU: {result.recommended_psu_wattage}W</span>
            </div>

            <button
              onClick={onViewGraphClick}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
            >
              <GitFork className="w-4 h-4" />
              <span>View Graph</span>
            </button>
          </div>
        </div>
      </div>

      {/* Gemini AI Natural Language Analysis Box */}
      <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-6 space-y-3 relative overflow-hidden shadow-xl">
        <div className="flex items-center gap-2.5 text-purple-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Gemini AI Compatibility Explanation</span>
        </div>

        <p className="text-slate-200 text-xs leading-relaxed whitespace-pre-line font-sans">
          {result.ai_summary_explanation}
        </p>
      </div>

      {/* Conflicts & Spec Mismatches Section */}
      {result.conflicts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-rose-400" />
              <span>Critical Technical Conflicts ({result.conflicts.length})</span>
            </h3>
            <span className="text-xs text-slate-400">Must be resolved prior to purchase</span>
          </div>

          <div className="space-y-4">
            {result.conflicts.map(conflict => (
              <div
                key={conflict.id}
                className="bg-slate-900 border border-rose-500/40 rounded-2xl p-6 space-y-4 shadow-lg shadow-rose-950/20"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-rose-500/30">
                      {conflict.rule_id}
                    </span>
                    <h4 className="text-sm font-bold text-white">{conflict.rule_name}</h4>
                  </div>
                  <span className="text-[10px] font-bold uppercase bg-rose-500 text-white px-2.5 py-0.5 rounded-full w-fit">
                    {conflict.severity} CONFLICT
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-semibold block text-[11px]">Component A:</span>
                    <p className="text-white font-bold">{conflict.componentA_name}</p>
                    <p className="text-rose-400 font-mono text-[11px]">Expected: {conflict.expected}</p>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-semibold block text-[11px]">Component B:</span>
                    <p className="text-white font-bold">{conflict.componentB_name}</p>
                    <p className="text-rose-400 font-mono text-[11px]">Actual: {conflict.actual}</p>
                  </div>
                </div>

                <div className="bg-rose-950/30 border border-rose-500/20 p-4 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-rose-300">Technical Breakdown:</span>
                  <p className="text-slate-300 leading-relaxed">{conflict.explanation}</p>
                </div>

                <div className="bg-indigo-950/30 border border-indigo-500/20 p-4 rounded-xl text-xs space-y-2">
                  <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    <span>Recommended Resolution:</span>
                  </span>
                  <p className="text-slate-300 leading-relaxed">{conflict.fix_suggestion}</p>

                  {/* Recommended Alternatives 1-Click Swap */}
                  {conflict.recommended_alternatives && conflict.recommended_alternatives.length > 0 && (
                    <div className="pt-2 space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Compatible Replacements in Catalog:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {conflict.recommended_alternatives.map(alt => (
                          <div
                            key={alt.id}
                            className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-3 rounded-xl flex items-center justify-between gap-2"
                          >
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-white truncate">{alt.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono">${alt.price} • {alt.brand}</p>
                            </div>
                            <button
                              onClick={() => onReplaceComponent(alt.category, alt)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all shrink-0"
                            >
                              <span>1-Click Replace</span>
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* System Warnings Section */}
      {result.warnings.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Compatibility Warnings ({result.warnings.length})</span>
          </h3>

          <div className="space-y-2">
            {result.warnings.map(w => (
              <div key={w.id} className="bg-slate-900 border border-amber-500/30 p-4 rounded-xl text-xs space-y-1">
                <span className="font-bold text-amber-400">{w.type}:</span>
                <p className="text-slate-300">{w.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analyzed Product Spec Summary Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white">Verified Configuration Components ({result.products_analyzed.length})</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {result.products_analyzed.map(p => (
            <div key={p.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">{p.category}</span>
                <span className="text-[10px] font-mono text-slate-400">${p.price}</span>
              </div>
              <p className="text-xs font-bold text-white line-clamp-1">{p.name}</p>
              <div className="text-[10px] text-slate-400 space-y-0.5 font-mono">
                {p.specs.socket && <p>Socket: {p.specs.socket}</p>}
                {p.specs.ram_type && <p>RAM: {p.specs.ram_type}</p>}
                {p.specs.form_factor && <p>Form: {p.specs.form_factor}</p>}
                {p.specs.power_watts && <p>Power: {p.specs.power_watts}W</p>}
                {p.specs.gpu_length_mm && <p>Length: {p.specs.gpu_length_mm}mm</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
