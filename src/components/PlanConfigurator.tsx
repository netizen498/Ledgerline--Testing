import { useMemo, useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { PLANS, CONFIGURATOR_RULES, recommendPlan } from '@/lib/plans';
import type { ConfiguratorInput } from '@/lib/plans';
import type { PlanId } from '@/lib/types';

interface ConfiguratorProps {
  onNavigate?: (page: string) => void;
}

const TX_OPTIONS = [
  { value: 20, label: 'Up to 20' },
  { value: 60, label: '21–60' },
  { value: 150, label: '61–150' },
  { value: 250, label: '150+' },
];
const MEMBER_OPTIONS = [1, 3, 6, 12];

export default function PlanConfigurator({ onNavigate }: ConfiguratorProps) {
  const [input, setInput] = useState<ConfiguratorInput>({
    transactions: 60,
    members: 3,
    financing: true,
  });

  const recommendedId = useMemo(() => recommendPlan(input), [input]);

  const ruleResults = CONFIGURATOR_RULES.map((r) => ({
    plan: r.plan,
    reasons: r.reasons(input),
    isRecommended: r.plan === recommendedId,
  }));

  const planName = (id: PlanId) => PLANS.find((p) => p.id === id)!.name;

  return (
    <div className="card overflow-hidden shadow-card">
      <div className="border-b border-line px-6 py-5">
        <p className="eyebrow">Plan configurator</p>
        <h3 className="mt-2 font-heading text-xl font-bold text-primary">
          Find the plan that fits your needs
        </h3>
        <p className="mt-2 text-sm text-muted">
          Adjust the controls below. We recommend a plan using explicit demonstration rules —
          no AI claims and no real financial eligibility assessment.
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_1.2fr]">
        {/* Inputs */}
        <div className="space-y-6 border-b border-line p-6 lg:border-b-0 lg:border-r">
          <div>
            <label className="label">Estimated monthly transactions</label>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {TX_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  onClick={() => setInput((s) => ({ ...s, transactions: o.value }))}
                  className={`rounded-[6px] border px-3 py-2.5 text-xs font-medium transition-colors ${
                    input.transactions === o.value
                      ? 'border-accent bg-accent/10 text-accent-700'
                      : 'border-line text-muted hover:border-accent/40 hover:text-primary'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Team members</label>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {MEMBER_OPTIONS.map((m) => (
                <button
                  key={m}
                  onClick={() => setInput((s) => ({ ...s, members: m }))}
                  className={`rounded-[6px] border px-3 py-2.5 text-sm font-medium transition-colors ${
                    input.members === m
                      ? 'border-accent bg-accent/10 text-accent-700'
                      : 'border-line text-muted hover:border-accent/40 hover:text-primary'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Business financing information</label>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => setInput((s) => ({ ...s, financing: true }))}
                className={`rounded-[6px] border px-3 py-2.5 text-sm font-medium transition-colors ${
                  input.financing
                    ? 'border-accent bg-accent/10 text-accent-700'
                    : 'border-line text-muted hover:border-accent/40 hover:text-primary'
                }`}
              >
                Needed
              </button>
              <button
                onClick={() => setInput((s) => ({ ...s, financing: false }))}
                className={`rounded-[6px] border px-3 py-2.5 text-sm font-medium transition-colors ${
                  !input.financing
                    ? 'border-accent bg-accent/10 text-accent-700'
                    : 'border-line text-muted hover:border-accent/40 hover:text-primary'
                }`}
              >
                Not needed
              </button>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="p-6">
          <div className="rounded-lg border border-accent/30 bg-accent/5 p-5">
            <p className="label text-accent-600">Recommended plan</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="font-heading text-2xl font-bold text-primary">{planName(recommendedId)}</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-white">
                Best fit
              </span>
            </div>
            <p className="mt-2 text-sm text-muted">
              {PLANS.find((p) => p.id === recommendedId)!.tagline}
            </p>
            {onNavigate && (
              <button
                onClick={() => onNavigate('pricing#plans')}
                className="btn-primary mt-4"
              >
                View {planName(recommendedId)} plan
                <ArrowRight size={15} />
              </button>
            )}
          </div>

          <p className="mt-6 label">Why this plan — the rules</p>
          <div className="mt-3 space-y-3">
            {PLANS.map((p) => {
              const result = ruleResults.find((r) => r.plan === p.id)!;
              return (
                <div
                  key={p.id}
                  className={`rounded-[6px] border p-4 ${
                    result.isRecommended ? 'border-accent/30 bg-accent/5' : 'border-line bg-surface'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-heading text-sm font-semibold text-primary">{p.name}</p>
                    {result.isRecommended ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600">
                        <Check size={13} /> Recommended
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-muted">
                        <X size={13} /> Alternative
                      </span>
                    )}
                  </div>
                  <ul className="mt-2 space-y-1">
                    {result.reasons.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent/50" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
