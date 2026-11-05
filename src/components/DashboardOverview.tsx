import React from 'react';
import { 
  Sparkles, 
  Database, 
  CheckCircle2, 
  Clock, 
  AlertOctagon, 
  TrendingUp, 
  CircuitBoard, 
  ArrowRight, 
  BarChart3, 
  Radio, 
  Thermometer, 
  ShieldCheck, 
  Cpu,
  Bot
} from 'lucide-react';
import { EquipmentItem, ActivityItem, TabType } from '../types';
import { UsageChart } from './UsageChart';

interface DashboardOverviewProps {
  equipment: EquipmentItem[];
  bookingsCount: number;
  openFaultCount: number;
  activities: ActivityItem[];
  onNavigateTab: (tab: TabType) => void;
  onInspectEquipment: (id: string) => void;
  onQuickBook: (id: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  equipment,
  bookingsCount,
  openFaultCount,
  activities,
  onNavigateTab,
  onInspectEquipment,
  onQuickBook
}) => {
  const totalCount = equipment.length;
  const availableCount = equipment.filter(e => e.status === 'Available').length;

  return (
    <div className="space-y-6 w-full">
      {/* 1. Hero Promotional Banner (Fluid edge-to-edge) */}
      <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 glass-card border border-cyan-500/30 shadow-2xl">
        <div className="absolute -right-10 -top-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            Autonomous Scheduling & Calibration Active
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight mb-2">
            Next-Gen Academic Laboratory Intelligence.
          </h2>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-5">
            LABSYNC AI coordinates real-time equipment access, preventive maintenance prediction, ISO compliance audits, and instant copilot diagnostics across all engineering facilities.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('equipment')}
              className="btn-gradient px-4 py-2.5 rounded-xl text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4" /> Browse Smart Catalog
            </button>
            <button
              onClick={() => onNavigateTab('assistant')}
              className="px-4 py-2.5 rounded-xl glass-card hover:bg-slate-850 text-white font-semibold text-xs flex items-center gap-2 transition"
            >
              <Bot className="w-4 h-4 text-cyan-400" /> Open AI Troubleshooting
            </button>
          </div>
        </div>
      </div>

      {/* 2. Four Key Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Total Equipment */}
        <div className="p-5 rounded-2xl glass-card group hover:border-cyan-500/40 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Total Inventory</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">{totalCount}</div>
          <div className="flex items-center justify-between text-xs text-slate-400 mt-2 font-mono">
            <span className="text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 4 Complex Labs
            </span>
            <span>100% Tracked</span>
          </div>
        </div>

        {/* Ready to Checkout */}
        <div className="p-5 rounded-2xl glass-card group hover:border-emerald-500/40 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Ready to Checkout</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">{availableCount}</div>
          <div className="flex items-center justify-between text-xs text-slate-400 mt-2 font-mono">
            <span className="text-emerald-400">Instant Access</span>
            <span>{Math.round((availableCount / totalCount) * 100)}% Ready</span>
          </div>
        </div>

        {/* Active Bookings */}
        <div className="p-5 rounded-2xl glass-card group hover:border-amber-500/40 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Active Bookings</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-300">{bookingsCount}</div>
          <div className="flex items-center justify-between text-xs text-slate-400 mt-2 font-mono">
            <span className="text-amber-400">2 In-Use Now</span>
            <span>1 In Queue</span>
          </div>
        </div>

        {/* Open Faults */}
        <div className="p-5 rounded-2xl glass-card group hover:border-rose-500/40 transition">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Incidents / QA</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-rose-400">{openFaultCount}</div>
          <div className="flex items-center justify-between text-xs text-rose-400 mt-2 font-mono">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span> 1 In Repair
            </span>
            <span className="text-slate-400">1 Resolved</span>
          </div>
        </div>
      </div>

      {/* 3. COMPONENT PHOTOS ON DASHBOARD OVERVIEW (Requested feature) */}
      <div className="space-y-4 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CircuitBoard className="w-4 h-4 text-cyan-400" /> Active Lab Workstations & Component Nodes
            </h3>
            <p className="text-xs text-slate-400">
              Live monitored instruments with component photography, operating telemetry & health scores
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('equipment')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
          >
            Full Catalog ({equipment.length}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Featured Component Cards with Photography & Telemetry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {equipment.slice(0, 4).map((item) => {
            const isAvail = item.status === 'Available';
            const isInUse = item.status === 'In Use';

            return (
              <div
                key={item.id}
                className="rounded-3xl glass-card overflow-hidden flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition duration-300 group"
              >
                {/* Component Image Banner */}
                <div className="relative h-40 overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                  {/* Overlays */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-cyan-300 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur border border-cyan-500/30">
                      {item.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border flex items-center gap-1 backdrop-blur ${
                        isAvail
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : isInUse
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isAvail ? 'bg-emerald-400 animate-pulse' : isInUse ? 'bg-amber-400' : 'bg-rose-400'
                        }`}
                      ></span>
                      {item.status}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2.5 flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-slate-950/80 backdrop-blur px-2 py-0.5 rounded border border-slate-800">
                    <Cpu className="w-3 h-3" /> {item.zone} • {item.category}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-white text-xs group-hover:text-cyan-300 transition line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5 line-clamp-1">
                      {item.model}
                    </p>
                    <p className="text-[11px] text-slate-300/80 mt-2 line-clamp-2 leading-relaxed">
                      {item.specs}
                    </p>
                  </div>

                  {/* Mini Telemetry row + Inspect Button */}
                  <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <span className="text-emerald-400 flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3" /> {item.health}%
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-cyan-300 flex items-center gap-0.5">
                        <Thermometer className="w-3 h-3" /> {item.temp.split(' ')[0]}
                      </span>
                    </div>

                    <button
                      onClick={() => onInspectEquipment(item.id)}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
                    >
                      Inspect <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Telemetry Concurrency Chart & Real-Time Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Usage Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl glass-card flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" /> Workstation & Instrument Concurrency
              </h3>
              <p className="text-xs text-slate-400">
                Daily peak load across Robotics, Biotech, RF Circuits & GPU clusters
              </p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 bg-slate-900 text-cyan-300 rounded-lg border border-slate-800 self-start sm:self-auto">
              Past 7 Days
            </span>
          </div>

          <div className="h-60 relative w-full">
            <UsageChart />
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="p-6 rounded-3xl glass-card flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400" /> Real-Time Feed
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 animate-pulse">
              STREAM
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto text-xs pr-1">
            {activities.map((act) => (
              <div
                key={act.id}
                className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800/80 hover:border-cyan-500/30 transition"
              >
                <div className={`p-2 rounded-xl bg-slate-800 ${act.color} shrink-0 mt-0.5`}>
                  <CircuitBoard className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-200 text-xs truncate">{act.title}</p>
                  <p className="text-slate-400 text-[11px] leading-tight mt-0.5">{act.desc}</p>
                </div>
                <span className="text-[10px] text-slate-500 font-mono shrink-0">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
