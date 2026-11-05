import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Thermometer, 
  Zap, 
  PackageSearch 
} from 'lucide-react';
import { EquipmentItem } from '../types';

interface EquipmentCatalogProps {
  equipment: EquipmentItem[];
  onInspectEquipment: (id: string) => void;
  onQuickBook: (id: string) => void;
}

export const EquipmentCatalog: React.FC<EquipmentCatalogProps> = ({
  equipment,
  onInspectEquipment,
  onQuickBook
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedZone, setSelectedZone] = useState('ALL');

  const filtered = equipment.filter((eq) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      eq.name.toLowerCase().includes(q) ||
      eq.model.toLowerCase().includes(q) ||
      eq.id.toLowerCase().includes(q) ||
      eq.lab.toLowerCase().includes(q);

    const matchesCat = selectedCategory === 'ALL' || eq.category === selectedCategory;
    const matchesStat = selectedStatus === 'ALL' || eq.status === selectedStatus;
    const matchesZone = selectedZone === 'ALL' || eq.zone === selectedZone;

    return matchesSearch && matchesCat && matchesStat && matchesZone;
  });

  return (
    <div className="space-y-6 w-full">
      {/* Filter and Search Bar (Fluid edge-to-edge) */}
      <div className="flex flex-col gap-4 bg-slate-950/70 glass-card p-5 rounded-3xl border border-slate-800 w-full">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by equipment name, serial tag, lab room, or sensor model..."
              className="w-full bg-slate-900 border border-slate-700/80 text-xs text-white rounded-2xl pl-11 pr-4 py-3 focus:outline-none focus:border-cyan-400 placeholder:text-slate-500 shadow-inner"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl px-3.5 py-3 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              <option value="Electronics">Electronics & RF</option>
              <option value="Biotech">Biotech & Analytics</option>
              <option value="Robotics">Robotics & Additive</option>
              <option value="Computing">AI Edge Computing</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl px-3.5 py-3 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="Available">Available (Ready)</option>
              <option value="In Use">In Use (Active)</option>
              <option value="Maintenance">Maintenance</option>
            </select>

            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl px-3.5 py-3 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="ALL">All Campus Zones</option>
              <option value="Zone A">Zone A - Electronics</option>
              <option value="Zone B">Zone B - Cleanroom</option>
              <option value="Zone C">Zone C - Robotics</option>
              <option value="Zone D">Zone D - AI Server</option>
            </select>
          </div>
        </div>
      </div>

      {/* Equipment Cards Grid (Fluid Responsive Columns) */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-slate-500 glass-card rounded-3xl w-full">
          <PackageSearch className="w-12 h-12 mx-auto mb-3 text-cyan-400/50" />
          <p className="font-bold text-white text-base">No instruments matched your criteria.</p>
          <p className="text-xs text-slate-400 mt-1">
            Try resetting your filters or clearing search query.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
          {filtered.map((item) => {
            const isAvail = item.status === 'Available';
            const isInUse = item.status === 'In Use';

            return (
              <div
                key={item.id}
                className="rounded-3xl glass-card overflow-hidden flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition duration-300 group"
              >
                {/* Visual Header */}
                <div className="relative h-44 overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                  {/* Badges on Image */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-cyan-300 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur border border-cyan-500/30 shadow-md">
                      {item.id}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border flex items-center gap-1 backdrop-blur ${
                        isAvail
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : isInUse
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isAvail
                            ? 'bg-emerald-400 animate-pulse'
                            : isInUse
                            ? 'bg-amber-400'
                            : 'bg-rose-400'
                        }`}
                      ></span>
                      {item.status}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 bg-slate-950/80 backdrop-blur px-2 py-0.5 rounded-md border border-slate-800">
                    <MapPin className="w-3 h-3 text-cyan-400" /> {item.zone} • {item.lab}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> {item.health}% Health
                      </span>
                    </div>

                    <h4 className="font-extrabold text-white text-sm group-hover:text-cyan-300 transition line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5 line-clamp-1">
                      {item.model}
                    </p>
                    <p className="text-xs text-slate-300/80 mt-2.5 line-clamp-2 leading-relaxed">
                      {item.specs}
                    </p>
                  </div>

                  {/* Telemetry Pill & CTA */}
                  <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                      <span className="flex items-center gap-0.5 text-cyan-300">
                        <Thermometer className="w-3 h-3" /> {item.temp.split(' ')[0]}
                      </span>
                      <span>•</span>
                      <span className="text-slate-300">{item.power}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onInspectEquipment(item.id)}
                        className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
                      >
                        Inspect <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
