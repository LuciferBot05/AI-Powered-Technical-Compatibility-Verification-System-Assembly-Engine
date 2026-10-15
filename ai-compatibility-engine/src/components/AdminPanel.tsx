import React, { useState, useEffect } from 'react';
import { Settings, Plus, RefreshCw, Database, ShieldCheck, FileJson, AlertTriangle } from 'lucide-react';
import { fetchRules, resetDatabase, createProduct } from '../services/api.js';
import { ProductCategory, Product } from '../types.js';

interface AdminPanelProps {
  onDatabaseUpdated: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onDatabaseUpdated }) => {
  const [rules, setRules] = useState<any[]>([]);
  const [isResetting, setIsResetting] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State for new product
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('AMD');
  const [model, setModel] = useState('');
  const [category, setCategory] = useState<ProductCategory>('cpu');
  const [price, setPrice] = useState('299');
  const [socket, setSocket] = useState('AM5');
  const [ramType, setRamType] = useState('DDR5');
  const [formFactor, setFormFactor] = useState('ATX');
  const [tdpWatts, setTdpWatts] = useState('105');
  const [powerWatts, setPowerWatts] = useState('250');
  const [gpuLengthMm, setGpuLengthMm] = useState('300');

  useEffect(() => {
    fetchRules().then(res => setRules(res.rules)).catch(console.error);
  }, []);

  const handleReset = async () => {
    if (!confirm('Reset entire catalog to default 80+ realistic seed products?')) return;
    setIsResetting(true);
    try {
      await resetDatabase();
      onDatabaseUpdated();
    } catch (err) {
      console.error(err);
    } finally {
      setIsResetting(false);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category) return;

    const specs: any = {};
    if (socket) specs.socket = socket;
    if (ramType) specs.ram_type = ramType;
    if (formFactor) specs.form_factor = formFactor;
    if (tdpWatts) specs.tdp_watts = Number(tdpWatts);
    if (powerWatts) specs.power_watts = Number(powerWatts);
    if (gpuLengthMm) specs.gpu_length_mm = Number(gpuLengthMm);

    const newProd: Partial<Product> = {
      name,
      brand,
      model: model || name,
      category,
      price: Number(price) || 199,
      verified_status: 'VERIFIED',
      confidence_score: 98,
      specs
    };

    try {
      await createProduct(newProd);
      onDatabaseUpdated();
      setShowAddModal(false);
      setName('');
      setModel('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-400" />
            <span>Compatibility Rule Engine Admin</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage deterministic rule sets, add custom hardware specs, or reset database seed catalog.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Product</span>
          </button>

          <button
            onClick={handleReset}
            disabled={isResetting}
            className="bg-slate-800 hover:bg-rose-900/50 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-500/40 font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
            <span>Reset Seed Database</span>
          </button>
        </div>
      </div>

      {/* Rules Registry List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Active Deterministic Validation Rules ({rules.length})</span>
        </h3>

        <div className="space-y-3">
          {rules.map(rule => (
            <div key={rule.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{rule.name}</span>
                  <span className="bg-indigo-500/10 text-indigo-300 font-mono text-[10px] px-2 py-0.5 rounded border border-indigo-500/20">
                    {rule.category}
                  </span>
                </div>
                <p className="text-slate-400">{rule.description}</p>
              </div>

              <span className="bg-rose-500/10 text-rose-400 font-mono font-bold text-[10px] px-2.5 py-1 rounded-full border border-rose-500/20 self-start md:self-auto">
                {rule.severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Add Custom Product */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateProduct} className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">Add Product to Normalized Catalog</h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. AMD Ryzen 9 7950X"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Brand</label>
                <input
                  type="text"
                  required
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                  placeholder="e.g. AMD / NVIDIA"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as ProductCategory)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  <option value="cpu">cpu</option>
                  <option value="motherboard">motherboard</option>
                  <option value="ram">ram</option>
                  <option value="gpu">gpu</option>
                  <option value="psu">psu</option>
                  <option value="storage">storage</option>
                  <option value="cabinet">cabinet</option>
                  <option value="cooler">cooler</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Price ($)</label>
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Socket (e.g. AM5, LGA1700)</label>
                <input
                  type="text"
                  value={socket}
                  onChange={e => setSocket(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">RAM Generation (DDR4 / DDR5)</label>
                <input
                  type="text"
                  value={ramType}
                  onChange={e => setRamType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Form Factor (ATX, Micro-ATX)</label>
                <input
                  type="text"
                  value={formFactor}
                  onChange={e => setFormFactor(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Power / TDP Watts</label>
                <input
                  type="number"
                  value={tdpWatts}
                  onChange={e => setTdpWatts(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-xs font-semibold text-slate-400 hover:text-white px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
