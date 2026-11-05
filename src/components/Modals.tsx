import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  CalendarCheck, 
  AlertTriangle, 
  QrCode, 
  ShieldCheck, 
  Thermometer, 
  Zap, 
  Cpu, 
  PlusCircle 
} from 'lucide-react';
import { EquipmentItem, UserRole } from '../types';

interface ModalsProps {
  inspectItem: EquipmentItem | null;
  onCloseInspect: () => void;
  isNewBookingOpen: boolean;
  onCloseNewBooking: () => void;
  isReportFaultOpen: boolean;
  onCloseReportFault: () => void;
  equipment: EquipmentItem[];
  preselectedEquipmentId: string | null;
  role: UserRole;
  onCreateBooking: (booking: {
    equipmentId: string;
    userName: string;
    lab: string;
    date: string;
    slot: string;
  }) => void;
  onCreateFault: (fault: {
    equipmentId: string;
    severity: 'High' | 'Medium' | 'Low';
    title: string;
    desc: string;
  }) => void;
  onQuickBookFromInspect: (equipmentId: string) => void;
  onReportFaultFromInspect: (equipmentId: string) => void;
}

export const Modals: React.FC<ModalsProps> = ({
  inspectItem,
  onCloseInspect,
  isNewBookingOpen,
  onCloseNewBooking,
  isReportFaultOpen,
  onCloseReportFault,
  equipment,
  preselectedEquipmentId,
  role,
  onCreateBooking,
  onCreateFault,
  onQuickBookFromInspect,
  onReportFaultFromInspect
}) => {
  // Booking form state
  const [bookEqId, setBookEqId] = useState(preselectedEquipmentId || equipment[0]?.id || '');
  const [bookUser, setBookUser] = useState('');
  const [bookLab, setBookLab] = useState('');
  const [bookDate, setBookDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [bookSlot, setBookSlot] = useState('2 Hours (Standard Lab)');

  // Fault form state
  const [faultEqId, setFaultEqId] = useState(preselectedEquipmentId || equipment[0]?.id || '');
  const [faultSeverity, setFaultSeverity] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [faultTitle, setFaultTitle] = useState('');
  const [faultDesc, setFaultDesc] = useState('');

  // Update selected IDs when preselected changes
  React.useEffect(() => {
    if (preselectedEquipmentId) {
      setBookEqId(preselectedEquipmentId);
      setFaultEqId(preselectedEquipmentId);
    }
  }, [preselectedEquipmentId]);

  return (
    <>
      {/* 1. EQUIPMENT INSPECT MODAL */}
      {inspectItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card border border-cyan-500/40 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={onCloseInspect}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900/60 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[85vh] overflow-y-auto">
              {/* Modal Banner Photo */}
              <div className="relative h-56 bg-slate-950 overflow-hidden">
                <img
                  src={inspectItem.image}
                  alt={inspectItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>

                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      {inspectItem.id} • {inspectItem.zone}
                    </span>
                    <h3 className="text-xl font-black text-white mt-1.5">{inspectItem.name}</h3>
                    <p className="text-xs font-mono text-cyan-300">{inspectItem.model}</p>
                  </div>

                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold border ${
                      inspectItem.status === 'Available'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : inspectItem.status === 'In Use'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    }`}
                  >
                    {inspectItem.status}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-5">
                {/* 4 Sensor Telemetry Matrix */}
                <div className="grid grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">
                      Health Score
                    </span>
                    <span className="text-base font-extrabold text-emerald-400 font-mono">
                      {inspectItem.health}%
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">
                      Temperature
                    </span>
                    <span className="text-base font-extrabold text-cyan-300 font-mono">
                      {inspectItem.temp}
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">
                      Power Draw
                    </span>
                    <span className="text-base font-extrabold text-amber-300 font-mono">
                      {inspectItem.power}
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">
                      Firmware
                    </span>
                    <span className="text-base font-extrabold text-violet-300 font-mono">
                      {inspectItem.fw}
                    </span>
                  </div>
                </div>

                {/* Specs Box */}
                <div className="space-y-3 text-xs bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-400">Assigned Facility:</span>
                    <span className="font-bold text-white">{inspectItem.lab}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-400">Last Certified Calibration:</span>
                    <span className="font-mono text-cyan-400 font-semibold">
                      {inspectItem.lastCal} (ISO 17025 Verified)
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-400">Asset Barcode / Serial:</span>
                    <span className="font-mono text-slate-300">{inspectItem.serialNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Standard Operating Specifications:</span>
                    <p className="text-slate-200 leading-relaxed">{inspectItem.specs}</p>
                  </div>
                </div>

                {/* QR Code Simulation */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900 border border-cyan-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center">
                      <QrCode className="w-8 h-8 text-slate-950" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Physical Check-In QR Pass</p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        Scan at bench barcode terminal to activate main power rail
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
                    NFC VERIFIED
                  </span>
                </div>

                {/* Modal Action Bar */}
                <div className="flex items-center gap-3 pt-2">
                  {inspectItem.status === 'Available' ? (
                    <button
                      onClick={() => onQuickBookFromInspect(inspectItem.id)}
                      className="flex-1 btn-gradient py-3 rounded-2xl text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <CalendarCheck className="w-4 h-4" /> Reserve Instrument Now
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 bg-slate-800 text-slate-500 py-3 rounded-2xl text-xs font-bold cursor-not-allowed"
                    >
                      Currently In-Use / Locked
                    </button>
                  )}
                  <button
                    onClick={() => onReportFaultFromInspect(inspectItem.id)}
                    className="px-5 py-3 rounded-2xl bg-slate-850 hover:bg-slate-800 text-rose-400 border border-rose-500/30 text-xs font-bold transition flex items-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4" /> Report Fault
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. NEW BOOKING MODAL */}
      {isNewBookingOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card border border-cyan-500/40 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={onCloseNewBooking}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900/60"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <PlusCircle className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">Create Equipment Reservation</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Select an active instrument and designate slot duration
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onCreateBooking({
                  equipmentId: bookEqId,
                  userName: bookUser,
                  lab: bookLab,
                  date: bookDate,
                  slot: bookSlot
                });
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Select Instrument</label>
                <select
                  value={bookEqId}
                  onChange={(e) => setBookEqId(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                >
                  {equipment.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name} ({e.id}) - {e.status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Applicant Name & ID</label>
                <input
                  type="text"
                  value={bookUser}
                  onChange={(e) => setBookUser(e.target.value)}
                  required
                  placeholder="e.g. Alex Morgan (ENG-402)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Assigned Laboratory Facility</label>
                <input
                  type="text"
                  value={bookLab}
                  onChange={(e) => setBookLab(e.target.value)}
                  required
                  placeholder="e.g. Cleanroom 04 - Workstation B"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Slot Duration</label>
                  <select
                    value={bookSlot}
                    onChange={(e) => setBookSlot(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option>1 Hour (Fast Test)</option>
                    <option>2 Hours (Standard Lab)</option>
                    <option>4 Hours (Extended Run)</option>
                    <option>Overnight Automated Run</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-gradient py-3 rounded-xl font-bold text-slate-950 transition shadow-lg shadow-cyan-500/20"
                >
                  Confirm & Generate Pass
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. REPORT FAULT MODAL */}
      {isReportFaultOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card border border-rose-500/40 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={onCloseReportFault}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900/60"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">Log Fault / Maintenance Order</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Mark equipment offline and trigger technician dispatch
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onCreateFault({
                  equipmentId: faultEqId,
                  severity: faultSeverity,
                  title: faultTitle,
                  desc: faultDesc
                });
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Affected Instrument</label>
                <select
                  value={faultEqId}
                  onChange={(e) => setFaultEqId(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-rose-400"
                >
                  {equipment.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name} ({e.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Severity / Urgency Level</label>
                <select
                  value={faultSeverity}
                  onChange={(e) => setFaultSeverity(e.target.value as 'High' | 'Medium' | 'Low')}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-rose-400"
                >
                  <option value="Low">Low (Cosmetic / Calibration Warning)</option>
                  <option value="Medium">Medium (Impaired Subsystem / Jitter)</option>
                  <option value="High">High (Total Breakdown / Safety Hazard)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Incident Headline</label>
                <input
                  type="text"
                  value={faultTitle}
                  onChange={(e) => setFaultTitle(e.target.value)}
                  required
                  placeholder="e.g. Heatsink fan vibration & calibration failure"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Diagnostic Log & Observations
                </label>
                <textarea
                  rows={3}
                  value={faultDesc}
                  onChange={(e) => setFaultDesc(e.target.value)}
                  required
                  placeholder="Describe error codes, LED blink patterns, or observed smoke..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-rose-400"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-rose-500/25"
                >
                  Submit Incident & Lock Device
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
