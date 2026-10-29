import { useState } from 'react';
import {
  ArrowRight,
  Eye,
  CreditCard,
  LineChart as LineIcon,
  Landmark,
  ShieldCheck,
  Receipt,
  Users,
  Sparkles,
} from 'lucide-react';
import HeroDashboard from '@/components/HeroDashboard';
import SectionHeading from '@/components/SectionHeading';
import Disclosure from '@/components/Disclosure';
import LineChart from '@/components/LineChart';
import CashFlowChart from '@/components/CashFlowChart';
import Testimonials from '@/components/Testimonials';
import { CASH_FLOW_PERIODS, formatGHS, DISCLAIMER } from '@/lib/plans';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const BANKING_FEATURES = [
  {
    icon: Eye,
    title: 'Account visibility',
    body: 'A structured view of balances, reserves, and connected accounts — no clutter, no guesswork.',
  },
  {
    icon: CreditCard,
    title: 'Payment management',
    body: 'Initiate and track supplier payments, customer collections, and payroll from one dashboard.',
  },
  {
    icon: LineIcon,
    title: 'Cash-flow insights',
    body: 'See inflows, outflows, and net position across periods with clean, exportable summaries.',
  },
  {
    icon: Landmark,
    title: 'Financing options',
    body: 'Explore structured information on working capital, equipment, and expansion financing.',
  },
];

const DASHBOARD_TREND = [
  { label: 'May', value: 38 },
  { label: 'Jun', value: 44 },
  { label: 'Jul', value: 51 },
  { label: 'Aug', value: 49 },
  { label: 'Sep', value: 58 },
  { label: 'Oct', value: 63 },
  { label: 'Nov', value: 67 },
];

