import type { MonthlyFinanceMonth } from "./monthlyFinanceMonth";

export type MontlyFinanceForm = {
  monthName: MonthlyFinanceMonth | string;
  income: number;
};

export type MontlyFinanceFormErrors = {
  [K in keyof MontlyFinanceForm]?: string;
};

export type MontlyFinanceFormTouchedFields = {
  [K in keyof MontlyFinanceForm]: boolean;
};
