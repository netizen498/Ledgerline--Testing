import { useMemo, useState } from 'react';
import { Calculator, Info } from 'lucide-react';
import { LOAN_OPTIONS, formatGHS } from '@/lib/plans';

export default function LoanCalculator() {
  const [loanId, setLoanId] = useState(LOAN_OPTIONS[0].id);
  const [amount, setAmount] = useState(50000);
  const [months, setMonths] = useState(12);

  const loan = LOAN_OPTIONS.find((l) => l.id === loanId)!;

  const clampedAmount = Math.min(Math.max(amount, loan.minAmount), loan.maxAmount);
  const clampedMonths = Math.min(Math.max(months, loan.minMonths), loan.maxMonths);

  const { monthlyPayment, total } = useMemo(() => {
    const m = clampedAmount / clampedMonths;
    return { monthlyPayment: m, total: clampedAmount };
  }, [clampedAmount, clampedMonths]);

  const amountErr = amount < loan.minAmount || amount > loan.maxAmount;
  const monthsErr = months < loan.minMonths || months > loan.maxMonths;

  return (
    <div className="card overflow-hidden shadow-card">
      <div className="flex items-center gap-3 border-b border-line px-6 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-primary/5 text-primary">
          <Calculator size={18} />
        </span>
        <div>
          <h3 className="font-heading text-base font-semibold text-primary">Loan illustration calculator</h3>
          <p className="text-xs text-muted">Interest-free illustration · no rate configured</p>
        </div>
      </div>

      <div className="grid gap-8 p-6 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5">
          <div>
            <label htmlFor="loan-type" className="label">
              Financing type
            </label>
            <select
              id="loan-type"
              value={loanId}
              onChange={(e) => {
                const next = LOAN_OPTIONS.find((l) => l.id === e.target.value)!;
                setLoanId(next.id);
                setAmount(Math.min(Math.max(amount, next.minAmount), next.maxAmount));
                setMonths(Math.min(Math.max(months, next.minMonths), next.maxMonths));
              }}
              className="input mt-2 cursor-pointer"
            >
              {LOAN_OPTIONS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="amount" className="label">
                Hypothetical amount (GHS)
              </label>
              <span className="text-xs text-muted">
                {formatGHS(loan.minAmount)} – {formatGHS(loan.maxAmount)}
              </span>
            </div>
            <input
              id="amount"
              type="number"
              min={loan.minAmount}
              max={loan.maxAmount}
              step={1000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className={`input mt-2 ${amountErr ? 'border-red-400 ring-2 ring-red-100' : ''}`}
            />
            {amountErr && (
              <p className="mt-1.5 text-xs text-red-500">
                Enter an amount between {formatGHS(loan.minAmount)} and {formatGHS(loan.maxAmount)}.
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="months" className="label">
                Repayment duration (months)
              </label>
              <span className="text-xs text-muted">
                {loan.minMonths}–{loan.maxMonths} months
              </span>
            </div>
            <input
              id="months"
              type="range"
              min={loan.minMonths}
              max={loan.maxMonths}
              step={1}
              value={clampedMonths}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="mt-3 w-full accent-accent"
            />
            <div className="mt-1 flex items-center justify-between text-xs text-muted">
              <span>{loan.minMonths} mo</span>
              <span className="font-heading text-sm font-semibold text-primary">{clampedMonths} months</span>
              <span>{loan.maxMonths} mo</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-lg border border-line bg-bg p-6">
          <p className="label">Estimated monthly payment</p>
          <p className="mt-2 font-heading text-4xl font-bold text-primary tabular-nums">
            {formatGHS(monthlyPayment, { decimals: 2 })}
          </p>
          <p className="mt-1 text-xs text-muted">Principal ÷ months — interest-free illustration</p>

          <div className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted">Principal</span>
              <span className="font-heading font-semibold text-primary">{formatGHS(total)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Duration</span>
              <span className="font-heading font-semibold text-primary">{clampedMonths} months</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Interest rate</span>
              <span className="font-heading font-semibold text-muted">Not configured</span>
            </div>
            <div className="flex items-center justify-between border-t border-line pt-2.5">
              <span className="font-medium text-primary">Total illustration</span>
              <span className="font-heading font-bold text-primary">{formatGHS(total)}</span>
            </div>
          </div>

          <div className="mt-auto flex items-start gap-2 pt-5 text-[11px] text-muted">
            <Info size={13} className="mt-0.5 shrink-0" />
            <span>
              Because no interest rate is configured, this shows principal divided by months only.
              It is an interest-free illustration, not a real repayment quote, offer, or approval.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
