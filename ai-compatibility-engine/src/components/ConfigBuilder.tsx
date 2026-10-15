import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  RefreshCw, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  ChevronRight, 
  Cpu, 
  HardDrive, 
  Monitor, 
  Box, 
  Fan, 
  Check, 
  X,
  Search,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { Product, ProductCategory, CompatibilityCheckResult } from '../types.js';
import { PRESET_CONFIGURATIONS } from '../data/presets.js';

interface ConfigBuilderProps {
  catalog: Product[];
  selectedProducts: Map<ProductCategory, Product>;
  onSelectProduct: (category: ProductCategory, product: Product | null) => void;
  onCheckCompatibility: () => void;
  onLoadPreset: (presetId: string) => void;
  isEvaluating: boolean;
  evaluationResult: CompatibilityCheckResult | null;
  onClearAll: () => void;
}

const CATEGORY_SLOTS: { category: ProductCategory; label: string; icon: any; required: boolean }[] = [
  { category: 'cpu', label: 'Processor (CPU)', icon: Cpu, required: true },
  { category: 'motherboard', label: 'Motherboard', icon: Monitor, required: true },
  { category: 'ram', label: 'Memory (RAM)', icon: HardDrive, required: true },
  { category: 'gpu', label: 'Graphics Card (GPU)', icon: Cpu, required: true },
  { category: 'psu', label: 'Power Supply (PSU)', icon: Zap, required: true },
  { category: 'storage', label: 'Storage (SSD/HDD)', icon: HardDrive, required: false },
  { category: 'cabinet', label: 'Case / Chassis', icon: Box, required: true },
  { category: 'cooler', label: 'CPU Cooler', icon: Fan, required: false }
];

