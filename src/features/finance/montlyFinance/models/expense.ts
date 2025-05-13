import type { ExpenseCategory } from "./expenseCategory";

export type Expense = {
  id: string;
  name: string;
  amount: number;
  date: string;
  description?: string;
  category: ExpenseCategory;
};
