import React from 'react';
import { TrendingDown, ShieldCheck, DollarSign, Activity, AlertOctagon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { AnalyticsData } from '../types.js';

interface AnalyticsViewProps {
  analytics: AnalyticsData;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ analytics }) => {
  const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#10b981'];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-emerald-400" />
            <span>Return Prevention & Financial Impact Analytics</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Quantifying customer cost savings and return reduction by catching physical and electrical mismatches pre-checkout.
          </p>
        </div>

        <div className="bg-emerald-950/40 border border-emerald-500/30 px-4 py-2 rounded-xl text-xs font-bold text-emerald-400 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>Estimated Savings: ${analytics.estimated_cost_saved_usd.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Verifications</span>
          <div className="text-3xl font-extrabold text-white font-mono">{analytics.total_checks}</div>
          <p className="text-[11px] text-slate-500">Evaluated against deterministic hardware rules</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Incompatibilities Blocked</span>
          <div className="text-3xl font-extrabold text-rose-400 font-mono">{analytics.incompatible_configs_count}</div>
          <p className="text-[11px] text-rose-400/80">Prevented physical assembly collisions</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Returns Saved</span>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">{analytics.potential_returns_prevented} Units</div>
          <p className="text-[11px] text-emerald-500">Zero shipping or return processing overhead</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Top Prevented Rule Collisions</h3>
          <p className="text-xs text-slate-400">Distribution of blocked hardware mismatches</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.top_conflict_types}>
                <XAxis dataKey="type" stroke="#64748b" fontSize={10} angle={-15} textAnchor="end" />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {analytics.top_conflict_types.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Catalog Product Category Breakdown</h3>
          <p className="text-xs text-slate-400">Total items maintained across canonical categories</p>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.category_distribution}
                  dataKey="count"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#6366f1"
                  label={({ category, count }) => `${category}: ${count}`}
                >
                  {analytics.category_distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
