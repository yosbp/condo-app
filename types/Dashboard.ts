export interface DashboardData {
  balance: number;
  transactions: Transactions[];
  month_balance: MonthBalance;
  previous_month_balance: PreviousMonthBalance;
  evolution_balance: EvolutionBalance;
  total_units: number;
}

interface Transactions {
  id: number;
  amount: number;
  type: string;
  date: Date;
  number: string;
  created_at: Date;
}

interface MonthBalance {
  month: string;
  difference: number;
  total_monthly_expense: number;
  total_monthly_income: number;
  last_day_of_month: string;
}

interface PreviousMonthBalance {
  month: string;
  difference: number;
  total_monthly_expense: number;
  total_monthly_income: number;
  last_day_of_month: string;
}

interface EvolutionBalance {
  labels: string[];
  data: string[];
}
