import React, { useState } from 'react';
import { 
  GitFork, 
  CheckCircle2, 
  AlertOctagon, 
  AlertTriangle, 
  Cpu, 
  Info, 
  X,
  Zap,
  HardDrive,
  Monitor,
  Box,
  Fan
} from 'lucide-react';
import { CompatibilityGraphData, GraphNode, GraphEdge, Product } from '../types.js';

interface CompatibilityGraphProps {
  graph: CompatibilityGraphData | null;
  products: Product[];
}

export const CompatibilityGraph: React.FC<CompatibilityGraphProps> = ({ graph, products }) => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<GraphEdge | null>(null);

  if (!graph || graph.nodes.length === 0) {
    return (
      <div className="p-12 text-center space-y-4 max-w-xl mx-auto my-12 bg-slate-900 border border-slate-800 rounded-3xl">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
          <GitFork className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white">No Configuration Graph Generated</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Select components in the Configuration Builder and run "CHECK COMPATIBILITY" to construct an interactive compatibility graph.
        </p>
      </div>
    );
  }

  const categoryIcons: Record<string, any> = {
    cpu: Cpu,
    motherboard: Monitor,
    ram: HardDrive,
    gpu: Cpu,
    psu: Zap,
    storage: HardDrive,
    cabinet: Box,
    cooler: Fan
  };

  const selectedProductDetails = selectedNode 
    ? products.find(p => p.id === selectedNode.id)
    : null;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <GitFork className="w-5 h-5 text-indigo-400" />
            <span>Interactive Multi-Component Compatibility Graph</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Visual relationship map representing hardware interface dependencies and conflict boundaries.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Compatible
          </span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block animate-pulse" /> Conflict
          </span>
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> Warning
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Node Grid Canvas representation */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Configuration Components ({graph.nodes.length})
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {graph.nodes.map(node => {
              const Icon = categoryIcons[node.category] || Cpu;
              const isSelected = selectedNode?.id === node.id;
              const isConflict = node.status === 'INCOMPATIBLE';

              return (
                <div
                  key={node.id}
                  onClick={() => {
                    setSelectedNode(node);
                    setSelectedEdge(null);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/30'
                      : isConflict
                      ? 'bg-rose-950/20 border-rose-500/50 hover:border-rose-400 shadow-md shadow-rose-950/30'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isConflict ? 'bg-rose-500/20 text-rose-400' : 'bg-indigo-500/10 text-indigo-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      isConflict ? 'bg-rose-500 text-white' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {node.status}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{node.category}</span>
                    <h4 className="text-xs font-bold text-white line-clamp-2">{node.label}</h4>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Relationship Edges List */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Component Connection Edges ({graph.edges.length})
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {graph.edges.map(edge => {
                const isConflictEdge = edge.status === 'INCOMPATIBLE';
                const sourceNode = graph.nodes.find(n => n.id === edge.source);
                const targetNode = graph.nodes.find(n => n.id === edge.target);

                return (
                  <div
                    key={edge.id}
                    onClick={() => {
                      setSelectedEdge(edge);
                      setSelectedNode(null);
                    }}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      isConflictEdge
                        ? 'bg-rose-950/30 border-rose-500/50 text-rose-200 hover:bg-rose-900/40'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-bold text-white truncate max-w-[120px]">{sourceNode?.label || edge.source}</span>
                      <span className="text-[10px] text-slate-500 font-mono">↔</span>
                      <span className="font-bold text-white truncate max-w-[120px]">{targetNode?.label || edge.target}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isConflictEdge ? 'bg-rose-500 text-white' : 'bg-indigo-500/20 text-indigo-300'
                      }`}>
                        {edge.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Inspector Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-400" />
            <span>Inspector Panel</span>
          </h3>

          {selectedNode && selectedProductDetails && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">{selectedProductDetails.category}</span>
                  <h4 className="text-sm font-bold text-white">{selectedProductDetails.name}</h4>
                </div>
                <button onClick={() => setSelectedNode(null)} className="text-slate-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Brand:</span>
                  <span className="font-bold text-white">{selectedProductDetails.brand}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Model:</span>
                  <span className="font-bold text-white">{selectedProductDetails.model}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Price:</span>
                  <span className="font-mono font-bold text-emerald-400">${selectedProductDetails.price}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Normalized Specs:</span>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-indigo-300 space-y-1">
                  {Object.entries(selectedProductDetails.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-slate-500">{key}:</span>
                      <span className="text-slate-200">{Array.isArray(val) ? val.join(', ') : String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedEdge && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-sm font-bold text-white">Edge Relationship Inspector</h4>
                <button onClick={() => setSelectedEdge(null)} className="text-slate-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-semibold block text-[11px]">Relationship Type:</span>
                  <p className="font-bold text-indigo-300 font-mono">{selectedEdge.relationship}</p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-semibold block text-[11px]">Rule Status Reason:</span>
                  <p className="text-slate-200 leading-relaxed">{selectedEdge.reason}</p>
                </div>
              </div>
            </div>
          )}

          {!selectedNode && !selectedEdge && (
            <div className="py-12 text-center text-slate-500 text-xs">
              Click on any component node or connection edge in the graph to inspect detailed technical properties.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
