import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Plus, 
  CheckCircle2, 
  ShieldCheck, 
  Trash2, 
  Eye, 
  X,
  Filter,
  Cpu,
  Monitor,
  HardDrive,
  Zap,
  Box,
  Fan
} from 'lucide-react';
import { Product, ProductCategory } from '../types.js';

interface ProductCatalogProps {
  products: Product[];
  onDeleteProduct: (id: string) => void;
  onOpenAddModal: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onDeleteProduct,
  onOpenAddModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Hardware (80+)' },
    { id: 'cpu', label: 'CPUs' },
    { id: 'motherboard', label: 'Motherboards' },
    { id: 'ram', label: 'RAM Memory' },
    { id: 'gpu', label: 'GPUs' },
    { id: 'psu', label: 'Power Supplies' },
    { id: 'storage', label: 'Storage' },
    { id: 'cabinet', label: 'Cases' },
    { id: 'cooler', label: 'Coolers' }
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) || 
      p.model.toLowerCase().includes(q) ||
      (p.specs.socket && p.specs.socket.toLowerCase().includes(q)) ||
      (p.specs.ram_type && p.specs.ram_type.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-400" />
            <span>Normalized Product Catalog ({products.length} Items)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Structured specs repository with standardized socket, voltage, clearance, and form factor keys.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-1.5 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Product</span>
        </button>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs font-semibold px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Filter catalog by brand, model, socket (AM5, LGA1700), RAM (DDR5)..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Component</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Brand</th>
                <th className="py-3.5 px-4">Key Specs</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No products matched your filter query.
                  </td>
                </tr>
              ) : (
                filteredProducts.map(p => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white max-w-xs truncate">
                      {p.name}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-indigo-500/10 text-indigo-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-500/20 uppercase">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-300">
                      {p.brand}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                      {p.specs.socket && <span className="mr-2 text-indigo-300">Socket: {p.specs.socket}</span>}
                      {p.specs.ram_type && <span className="mr-2 text-purple-300">RAM: {p.specs.ram_type}</span>}
                      {p.specs.form_factor && <span className="mr-2 text-emerald-300">Form: {p.specs.form_factor}</span>}
                      {p.specs.power_watts && <span className="mr-2 text-amber-300">Power: {p.specs.power_watts}W</span>}
                      {p.specs.gpu_length_mm && <span className="mr-2 text-cyan-300">Len: {p.specs.gpu_length_mm}mm</span>}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                      ${p.price}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <ShieldCheck className="w-3 h-3" /> VERIFIED
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedProduct(p)}
                          className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-all"
                          title="View Specs JSON"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(p.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">{selectedProduct.category}</span>
                <h3 className="text-base font-bold text-white">{selectedProduct.name}</h3>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Brand:</span>
                <span className="font-bold text-white">{selectedProduct.brand}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Model:</span>
                <span className="font-bold text-white">{selectedProduct.model}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Price:</span>
                <span className="font-mono font-bold text-emerald-400">${selectedProduct.price}</span>
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Raw Canonical Specs JSON:</span>
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-indigo-300 overflow-x-auto max-h-60">
                {JSON.stringify(selectedProduct.specs, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
