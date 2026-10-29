import { useId } from 'react';

interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
  ariaLabel?: string;
  format?: (n: number) => string;
}

export default function LineChart({ data, height = 200, ariaLabel, format }: LineChartProps) {
  const id = useId();
  const w = 560;
  const h = height;
  const pad = { top: 20, right: 16, bottom: 28, left: 44 };
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;

  const values = data.map((d) => d.value);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;

  const x = (i: number) => pad.left + (i / (data.length - 1)) * innerW;
  const y = (v: number) => pad.top + innerH - ((v - min) / range) * innerH;

  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(d.value).toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L ${x(data.length - 1).toFixed(1)} ${pad.top + innerH} L ${x(0).toFixed(1)} ${pad.top + innerH} Z`;

  const gridLines = 4;
  const yTicks = Array.from({ length: gridLines + 1 }, (_, i) => min + (range * i) / gridLines);

  const fmt = format ?? ((n: number) => n.toLocaleString('en-GH'));

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label={ariaLabel}>
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4F7CFF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#4F7CFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      {yTicks.map((t, i) => (
        <g key={i}>
          <line
            x1={pad.left}
            x2={w - pad.right}
            y1={y(t)}
            y2={y(t)}
            stroke="#D5DCEB"
            strokeWidth="1"
            strokeDasharray={i === 0 ? '0' : '3 3'}
          />
          <text
            x={pad.left - 8}
            y={y(t) + 4}
            textAnchor="end"
            className="fill-muted"
            fontSize="10"
            fontFamily="Inter, sans-serif"
          >
            {fmt(t)}
          </text>
        </g>
      ))}
      <path d={areaPath} fill={`url(#grad-${id})`} />
      <path d={linePath} fill="none" stroke="#4F7CFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(d.value)} r="3.5" fill="#FFFFFF" stroke="#4F7CFF" strokeWidth="2" />
          <text
            x={x(i)}
            y={h - 10}
            textAnchor="middle"
            className="fill-muted"
            fontSize="11"
            fontFamily="Inter, sans-serif"
          >
            {d.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
