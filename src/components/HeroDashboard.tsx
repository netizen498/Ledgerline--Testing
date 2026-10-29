import { ArrowUpRight, ArrowDownLeft, Wallet, TrendingUp } from 'lucide-react';
import Sparkline from './Sparkline';
import { formatGHS } from '@/lib/plans';

const TREND = [38, 41, 39, 44, 47, 52, 49, 55, 58, 63, 61, 67];

const ROWS = [
  { label: 'Inflow — Customer payments', amount: 124300, dir: 'in', date: 'Oct 24' },
  { label: 'Outflow — Supplier settlement', amount: -48900, dir: 'out', date: 'Oct 23' },
  { label: 'Inflow — Invoice #2041', amount: 18600, dir: 'in', date: 'Oct 22' },
  { label: 'Outflow — Payroll run', amount: -31200, dir: 'out', date: 'Oct 20' },
];

export default function HeroDashboard() {
  return (
    <div className="card shadow-pop overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <div>
          <p className="label">Business account</p>
          <p className="mt-1 font-heading text-sm font-semibold text-primary">Overview — Oct 2025</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-bg px-2.5 py-1 text-[11px] font-medium text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Live demo
        </span>
      </div>

      <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
        <div className="p-4">
          <div className="flex items-center gap-1.5 text-muted">
            <Wallet size={13} />
            <span className="label">Balance</span>
          </div>
          <p className="mt-2 font-heading text-xl font-bold text-primary">{formatGHS(248400)}</p>
          <p className="mt-0.5 text-[11px] text-accent-600">+4.2% vs last month</p>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-1.5 text-muted">
            <ArrowDownLeft size={13} />
            <span className="label">Inflow</span>
          </div>
          <p className="mt-2 font-heading text-xl font-bold text-primary">{formatGHS(142900)}</p>
          <p className="mt-0.5 text-[11px] text-muted">Illustrative</p>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-1.5 text-muted">
            <ArrowUpRight size={13} />
            <span className="label">Outflow</span>
          </div>
          <p className="mt-2 font-heading text-xl font-bold text-primary">{formatGHS(80100)}</p>
          <p className="mt-0.5 text-[11px] text-muted">Illustrative</p>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-muted">
            <TrendingUp size={13} />
            <span className="label">Net cash flow</span>
          </div>
          <span className="font-heading text-xs font-semibold text-accent-600">
            {formatGHS(62800)}
          </span>
        </div>
        <div className="mt-3">
          <Sparkline data={TREND} height={48} />
        </div>
      </div>

      <div className="border-t border-line">
        {ROWS.map((r, i) => (
          <div
            key={i}
            className={`flex items-center justify-between px-5 py-3 ${
              i !== ROWS.length - 1 ? 'border-b border-line' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full ${
                  r.dir === 'in' ? 'bg-accent/10 text-accent-600' : 'bg-primary/5 text-primary/60'
                }`}
              >
                {r.dir === 'in' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
              </span>
              <div>
                <p className="font-heading text-[13px] font-medium text-primary">{r.label}</p>
                <p className="text-[11px] text-muted">{r.date}</p>
              </div>
            </div>
            <p
              className={`font-heading text-sm font-semibold tabular-nums ${
                r.amount < 0 ? 'text-primary/60' : 'text-accent-700'
              }`}
            >
              {r.amount < 0 ? '−' : '+'}
              {formatGHS(Math.abs(r.amount))}
            </p>
          </div>
        ))}
      </div>

      <p className="border-t border-line bg-bg px-5 py-2.5 text-[11px] text-muted">
        Illustrative figures only. Not a real account statement.
      </p>
    </div>
  );
}