export const ConfigBuilder: React.FC<ConfigBuilderProps> = ({
  catalog,
  selectedProducts,
  onSelectProduct,
  onCheckCompatibility,
  onLoadPreset,
  isEvaluating,
  evaluationResult,
  onClearAll
}) => {
  const [activeSlotModal, setActiveSlotModal] = useState<ProductCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate quick estimate wattage
  const selectedList = Array.from(selectedProducts.values()) as Product[];
  let estimatedWatts = 35;
  selectedList.forEach(p => {
    if (p.category === 'cpu') estimatedWatts += (p.specs.tdp_watts || 105);
    if (p.category === 'gpu') estimatedWatts += (p.specs.power_watts || 220);
    if (p.category === 'ram') estimatedWatts += 12;
    if (p.category === 'storage') estimatedWatts += 8;
    if (p.category === 'cooler') estimatedWatts += (p.specs.power_watts || 8);
  });
  estimatedWatts += 20; // fans overhead

  const psuProduct = selectedProducts.get('psu');
  const psuWatts = psuProduct?.specs.power_watts || 0;
  const isPowerDeficit = psuWatts > 0 && psuWatts < estimatedWatts;

  const currentModalCategory = activeSlotModal;
  const modalProducts = currentModalCategory 
    ? catalog.filter(p => p.category === currentModalCategory && (
        !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.specs.socket && p.specs.socket.toLowerCase().includes(searchQuery.toLowerCase()))
      ))
    : [];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header & Presets Launcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Visual System Configuration Builder</span>
            <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-full font-semibold">
              Live Inspector
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Add components or select a pre-configured scenario to evaluate deterministic hardware compatibility rules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClearAll}
            className="text-xs font-semibold text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-800 px-3 py-2 rounded-xl transition-all"
          >
            Clear Configuration
          </button>

          <button
            onClick={onCheckCompatibility}
            disabled={selectedList.length === 0 || isEvaluating}
            className={`font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 ${
              selectedList.length > 0
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            {isEvaluating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Evaluating Technical Rules...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>CHECK COMPATIBILITY ({selectedList.length} Items)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preset Quick Loader Buttons */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>Quick Scenario Presets (1-Click Verification Demo)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_CONFIGURATIONS.map(preset => (
            <button
              key={preset.id}
              onClick={() => onLoadPreset(preset.id)}
              className="text-left bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/50 p-3.5 rounded-xl space-y-2 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {preset.name}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                  preset.tag === 'COMPATIBLE' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}>
                  {preset.tag}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {preset.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Estimated System Power Load Meter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            isPowerDeficit ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
          }`}>
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Estimated System Peak Power Draw:</span>
              <span className="text-sm font-mono font-extrabold text-indigo-400">{estimatedWatts} Watts</span>
            </div>
            <p className="text-[11px] text-slate-400">
              {psuProduct ? (
                <>Selected PSU: <span className="font-semibold text-white">{psuProduct.name} ({psuWatts}W)</span></>
              ) : (
                'Add a Power Supply (PSU) to verify wattage headroom.'
              )}
            </p>
          </div>
        </div>

        {isPowerDeficit && (
          <div className="bg-rose-500/10 border border-rose-500/30 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-rose-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Power Deficit: PSU ({psuWatts}W) &lt; Estimated Peak ({estimatedWatts}W)</span>
          </div>
        )}
      </div>

      {/* Component Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CATEGORY_SLOTS.map(slot => {
          const Icon = slot.icon;
          const selected = selectedProducts.get(slot.category);

          return (
            <div
              key={slot.category}
              className={`bg-slate-900 border rounded-2xl p-4 flex items-center justify-between gap-4 transition-all ${
                selected 
                  ? 'border-indigo-500/40 bg-slate-900/90 shadow-md shadow-indigo-950/20' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  selected ? 'bg-indigo-600/20 border border-indigo-500/40 text-indigo-400' : 'bg-slate-800 text-slate-500'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{slot.label}</span>
                    {slot.required && <span className="text-[10px] text-rose-400 font-semibold">*Required</span>}
                  </div>

                  {selected ? (
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white truncate">{selected.name}</p>
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400">
                        {selected.specs.socket && <span className="bg-slate-800 text-indigo-300 font-mono px-2 py-0.5 rounded border border-slate-700">Socket: {selected.specs.socket}</span>}
                        {selected.specs.ram_type && <span className="bg-slate-800 text-purple-300 font-mono px-2 py-0.5 rounded border border-slate-700">RAM: {selected.specs.ram_type}</span>}
                        {selected.specs.form_factor && <span className="bg-slate-800 text-emerald-300 font-mono px-2 py-0.5 rounded border border-slate-700">Form: {selected.specs.form_factor}</span>}
                        {selected.specs.tdp_watts && <span className="bg-slate-800 text-amber-300 font-mono px-2 py-0.5 rounded border border-slate-700">TDP: {selected.specs.tdp_watts}W</span>}
                        {selected.specs.power_watts && <span className="bg-slate-800 text-amber-300 font-mono px-2 py-0.5 rounded border border-slate-700">Power: {selected.specs.power_watts}W</span>}
                        {selected.specs.gpu_length_mm && <span className="bg-slate-800 text-cyan-300 font-mono px-2 py-0.5 rounded border border-slate-700">Len: {selected.specs.gpu_length_mm}mm</span>}
                        {selected.specs.max_gpu_length_mm && <span className="bg-slate-800 text-cyan-300 font-mono px-2 py-0.5 rounded border border-slate-700">Max GPU: {selected.specs.max_gpu_length_mm}mm</span>}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic">No component selected</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {selected ? (
                  <>
                    <button
                      onClick={() => {
                        setActiveSlotModal(slot.category);
                        setSearchQuery('');
                      }}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 px-3 py-1.5 rounded-lg transition-all"
                    >
                      Swap
                    </button>
                    <button
                      onClick={() => onSelectProduct(slot.category, null)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setActiveSlotModal(slot.category);
                      setSearchQuery('');
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Select</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Selection Modal */}
      {activeSlotModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white capitalize">
                  Select {activeSlotModal} Component
                </h3>
                <p className="text-xs text-slate-400">Choose from normalized hardware product catalog</p>
              </div>

              <button
                onClick={() => setActiveSlotModal(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search filter input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeSlotModal} by brand, model, socket...`}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Modal Product List */}
            <div className="overflow-y-auto space-y-2 pr-1 flex-1">
              {modalProducts.length === 0 ? (
                <div className="py-8 text-center text-slate-500 text-xs">
                  No matching components found for this category.
                </div>
              ) : (
                modalProducts.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(activeSlotModal, p);
                      setActiveSlotModal(null);
                    }}
                    className="p-3 bg-slate-950/70 hover:bg-slate-800 border border-slate-800/80 rounded-xl flex items-center justify-between gap-4 cursor-pointer transition-all group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white group-hover:text-indigo-300">{p.name}</span>
                        <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">{p.brand}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-400">
                        {p.specs.socket && <span>Socket: <strong className="text-slate-200">{p.specs.socket}</strong></span>}
                        {p.specs.ram_type && <span>RAM: <strong className="text-slate-200">{p.specs.ram_type}</strong></span>}
                        {p.specs.form_factor && <span>Form: <strong className="text-slate-200">{p.specs.form_factor}</strong></span>}
                        {p.specs.tdp_watts && <span>TDP: <strong className="text-slate-200">{p.specs.tdp_watts}W</strong></span>}
                        {p.specs.power_watts && <span>Power: <strong className="text-slate-200">{p.specs.power_watts}W</strong></span>}
                        {p.specs.gpu_length_mm && <span>Len: <strong className="text-slate-200">{p.specs.gpu_length_mm}mm</strong></span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-emerald-400">${p.price}</span>
                      <div className="w-7 h-7 rounded-lg bg-indigo-600/20 group-hover:bg-indigo-600 text-indigo-300 group-hover:text-white flex items-center justify-center transition-all">
                        <Plus className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