export default function Home({ onNavigate }: HomeProps) {
  const [periodId, setPeriodId] = useState(CASH_FLOW_PERIODS[2].id);
  const period = CASH_FLOW_PERIODS.find((p) => p.id === periodId)!;
  const totalIn = period.months.reduce((s, m) => s + m.inflow, 0);
  const totalOut = period.months.reduce((s, m) => s + m.outflow, 0);
  const net = totalIn - totalOut;

  return (
    <div className="bg-bg">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #4F7CFF 1px, transparent 1px), linear-gradient(to bottom, #4F7CFF 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-accent/20 blur-[120px]" />
        <div className="container-px relative grid gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-highlight" />
              Business banking · Accra, Ghana
            </span>
            <h1 className="mt-6 font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              A clearer view of your business finances.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
              Manage business money, plan cash flow, and explore financing — all in one
              disciplined, transparent workspace built for SMEs, startups, and finance teams.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button onClick={() => onNavigate('pricing')} className="btn-primary">
                Explore pricing
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onNavigate('home#dashboard')}
                className="btn text-white/80 hover:text-white"
              >
                See how it works
                <ArrowRight size={16} />
              </button>
            </div>
            <p className="mt-6 text-xs text-white/40">{DISCLAIMER}</p>
          </div>
          <div className="lg:pl-6">
            <div className="animate-fade-up">
              <HeroDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* Banking overview */}
      <section id="banking" className="border-b border-line">
        <div className="container-px py-16 lg:py-24">
          <SectionHeading
            eyebrow="Business banking"
            title="Everything your finance team needs to see clearly"
            description="Structured tools that turn scattered bank activity into a single, decision-ready view — without the noise of a consumer wallet."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BANKING_FEATURES.map((f) => (
              <div key={f.title} className="card p-5 transition-shadow hover:shadow-card">
                <span className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-accent/10 text-accent-600">
                  <f.icon size={18} />
                </span>
                <h3 className="mt-4 font-heading text-base font-semibold text-primary">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard preview */}
      <section id="dashboard" className="border-b border-line bg-surface">
        <div className="container-px py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div className="flex flex-col justify-center">
              <SectionHeading
                eyebrow="Dashboard preview"
                title="A financial workspace, not a wallet"
                description="Clean data visualisations, subtle grid lines, and restrained blue highlights. Built for the people who actually read the numbers."
              />
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-[6px] bg-accent/10 text-accent-600 text-xs font-semibold">
                    1
                  </span>
                  <div>
                    <p className="font-heading text-sm font-semibold text-primary">Positions at a glance</p>
                    <p className="text-sm text-muted">Balances, inflow, outflow, and net cash in one editorial panel.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-[6px] bg-accent/10 text-accent-600 text-xs font-semibold">
                    2
                  </span>
                  <div>
                    <p className="font-heading text-sm font-semibold text-primary">Trends, not noise</p>
                    <p className="text-sm text-muted">A precise line chart surfaces net cash-flow direction over recent months.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-[6px] bg-accent/10 text-accent-600 text-xs font-semibold">
                    3
                  </span>
                  <div>
                    <p className="font-heading text-sm font-semibold text-primary">Audit-ready movement</p>
                    <p className="text-sm text-muted">Every recent transaction is labelled, dated, and exportable.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow-card overflow-hidden">
              <div className="border-b border-line px-6 py-4">
                <p className="label">Net cash-flow trend</p>
                <p className="mt-1 font-heading text-sm font-semibold text-primary">May – Nov 2025 (illustrative)</p>
              </div>
              <div className="p-6">
                <div className="mb-4 flex flex-wrap items-end gap-6">
                  <div>
                    <p className="label">Latest</p>
                    <p className="mt-1 font-heading text-2xl font-bold text-primary">{formatGHS(67000)}</p>
                  </div>
                  <div>
                    <p className="label">6-month avg.</p>
                    <p className="mt-1 font-heading text-2xl font-bold text-primary">{formatGHS(53400)}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1.5 text-muted">
                      <span className="h-2 w-2 rounded-full bg-accent" /> Net flow
                    </span>
                  </div>
                </div>
                <LineChart
                  data={DASHBOARD_TREND}
                  ariaLabel="Line chart of net cash flow from May to November 2025, showing an upward trend from 38,000 to 67,000 GHS"
                  format={(n) => `${(n / 1000).toFixed(0)}k`}
                />
              </div>
              <div className="border-t border-line bg-bg px-6 py-3 text-[11px] text-muted">
                All values in GHS. Illustrative demonstration data only.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cash flow */}
      <section id="cashflow" className="border-b border-line">
        <div className="container-px py-16 lg:py-24">
          <SectionHeading
            eyebrow="Cash-flow insights"
            title="Watch every period unfold, clearly"
            description="Select a quarterly period to inspect inflows, outflows, and net position. Demo figures update with each selection."
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.6fr]">
            <div className="card p-6">
              <p className="label">Select period</p>
              <div role="tablist" aria-label="Cash-flow period" className="mt-3 grid grid-cols-2 gap-2">
                {CASH_FLOW_PERIODS.map((p) => (
                  <button
                    key={p.id}
                    role="tab"
                    aria-selected={p.id === periodId}
                    onClick={() => setPeriodId(p.id)}
                    className={`rounded-[6px] border px-3 py-2.5 text-sm font-medium transition-colors ${
                      p.id === periodId
                        ? 'border-accent bg-accent/10 text-accent-700'
                        : 'border-line text-muted hover:border-accent/40 hover:text-primary'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-[6px] bg-bg px-4 py-3">
                  <span className="text-sm text-muted">Total inflow</span>
                  <span className="font-heading text-sm font-semibold text-accent-700">{formatGHS(totalIn)}</span>
                </div>
                <div className="flex items-center justify-between rounded-[6px] bg-bg px-4 py-3">
                  <span className="text-sm text-muted">Total outflow</span>
                  <span className="font-heading text-sm font-semibold text-primary/70">{formatGHS(totalOut)}</span>
                </div>
                <div className="flex items-center justify-between rounded-[6px] border border-accent/20 bg-accent/5 px-4 py-3">
                  <span className="text-sm font-medium text-primary">Net cash flow</span>
                  <span className="font-heading text-base font-bold text-accent-700">{formatGHS(net)}</span>
                </div>
              </div>
            </div>

            <div className="card p-6 shadow-card">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="label">Monthly breakdown</p>
                  <p className="mt-1 font-heading text-sm font-semibold text-primary">{period.label}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm bg-accent" /> Inflow
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm bg-primary/55" /> Outflow
                  </span>
                </div>
              </div>
              <CashFlowChart
                data={period.months}
                ariaLabel={`Bar chart of inflows and outflows for ${period.label}. Inflow bars are blue, outflow bars are navy.`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Financing */}
      <section id="financing" className="border-b border-line bg-surface">
        <div className="container-px py-16 lg:py-24">
          <SectionHeading
            eyebrow="Financing options"
            title="Explore financing, informed — not promised"
            description="Ledgerline provides structured information on common SME financing use cases. We do not determine eligibility, approval, rates, or lending availability."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Receipt,
                title: 'Working capital',
                body: 'Bridge gaps between paying suppliers and collecting from customers.',
              },
              {
                icon: Landmark,
                title: 'Equipment financing',
                body: 'Spread the cost of machinery, vehicles, or workshop tooling over time.',
              },
              {
                icon: Sparkles,
                title: 'Business expansion',
                body: 'Information on financing options for new locations, hires, or product lines.',
              },
            ].map((c) => (
              <div key={c.title} className="card p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-primary/5 text-primary">
                  <c.icon size={18} />
                </span>
                <h3 className="mt-4 font-heading text-base font-semibold text-primary">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
              </div>
            ))}
          </div>
          <Disclosure className="mt-8">
            Financing details are informational demonstrations. Ledgerline does not offer lending
            approvals, guarantee rates, or commit to repayment terms. Explore full options on the
            Pricing &amp; Plans page.
          </Disclosure>
        </div>
      </section>

      {/* Trust & transparency */}
      <section id="resources" className="border-b border-line">
        <div className="container-px py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Trust & transparency"
              title="Predictable tools for informed decisions"
              description="Clear pricing, structured data, and honest disclosure — so finance teams can plan with confidence rather than guesswork."
            />
            <div className="space-y-5">
              {[
                { icon: ShieldCheck, title: 'Clear pricing', body: 'Tiered plans with no hidden fees. See every price before you choose.' },
                { icon: Users, title: 'Team-ready access', body: 'Bring in your finance team with structured seat limits per plan.' },
                { icon: LineIcon, title: 'Decision-ready data', body: 'Exportable, well-labelled summaries you can share with stakeholders.' },
              ].map((t) => (
                <div key={t.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-accent/10 text-accent-600">
                    <t.icon size={18} />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-primary">{t.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{t.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Final CTA */}
      <section className="bg-primary">
        <div className="container-px py-16 lg:py-20">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
                Compare plans and find the right fit.
              </h2>
              <p className="mt-3 text-white/60">
                Explore transparent pricing, a side-by-side comparison, and a guided plan configurator.
              </p>
            </div>
            <button onClick={() => onNavigate('pricing')} className="btn-primary shrink-0">
              Explore pricing & plans
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
