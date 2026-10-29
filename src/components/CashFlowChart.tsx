interface BarChartProps {
  data: { label: string; inflow: number; outflow: number }[];
  ariaLabel?: string;
}

function bar(y: number, max: number, top: number, bottom: number) {
  return bottom - (y / max) * (bottom - top);
}

export default function CashFlowChart({ data, ariaLabel }: BarChartProps) {
  const max = Math.max(...data.flatMap((d) => [d.inflow, d.outflow]), 1);
  const w = 560;
  const h = 220;
  const pad = { top: 18, right: 12, bottom: 30, left: 44 };
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const groupW = innerW / data.length;
  const barW = Math.min(18, groupW * 0.32);
  const gap = 4;

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => (max * i) / yTicks);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label={ariaLabel}>
      {ticks.map((t, i) => {
        const ty = bar(t, max, pad.top, pad.top + innerH);
        return (
          <g key={i}>
            <line
              x1={pad.left}
              x2={w - pad.right}
              y1={ty}
              y2={ty}
              stroke="#D5DCEB"
              strokeWidth="1"
              strokeDasharray={i === 0 ? '0' : '3 3'}
            />
            <text
              x={pad.left - 8}
              y={ty + 4}
              textAnchor="end"
              className="fill-muted"
              fontSize="10"
              fontFamily="Inter, sans-serif"
            >
              {Math.round(t).toLocaleString('en-GH')}
            </text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const cx = pad.left + i * groupW + groupW / 2;
        const inflowTop = bar(d.inflow, max, pad.top, pad.top + innerH);
        const outflowTop = bar(d.outflow, max, pad.top, pad.top + innerH);
        const baseY = pad.top + innerH;
        return (
          <g key={i}>
            <rect
              x={cx - barW - gap / 2}
              y={inflowTop}
              width={barW}
              height={baseY - inflowTop}
              rx="2"
              fill="#4F7CFF"
            />
            <rect
              x={cx + gap / 2}
              y={outflowTop}
              width={barW}
              height={baseY - outflowTop}
              rx="2"
              fill="#0B1B3A"
              opacity="0.55"
            />
            <text
              x={cx}
              y={h - 10}
              textAnchor="middle"
              className="fill-muted"
              fontSize="11"
              fontFamily="Inter, sans-serif"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
