import React from 'react';
import { 
  AlertTriangle, 
  Cpu, 
  UserCheck, 
  Clock, 
  CheckCheck, 
  Wrench 
} from 'lucide-react';
import { FaultItem } from '../types';

interface FaultsViewProps {
  faults: FaultItem[];
  onOpenReportModal: () => void;
  onUpdateStatus: (faultId: string, status: 'Reported' | 'In Progress' | 'Resolved') => void;
}

export const FaultsView: React.FC<FaultsViewProps> = ({
  faults,
  onOpenReportModal,
  onUpdateStatus
}) => {
  return (
    <div className="space-y-6 w-full">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-white">
            Incident & Quality Assurance Work Orders
          </h3>
          <p className="text-xs text-slate-400">
            Hardware faults, recalibration alerts, and scheduled maintenance dispatch
          </p>
        </div>
        <button
          onClick={onOpenReportModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-xs shadow-lg shadow-rose-500/25 transition"
        >
          <AlertTriangle className="w-4 h-4" /> Report Incident
        </button>
      </div>

      {/* Faults Cards Grid (Fluid 3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {faults.map((f) => {
          const isHigh = f.severity === 'High';
          const isMed = f.severity === 'Medium';

          return (
            <div
              key={f.id}
              className="p-6 rounded-3xl glass-card flex flex-col justify-between hover:border-rose-500/40 transition group"
            >
              <div>
                {/* ID & Severity Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20 font-bold">
                    {f.id}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${
                      isHigh
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : isMed
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {f.severity} Priority
                  </span>
                </div>

                <h4 className="font-extrabold text-white text-sm mb-1 group-hover:text-rose-300 transition">
                  {f.title}
                </h4>
                <p className="text-xs text-cyan-300 font-mono mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" /> {f.equipmentName} ({f.equipmentId})
                </p>
                <p className="text-xs text-slate-300/80 leading-relaxed mb-4">
                  {f.description}
                </p>

                {f.assignedTechnician && (
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400 mb-3 flex items-center gap-2">
                    <Wrench className="w-3.5 h-3.5 text-amber-400" />
                    <span>Tech: {f.assignedTechnician}</span>
                  </div>
                )}
              </div>

              {/* Status and Action bar */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="text-[11px] text-slate-400 mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                    Reported by: <strong className="text-white">{f.reportedBy}</strong>
                  </span>
                  <span className="font-mono text-slate-500">{f.date}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-400 font-mono">Status Stage:</span>
                  <select
                    value={f.status}
                    onChange={(e) =>
                      onUpdateStatus(
                        f.id,
                        e.target.value as 'Reported' | 'In Progress' | 'Resolved'
                      )
                    }
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-1.5 focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="Reported">Reported</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
