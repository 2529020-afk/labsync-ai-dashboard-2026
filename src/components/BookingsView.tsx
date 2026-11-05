import React from 'react';
import { 
  PlusCircle, 
  CalendarCheck, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  User, 
  MapPin 
} from 'lucide-react';
import { BookingItem } from '../types';

interface BookingsViewProps {
  bookings: BookingItem[];
  onOpenNewBooking: () => void;
  onUpdateStatus: (bookingId: string, status: 'Confirmed' | 'Issued' | 'Returned') => void;
}

export const BookingsView: React.FC<BookingsViewProps> = ({
  bookings,
  onOpenNewBooking,
  onUpdateStatus
}) => {
  return (
    <div className="space-y-6 w-full">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-white">Equipment Reservations & SOP Check-ins</h3>
          <p className="text-xs text-slate-400">
            Verify user permissions, schedule checkout slots, and sign off returns
          </p>
        </div>
        <button
          onClick={onOpenNewBooking}
          className="btn-gradient flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
        >
          <PlusCircle className="w-4 h-4" /> New Demo Booking
        </button>
      </div>

      {/* Bookings Table Container (Fluid edge-to-edge) */}
      <div className="glass-card rounded-3xl overflow-hidden shadow-xl border border-slate-800 w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-4 px-5">Reservation ID</th>
                <th className="py-4 px-5">Instrument Details</th>
                <th className="py-4 px-5">Reserved By</th>
                <th className="py-4 px-5">Target Facility</th>
                <th className="py-4 px-5">State</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 font-sans">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-850/40 transition">
                  {/* Reservation ID */}
                  <td className="py-4 px-5 font-mono text-cyan-400 font-bold">
                    {b.id}
                  </td>

                  {/* Instrument Details */}
                  <td className="py-4 px-5">
                    <div className="font-bold text-white text-xs">{b.equipmentName}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {b.equipmentId} • {b.slot}
                    </div>
                  </td>

                  {/* Reserved By */}
                  <td className="py-4 px-5">
                    <div className="font-semibold text-slate-200 text-xs flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" /> {b.user}
                    </div>
                  </td>

                  {/* Target Facility / Time */}
                  <td className="py-4 px-5 text-slate-300">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" /> {b.lab}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> {b.time}
                    </div>
                  </td>

                  {/* State badge */}
                  <td className="py-4 px-5">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold border ${
                        b.status === 'Issued'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : b.status === 'Confirmed'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right space-x-2 whitespace-nowrap">
                    {b.status === 'Confirmed' && (
                      <button
                        onClick={() => onUpdateStatus(b.id, 'Issued')}
                        className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-xl border border-emerald-500/40 text-[11px] font-bold transition"
                      >
                        Mark Issued
                      </button>
                    )}

                    {b.status === 'Issued' && (
                      <button
                        onClick={() => onUpdateStatus(b.id, 'Returned')}
                        className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-xl border border-cyan-500/40 text-[11px] font-bold transition"
                      >
                        Mark Returned
                      </button>
                    )}

                    {b.status === 'Returned' && (
                      <span className="text-slate-500 text-[11px] font-mono">
                        Archived Pass
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
