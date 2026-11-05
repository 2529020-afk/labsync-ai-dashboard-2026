import React from 'react';
import { 
  Cpu, 
  LayoutDashboard, 
  Microscope, 
  CalendarCheck, 
  Wrench, 
  Bot, 
  Activity, 
  Building2, 
  X,
  Radio
} from 'lucide-react';
import { TabType } from '../types';

interface SidebarProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  openFaultCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  isOpenMobile,
  onCloseMobile,
  openFaultCount
}) => {
  const navItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'equipment' as TabType, label: 'Smart Inventory', icon: Microscope, badge: '8' },
    { id: 'bookings' as TabType, label: 'Reservations & SOPs', icon: CalendarCheck },
    { id: 'faults' as TabType, label: 'Maintenance & QA', icon: Wrench, alert: openFaultCount > 0 },
    { id: 'assistant' as TabType, label: 'AI Lab Copilot', icon: Bot, isAi: true }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile} 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Docked Sidebar (Fixed on Desktop, full height h-screen) */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 lg:w-72 bg-[#040711] md:bg-navy-950 border-r border-slate-800/80 flex flex-col justify-between p-5 shrink-0 transition-transform duration-300 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } h-screen select-none`}
      >
        <div className="space-y-6">
          {/* Brand & Identity */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-violet-600 flex items-center justify-center text-navy-950 font-black shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition duration-300">
                  <Cpu className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-navy-950 rounded-full animate-ping"></span>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-navy-950 rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-base font-black tracking-wider text-white">LABSYNC</h1>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">AI•OS</span>
                </div>
                <p className="text-[9px] uppercase font-mono tracking-widest text-slate-400">Autonomous Lab System</p>
              </div>
            </div>

            {/* Close button for mobile drawer */}
            <button 
              onClick={onCloseMobile} 
              className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Telemetry Capsule */}
          <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" /> Core Link
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> 99.98% OK
            </span>
          </div>

          {/* Navigation Tabs */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'text-cyan-400 bg-gradient-to-r from-cyan-500/15 to-transparent border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${item.isAi ? 'text-violet-400' : ''}`} />
                  <span>{item.label}</span>

                  {item.badge && (
                    <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {item.badge}
                    </span>
                  )}

                  {item.alert && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  )}

                  {item.isAi && (
                    <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-mono font-bold tracking-wider">
                      v4.2
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Facility Status Card */}
        <div className="relative overflow-hidden rounded-2xl glass-card p-3.5 border border-cyan-500/20 group">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Building2 className="w-3.5 h-3.5" /> CLEANROOM 04
            </span>
            <span className="text-[9px] text-emerald-400 font-bold">ISO-5 CERT</span>
          </div>
          <p className="text-xs font-bold text-white mb-2">Nanotech & RF Complex</p>
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800">
            <div>Temp: <span className="text-cyan-300">21.2°C</span></div>
            <div>Hum: <span className="text-cyan-300">42.8%</span></div>
          </div>
        </div>
      </aside>
    </>
  );
};
