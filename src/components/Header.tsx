import React, { useState } from 'react';
import { 
  Menu, 
  Bell, 
  Wind, 
  Thermometer, 
  Droplets,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  pageTitle: string;
  pageSubtitle: string;
  role: UserRole;
  onRoleChange: (newRole: UserRole) => void;
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  pageTitle,
  pageSubtitle,
  role,
  onRoleChange,
  onOpenMobileMenu
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const roleUserNames: Record<UserRole, { name: string; title: string }> = {
    Admin: { name: 'Dr. Marcus Vance', title: 'Campus Lab Director' },
    Faculty: { name: 'Prof. Sarah Jenkins', title: 'Faculty Instructor' },
    'Lab Assistant': { name: 'Technician Ross K.', title: 'Lead Operations Tech' },
    Student: { name: 'Liam Torres', title: 'B.Eng Researcher #819' }
  };

  const roleBadgeStyles: Record<UserRole, string> = {
    Admin: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    Faculty: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    'Lab Assistant': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    Student: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  };

  return (
    <header className="h-16 shrink-0 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-8 flex items-center justify-between z-30 w-full">
      {/* Left: Mobile Hamburger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-base md:text-lg font-black text-white tracking-tight capitalize flex items-center gap-2">
            {pageTitle}
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          </h2>
          <p className="hidden sm:block text-[11px] text-slate-400">
            {pageSubtitle}
          </p>
        </div>
      </div>

      {/* Right Controls: Telemetry Pill, Notifications & Role Switcher */}
      <div className="flex items-center gap-3">
        {/* Environmental Cleanroom Live Sensor Pill */}
        <div className="hidden xl:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
          <span className="flex items-center gap-1 text-emerald-400">
            <Wind className="w-3.5 h-3.5" /> PM0.3 Safe
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-400 flex items-center gap-1">
            <Thermometer className="w-3.5 h-3.5" /> 21.4°C
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-purple-400 flex items-center gap-1">
            <Droplets className="w-3.5 h-3.5" /> 44% RH
          </span>
        </div>

        {/* Notifications Tray */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 glass-card rounded-2xl shadow-2xl p-4 border border-cyan-500/30 z-50 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Telemetry Notifications
                </span>
                <span className="text-[10px] font-mono text-cyan-400">3 New</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/30 transition flex gap-2.5 items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-cyan-300">Bambu X1 3D Printer Available</p>
                    <p className="text-[11px] text-slate-400">Print job #398 completed with zero extrusion faults.</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/30 transition flex gap-2.5 items-start">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-rose-300">Calibration Warning (FLT-401)</p>
                    <p className="text-[11px] text-slate-400">Bio-Rad PCR Machine pending thermal re-zero.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Global Role Switcher */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="text-right hidden lg:block">
            <p className="text-xs font-bold text-white">{roleUserNames[role].name}</p>
            <p className="text-[10px] font-mono text-cyan-400">{roleUserNames[role].title}</p>
          </div>

          <select
            value={role}
            onChange={(e) => onRoleChange(e.target.value as UserRole)}
            className="bg-slate-900 hover:bg-slate-850 border border-slate-700 text-cyan-300 text-xs font-semibold rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-cyan-400 cursor-pointer transition"
          >
            <option value="Admin">Role: Admin</option>
            <option value="Faculty">Role: Faculty</option>
            <option value="Lab Assistant">Role: Lab Assistant</option>
            <option value="Student">Role: Student</option>
          </select>

          <div className={`hidden sm:inline-block px-2 py-1 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider border ${roleBadgeStyles[role]}`}>
            {role.toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};
