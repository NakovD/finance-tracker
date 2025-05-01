import type { Expense } from "./expense";

export type MontlyFinance = {
  id: string;
  name: string;
  year: number;
  income: number;
  expenses: Expense[];
};
