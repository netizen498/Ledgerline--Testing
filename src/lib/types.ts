export type PlanId = 'essentials' | 'growth' | 'scale';

export interface Plan {
  id: PlanId;
  name: string;
  monthly: number;
  tagline: string;
  features: string[];
  transactionSummary: string;
  popular?: boolean;
}

export interface ComparisonRow {
  feature: string;
  essentials: string | boolean;
  growth: string | boolean;
  scale: string | boolean;
}

export interface LoanOption {
  id: string;
  name: string;
  description: string;
  useCases: string[];
  minAmount: number;
  maxAmount: number;
  minMonths: number;
  maxMonths: number;
}

export interface CashFlowPeriod {
  id: string;
  label: string;
  months: { label: string; inflow: number; outflow: number }[];
}
