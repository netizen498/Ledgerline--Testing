import type { Plan, ComparisonRow, LoanOption, CashFlowPeriod, PlanId } from './types';

export const CURRENCY = 'GHS';
export const DISCLAIMER =
  'Ledgerline is a fictional demonstration. All figures, prices, and financing details are illustrative and do not constitute a financial offer, eligibility decision, or commitment to lend.';

export function formatGHS(amount: number, opts: { decimals?: number } = {}): string {
  const { decimals = 0 } = opts;
  return `${CURRENCY} ${amount.toLocaleString('en-GH', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

export const PLANS: Plan[] = [
  {
    id: 'essentials',
    name: 'Essentials',
    monthly: 0,
    tagline: 'Clear business banking essentials for founders getting started.',
    transactionSummary: 'Up to 40 transactions / month',
    features: [
      'Business account visibility',
      'Up to 40 transactions per month',
      '1 team member seat',
      'Monthly cash-flow summary',
      'Standard payment management',
      'Email support',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    monthly: 250,
    tagline: 'Structured cash-flow tools and team access for growing SMEs.',
    transactionSummary: 'Up to 200 transactions / month',
    popular: true,
    features: [
      'Everything in Essentials',
      'Up to 200 transactions per month',
      '5 team member seats',
      'Interactive cash-flow insights',
      'Business financing information',
      'Priority email support',
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    monthly: 600,
    tagline: 'Advanced controls for finance teams managing higher volume.',
    transactionSummary: 'Unlimited transactions / month',
    features: [
      'Everything in Growth',
      'Unlimited transactions',
      '20 team member seats',
      'Advanced cash-flow forecasting tools',
      'Dedicated account guidance',
      'Custom export & reporting',
    ],
  },
];

export const COMPARISON: ComparisonRow[] = [
  { feature: 'Monthly fee', essentials: 'GHS 0', growth: 'GHS 250', scale: 'GHS 600' },
  { feature: 'Transactions per month', essentials: '40', growth: '200', scale: 'Unlimited' },
  { feature: 'Team member seats', essentials: '1', growth: '5', scale: '20' },
  { feature: 'Business account visibility', essentials: true, growth: true, scale: true },
  { feature: 'Payment management', essentials: 'Standard', growth: 'Standard', scale: 'Advanced' },
  { feature: 'Cash-flow summary', essentials: 'Monthly', growth: 'Interactive', scale: 'Forecasting' },
  { feature: 'Business financing information', essentials: false, growth: true, scale: true },
  { feature: 'Custom export & reporting', essentials: false, growth: false, scale: true },
  { feature: 'Dedicated account guidance', essentials: false, growth: false, scale: true },
  { feature: 'Support', essentials: 'Email', growth: 'Priority email', scale: 'Dedicated' },
];

export const LOAN_OPTIONS: LoanOption[] = [
  {
    id: 'working-capital',
    name: 'Working Capital',
    description:
      'Bridge short-term gaps between paying suppliers and collecting from customers.',
    useCases: ['Inventory restocking', 'Payroll timing', 'Supplier deposits'],
    minAmount: 5000,
    maxAmount: 150000,
    minMonths: 3,
    maxMonths: 24,
  },
  {
    id: 'equipment-financing',
    name: 'Equipment Financing',
    description:
      'Spread the cost of essential equipment over a structured repayment period.',
    useCases: ['Machinery', 'Vehicles', 'Workshop tooling'],
    minAmount: 10000,
    maxAmount: 300000,
    minMonths: 6,
    maxMonths: 48,
  },
  {
    id: 'business-expansion',
    name: 'Business Expansion',
    description:
      'Information on financing options for new locations, hires, or product lines.',
    useCases: ['New location', 'Team expansion', 'Product lines'],
    minAmount: 20000,
    maxAmount: 500000,
    minMonths: 12,
    maxMonths: 60,
  },
];

export const CASH_FLOW_PERIODS: CashFlowPeriod[] = [
  {
    id: 'q1',
    label: 'Q1 2025',
    months: [
      { label: 'Jan', inflow: 82000, outflow: 51000 },
      { label: 'Feb', inflow: 78000, outflow: 49000 },
      { label: 'Mar', inflow: 94000, outflow: 57000 },
    ],
  },
  {
    id: 'q2',
    label: 'Q2 2025',
    months: [
      { label: 'Apr', inflow: 88000, outflow: 54000 },
      { label: 'May', inflow: 102000, outflow: 61000 },
      { label: 'Jun', inflow: 97000, outflow: 58000 },
    ],
  },
  {
    id: 'q3',
    label: 'Q3 2025',
    months: [
      { label: 'Jul', inflow: 110000, outflow: 64000 },
      { label: 'Aug', inflow: 105000, outflow: 67000 },
      { label: 'Sep', inflow: 118000, outflow: 71000 },
    ],
  },
  {
    id: 'q4',
    label: 'Q4 2025',
    months: [
      { label: 'Oct', inflow: 124000, outflow: 73000 },
      { label: 'Nov', inflow: 131000, outflow: 78000 },
      { label: 'Dec', inflow: 142000, outflow: 82000 },
    ],
  },
];

export interface RecommendationRule {
  field: 'transactions' | 'members' | 'financing';
  label: string;
}

export interface ConfiguratorInput {
  transactions: number;
  members: number;
  financing: boolean;
}

export const CONFIGURATOR_RULES: { plan: PlanId; reasons: (i: ConfiguratorInput) => string[] }[] = [
  {
    plan: 'scale',
    reasons: (i) => {
      const out: string[] = [];
      if (i.transactions > 200) out.push('Transaction volume exceeds the Growth cap of 200/month.');
      if (i.members > 5) out.push('Team size exceeds the Growth limit of 5 seats.');
      if (i.financing) out.push('Advanced financing information is included.');
      return out;
    },
  },
  {
    plan: 'growth',
    reasons: (i) => {
      const out: string[] = [];
      if (i.transactions > 40 && i.transactions <= 200) out.push('Transaction volume fits within the Growth cap of 200/month.');
      if (i.members > 1 && i.members <= 5) out.push('Team size fits within the Growth limit of 5 seats.');
      if (i.financing) out.push('Business financing information is included.');
      if (out.length === 0) out.push('Needs fit within the Growth plan range, with room to grow.');
      return out;
    },
  },
  {
    plan: 'essentials',
    reasons: (i) => {
      const out: string[] = [];
      if (i.transactions <= 40) out.push('Transaction volume is within the Essentials cap of 40/month.');
      if (i.members <= 1) out.push('Single team member seat is sufficient.');
      if (!i.financing) out.push('No business financing information required.');
      if (out.length === 0) out.push('Needs are minimal and fit the Essentials plan.');
      return out;
    },
  },
];

export function recommendPlan(i: ConfiguratorInput): PlanId {
  if (i.transactions > 200 || i.members > 5 || (i.financing && i.transactions > 200)) return 'scale';
  if (i.transactions > 40 || i.members > 1 || i.financing) return 'growth';
  return 'essentials';
}
