import { useMemo, useState } from 'react';
import { Check, X, Star, ArrowRight, Plus, Minus, HelpCircle } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Disclosure from '@/components/Disclosure';
import LoanCalculator from '@/components/LoanCalculator';
import PlanConfigurator from '@/components/PlanConfigurator';
import {
  PLANS,
  COMPARISON,
  LOAN_OPTIONS,
  formatGHS,
  DISCLAIMER,
} from '@/lib/plans';

interface PricingProps {
  onNavigate: (page: string) => void;
}

type Billing = 'monthly' | 'annual';

const ANNUAL_FACTOR = 12;
const ANNUAL_DISCOUNT = 0; // no discount — annual = monthly × 12, displayed exactly

const FAQS = [
  {
    q: 'Are these real prices or offers?',
    a: 'No. All plan prices, loan amounts, and calculator outputs are fictional demonstration values. Ledgerline does not provide real banking or lending services, and nothing here constitutes a financial offer or commitment.',
  },
  {
    q: 'How is the annual total calculated?',
    a: 'The annual total is exactly the monthly price multiplied by 12. There is no hidden discount or surcharge — what you see is what is displayed.',
  },
  {
    q: 'Does the loan calculator include interest?',
    a: 'No interest rate is configured, so the calculator shows the principal divided evenly across the chosen months. It is labelled as an interest-free illustration and is not a repayment quote or approval.',
  },
  {
    q: 'How does the plan configurator choose a plan?',
    a: 'The configurator applies explicit demonstration rules based on your selected transaction volume, team size, and financing need. It is not an AI claim or a real eligibility assessment.',
  },
  {
    q: 'Can I compare all plans at once?',
    a: 'Yes. The comparison table lists every feature across Essentials, Growth, and Scale side by side, so you can compare without losing context.',
  },
];

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-accent-600">
        <Check size={13} />
      </span>
    ) : (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-bg text-muted/60">
        <X size={13} />
      </span>
    );
  }
  return <span className="text-sm font-medium text-primary">{value}</span>;
}

