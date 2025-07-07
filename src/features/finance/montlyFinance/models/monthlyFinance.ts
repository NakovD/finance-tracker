import type { Expense } from "./expense";

export type MonthlyFinance = {
  id: string;
  name: string;
  year: number;
  income: number;
  expenses: Expense[];
};
