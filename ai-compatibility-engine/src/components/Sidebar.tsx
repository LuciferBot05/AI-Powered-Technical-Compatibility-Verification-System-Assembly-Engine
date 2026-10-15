import React from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  GitFork, 
  FileJson, 
  Eye, 
  Database, 
  TrendingDown, 
  Settings, 
  Home,
  CheckCircle2
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  productsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, productsCount }) => {
  const navItems = [
    { id: 'landing', label: 'Home / Hero', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'builder', label: 'Configuration Builder', icon: Layers, badge: 'Core' },
    { id: 'graph', label: 'Compatibility Graph', icon: GitFork },
    { id: 'extractor', label: 'AI Spec Extractor', icon: FileJson },
    { id: 'visual', label: 'Visual Analyzer', icon: Eye },
    { id: 'products', label: 'Product Database', icon: Database, count: productsCount },
    { id: 'analytics', label: 'Returns & Analytics', icon: TrendingDown },
    { id: 'admin', label: 'Admin Panel', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 min-h-[calc(100vh-57px)]">
      <div className="p-4 space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Main Navigation
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-indigo-500/30">
                  {item.badge}
                </span>
              )}
              {item.count !== undefined && (
                <span className="bg-slate-800 text-slate-400 text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border border-slate-700">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-4 m-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Rule Engine Active</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Deterministic specs validation enabled. Socket, RAM generation, PCIe & PSU headroom rules online.
        </p>
      </div>
    </aside>
  );
};
