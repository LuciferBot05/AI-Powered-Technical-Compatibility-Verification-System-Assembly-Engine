import React from 'react';
import { 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingDown, 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  Layers, 
  Activity,
  DollarSign
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AnalyticsData } from '../types.js';

interface DashboardProps {
  analytics: AnalyticsData;
  onNavigateToBuilder: () => void;
  onRunDemoScenario: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ analytics, onNavigateToBuilder, onRunDemoScenario }) => {
  const chartColors = ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#06b6d4'];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner Callout for Demo */}
      <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Live Compatibility Verification Scenario</h2>
            <p className="text-xs text-slate-300">
              Run the full verification workflow: Test AM5 CPU + B650 Motherboard (Compatible 95+) → Swap motherboard to AM4 B450 → Observe deterministic Socket Conflict & Fix Recommendations.
            </p>
          </div>
        </div>

        <button
          onClick={onRunDemoScenario}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 whitespace-nowrap transition-all hover:scale-[1.02]"
        >
          <span>Run Live Demo Scenario</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Total Products</span>
            <Database className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">80+</div>
          <div className="text-[11px] text-slate-500">8 PC Categories</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Verified Specs</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">98.5%</div>
          <div className="text-[11px] text-slate-500">Confidence Score</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Checks Run</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{analytics.total_checks}</div>
          <div className="text-[11px] text-slate-500">Total Evaluations</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Guaranteed Fits</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">{analytics.compatible_configs_count}</div>
          <div className="text-[11px] text-emerald-500/80">{analytics.overall_success_rate}% Pass Rate</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Conflicts Blocked</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-rose-400">{analytics.incompatible_configs_count}</div>
          <div className="text-[11px] text-slate-500">Rule Collisions</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 bg-emerald-950/20 border-emerald-500/30 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-medium">Returns Saved</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-300">${analytics.estimated_cost_saved_usd.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-400/80">{analytics.potential_returns_prevented} Unit Returns Prevented</div>
        </div>
      </div>

      {/* Main Charts & Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Compatibility Conflicts Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Top Compatibility Conflicts Detected</h3>
              <p className="text-xs text-slate-400">Most frequent specification mismatches across checks</p>
            </div>
            <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
              Rule Analytics
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.top_conflict_types} layout="vertical" margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
                <XAxis type="number" stroke="#64748b" fontSize={11} />
                <YAxis dataKey="type" type="category" stroke="#94a3b8" fontSize={10} width={180} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                  {analytics.top_conflict_types.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Product Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Database Catalog Breakdown</h3>
          <p className="text-xs text-slate-400">Structured components in canonical database</p>

          <div className="space-y-2.5">
            {analytics.category_distribution.map(cat => (
              <div key={cat.category} className="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
                <span className="text-xs font-semibold text-slate-200 capitalize">{cat.category}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${(cat.count / 15) * 100}%` }} />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-300 w-6 text-right">{cat.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Checks Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Recent Compatibility Verifications</h3>
            <p className="text-xs text-slate-400">Live stream of evaluated configuration requests</p>
          </div>
          <button
            onClick={onNavigateToBuilder}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>Launch Config Builder</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Time</th>
                <th className="py-3 px-4 font-semibold">Components Included</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Score</th>
                <th className="py-3 px-4 font-semibold">Conflicts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {analytics.recent_checks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-500">
                    No checks evaluated yet. Click "Launch Verification Demo" or go to Config Builder.
                  </td>
                </tr>
              ) : (
                analytics.recent_checks.map(chk => (
                  <tr key={chk.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                      {new Date(chk.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3.5 px-4 max-w-md truncate font-medium text-slate-200">
                      {chk.products.join(', ')}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        chk.status === 'COMPATIBLE'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : chk.status === 'PARTIALLY_COMPATIBLE'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {chk.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold font-mono text-slate-200">
                      {chk.score}/100
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      {chk.conflict_count === 0 ? (
                        <span className="text-emerald-400 font-semibold">0 (Passed)</span>
                      ) : (
                        <span className="text-rose-400 font-bold">{chk.conflict_count} Conflict(s)</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
