import React from 'react';

interface UsageChartProps {
  activeDataset?: 'load' | 'both';
}

export const UsageChart: React.FC<UsageChartProps> = () => {
  // 7 days data
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const loadData = [54, 78, 92, 85, 110, 48, 26]; // hours
  const telemetryData = [25, 40, 52, 49, 65, 30, 15]; // k/hr
  const maxLoad = 120;

  // Generate SVG path for smoothed line
  const svgWidth = 700;
  const svgHeight = 200;
  const paddingX = 40;
  const paddingY = 25;
  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;

  const points = loadData.map((val, idx) => {
    const x = paddingX + (idx / (loadData.length - 1)) * chartW;
    const y = svgHeight - paddingY - (val / maxLoad) * chartH;
    return { x, y, val, day: days[idx] };
  });

  const pathD = points.reduce((acc, p, idx, arr) => {
    if (idx === 0) return `M ${p.x} ${p.y}`;
    const prev = arr[idx - 1];
    const cpX1 = prev.x + (p.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (p.x - prev.x) / 2;
    const cpY2 = p.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;

  // Secondary dashed path for telemetry
  const telemetryPoints = telemetryData.map((val, idx) => {
    const x = paddingX + (idx / (telemetryData.length - 1)) * chartW;
    const y = svgHeight - paddingY - (val / 75) * chartH;
    return { x, y };
  });

  const telemetryPath = telemetryPoints.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="relative w-full h-48 sm:h-52">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="cyanAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#8B5CF6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.0" />
            </linearGradient>
            <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#00F0FF" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Horizontal Grid lines */}
          {[0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = svgHeight - paddingY - ratio * chartH;
            return (
              <g key={ratio}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={svgWidth - paddingX}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.06)"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 10}
                  y={y + 3}
                  textAnchor="end"
                  fill="#64748B"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {Math.round(ratio * maxLoad)}h
                </text>
              </g>
            );
          })}

          {/* Fill Area */}
          <path d={areaD} fill="url(#cyanAreaGradient)" />

          {/* Telemetry line (dashed violet) */}
          <path
            d={telemetryPath}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2"
            strokeDasharray="5 5"
            opacity="0.8"
          />

          {/* Main Load curve (cyan glowing) */}
          <path
            d={pathD}
            fill="none"
            stroke="#00F0FF"
            strokeWidth="3"
            filter="url(#cyanGlow)"
          />

          {/* Interactive point circles */}
          {points.map((p, idx) => (
            <g key={idx} className="group cursor-pointer">
              <circle
                cx={p.x}
                cy={p.y}
                r="4.5"
                fill="#080E1E"
                stroke="#00F0FF"
                strokeWidth="2.5"
                className="transition-all duration-200 group-hover:r-7"
              />
              <circle
                cx={p.x}
                cy={p.y}
                r="9"
                fill="#00F0FF"
                opacity="0"
                className="transition-all duration-200 group-hover:opacity-30"
              />
              {/* Day Label at bottom */}
              <text
                x={p.x}
                y={svgHeight - 6}
                textAnchor="middle"
                fill="#94A3B8"
                fontSize="10"
                fontFamily="JetBrains Mono, monospace"
              >
                {p.day}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Legend & Summary */}
      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-navy-800 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-cyan-300">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00F0FF]"></span>
            Active Workstation Hours (Peak: 110h Fri)
          </span>
          <span className="flex items-center gap-1.5 text-violet-400">
            <span className="w-2.5 h-0.5 bg-violet-400"></span>
            Sensor Heartbeats (k/hr)
          </span>
        </div>
        <span className="text-emerald-400 font-bold">● Telemetry Stream Online</span>
      </div>
    </div>
  );
};
