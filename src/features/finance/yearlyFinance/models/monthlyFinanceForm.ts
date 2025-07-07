import type { MonthlyFinanceMonth } from "./monthlyFinanceMonth";

export type MonthlyFinanceForm = {
  monthName: MonthlyFinanceMonth | string;
  income: number;
};

export type MonthlyFinanceFormErrors = {
  [K in keyof MonthlyFinanceForm]?: string;
};

export type MonthlyFinanceFormTouchedFields = {
  [K in keyof MonthlyFinanceForm]: boolean;
};
