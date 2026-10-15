import React from 'react';
import { Cpu, ShieldCheck, Sparkles, AlertTriangle, Layers } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onQuickDemoClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onQuickDemoClick }) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div 
          onClick={() => setActiveTab('landing')}
          className="cursor-pointer flex items-center gap-2.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-emerald-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">AI Compatibility Engine</h1>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Guaranteed Fit
              </span>
            </div>
            <p className="text-xs text-slate-400">Verify Before You Buy • Technical Spec Validation Engine</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onQuickDemoClick}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98]"
          title="Run scenario test: 100% Compatible AM5 -> Replace with Incompatible AM4 -> View Conflict"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Launch Verification Demo</span>
        </button>

        <button
          onClick={() => setActiveTab('builder')}
          className={`text-xs font-medium px-3 py-2 rounded-lg border transition-all flex items-center gap-1.5 ${
            activeTab === 'builder'
              ? 'bg-slate-800 text-white border-slate-700'
              : 'text-slate-300 border-slate-800 hover:bg-slate-800/50 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>Config Builder</span>
        </button>
      </div>
    </header>
  );
};