export default function Pricing({ onNavigate }: PricingProps) {
  const [billing, setBilling] = useState<Billing>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const annualTotal = (monthly: number) => monthly * ANNUAL_FACTOR * (1 - ANNUAL_DISCOUNT);

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
        <div className="container-px relative py-16 text-center lg:py-20">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-highlight" />
            Pricing &amp; Plans
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Business banking, without the guesswork.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/65">
            Transparent tiers, a side-by-side comparison, and a guided configurator — so the right
            plan is obvious, not opaque.
          </p>
          <p className="mx-auto mt-5 max-w-xl text-xs text-white/40">{DISCLAIMER}</p>
        </div>
      </section>

      {/* Pricing tiers */}
      <section id="plans" className="border-b border-line">
        <div className="container-px py-16 lg:py-20">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <SectionHeading
              eyebrow="Choose a plan"
              title="Three plans, one transparent price"
              description="All prices are fictional demonstration values in GHS — not actual offers."
            />
            {/* Billing toggle */}
            <div
              role="group"
              aria-label="Billing period"
              className="inline-flex items-center rounded-[6px] border border-line bg-surface p-1"
            >
              <button
                onClick={() => setBilling('monthly')}
                aria-pressed={billing === 'monthly'}
                className={`rounded-[4px] px-4 py-2 text-sm font-medium transition-colors ${
                  billing === 'monthly' ? 'bg-primary text-white' : 'text-muted hover:text-primary'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling('annual')}
                aria-pressed={billing === 'annual'}
                className={`rounded-[4px] px-4 py-2 text-sm font-medium transition-colors ${
                  billing === 'annual' ? 'bg-primary text-white' : 'text-muted hover:text-primary'
                }`}
              >
                Annual
              </button>
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PLANS.map((p) => {
              const isAnnual = billing === 'annual';
              const price = isAnnual ? annualTotal(p.monthly) : p.monthly;
              return (
                <div
                  key={p.id}
                  className={`card relative flex flex-col p-6 ${
                    p.popular ? 'shadow-pop ring-1 ring-highlight/40' : 'shadow-card'
                  }`}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-highlight px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
                      <Star size={11} className="fill-primary" />
                      Most popular
                    </span>
                  )}
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-heading text-lg font-bold text-primary">{p.name}</h3>
                  </div>
                  <p className="mt-2 min-h-[40px] text-sm leading-relaxed text-muted">{p.tagline}</p>
                  <div className="mt-5 flex items-baseline gap-1.5">
                    <span className="font-heading text-4xl font-bold text-primary tabular-nums">
                      {formatGHS(price)}
                    </span>
                    <span className="text-sm text-muted">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    {isAnnual
                      ? `${formatGHS(p.monthly)} × 12`
                      : 'Billed monthly'}
                  </p>

                  <div className="mt-5 rounded-[6px] border border-line bg-bg px-4 py-3">
                    <p className="label">Transactions</p>
                    <p className="mt-1 text-sm font-medium text-primary">{p.transactionSummary}</p>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-primary">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent-600">
                          <Check size={11} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => onNavigate('pricing#configurator')}
                    className={`mt-7 w-full ${
                      p.popular ? 'btn-primary' : 'btn-outline'
                    }`}
                  >
                    Choose {p.name}
                  </button>
                </div>
              );
            })}
          </div>
          <Disclosure className="mt-8">
            Plan prices are fictional demonstration values, not actual banking or service offers.
            The Growth tier carries the amber "Most popular" tag.
          </Disclosure>
        </div>
      </section>

      {/* Comparison table */}
      <section className="border-b border-line bg-surface">
        <div className="container-px py-16 lg:py-20">
          <SectionHeading
            eyebrow="Compare plans"
            title="Side by side, feature by feature"
            description="Every capability across all three plans — no hidden asterisks."
          />
          <div className="mt-10 hidden overflow-hidden rounded-lg border border-line md:block">
            <table className="w-full text-left">
              <thead className="bg-bg">
                <tr>
                  <th className="px-5 py-4 font-heading text-xs font-semibold uppercase tracking-wider text-muted">
                    Feature
                  </th>
                  {PLANS.map((p) => (
                    <th key={p.id} className="px-5 py-4 text-right">
                      <p className="font-heading text-sm font-bold text-primary">{p.name}</p>
                      <p className="text-xs font-normal text-muted">{formatGHS(p.monthly)}/mo</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 1 ? 'bg-bg/40' : ''}
                  >
                    <td className="px-5 py-3.5 text-sm text-muted">{row.feature}</td>
                    {(['essentials', 'growth', 'scale'] as const).map((id) => (
                      <td key={id} className="px-5 py-3.5 text-right">
                        <div className="flex justify-end">
                          <Cell value={row[id]} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile alternative */}
          <div className="mt-8 space-y-5 md:hidden">
            {PLANS.map((p) => (
              <div key={p.id} className="card overflow-hidden">
                <div className="flex items-center justify-between border-b border-line bg-bg px-4 py-3">
                  <p className="font-heading text-sm font-bold text-primary">{p.name}</p>
                  <p className="text-xs text-muted">{formatGHS(p.monthly)}/mo</p>
                </div>
                <dl className="divide-y divide-line">
                  {COMPARISON.map((row) => (
                    <div key={row.feature} className="flex items-center justify-between px-4 py-2.5">
                      <dt className="text-xs text-muted">{row.feature}</dt>
                      <dd><Cell value={row[p.id]} /></dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Configurator */}
      <section id="configurator" className="border-b border-line">
        <div className="container-px py-16 lg:py-20">
          <SectionHeading
            eyebrow="Plan configurator"
            title="Find the right plan with transparent rules"
            description="Adjust your needs below. The recommendation is driven by explicit demonstration rules — not an AI claim or real eligibility assessment."
          />
          <div className="mt-10">
            <PlanConfigurator onNavigate={onNavigate} />
          </div>
        </div>
      </section>

      {/* Loan options */}
      <section id="loans" className="border-b border-line bg-surface">
        <div className="container-px py-16 lg:py-20">
          <SectionHeading
            eyebrow="Financing information"
            title="Loan options, clearly labelled"
            description="Informational demonstrations of common SME financing structures. No interest rate, approval promise, or legally binding repayment terms are provided."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {LOAN_OPTIONS.map((l) => (
              <div key={l.id} className="card flex flex-col p-6">
                <h3 className="font-heading text-base font-semibold text-primary">{l.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{l.description}</p>
                <div className="mt-4 space-y-1.5">
                  {l.useCases.map((u) => (
                    <p key={u} className="flex items-center gap-2 text-xs text-primary">
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      {u}
                    </p>
                  ))}
                </div>
                <div className="mt-auto pt-5 text-xs text-muted">
                  Range: {formatGHS(l.minAmount)} – {formatGHS(l.maxAmount)}
                </div>
              </div>
            ))}
          </div>
          <Disclosure className="mt-8">
            Loan options are informational demonstrations. Ledgerline does not invent interest
            rates, promise approvals, or set legally binding repayment terms.
          </Disclosure>
        </div>
      </section>

      {/* Calculator */}
      <section className="border-b border-line">
        <div className="container-px py-16 lg:py-20">
          <SectionHeading
            eyebrow="Loan illustration calculator"
            title="Estimate a repayment structure"
            description="Enter a hypothetical amount and duration. With no interest rate configured, the calculator shows principal divided by months — clearly labelled as an interest-free illustration."
          />
          <div className="mt-10">
            <LoanCalculator />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-line bg-surface">
        <div className="container-px py-16 lg:py-20">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered honestly"
            description="The most common questions about Ledgerline's pricing and financing demonstrations."
          />
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-line rounded-lg border border-line">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle size={16} className="shrink-0 text-accent-600" />
                      <span className="font-heading text-sm font-semibold text-primary">{f.q}</span>
                    </span>
                    {open ? <Minus size={16} className="text-muted" /> : <Plus size={16} className="text-muted" />}
                  </button>
                  {open && (
                    <p className="px-5 pb-5 pl-[44px] text-sm leading-relaxed text-muted animate-fade-in">
                      {f.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="bg-primary">
        <div className="container-px py-16 lg:py-20">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
                Still deciding? Let us help you compare.
              </h2>
              <p className="mt-3 text-white/60">
                Use the configurator above or reach out with questions about which plan fits your
                team. Remember — all details are demonstration values.
              </p>
            </div>
            <button
              onClick={() => onNavigate('pricing#configurator')}
              className="btn-primary shrink-0"
            >
              Open the configurator
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
