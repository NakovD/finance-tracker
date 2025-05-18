import type { Expense } from "../models/expense";

export const handleExpenseUpdateAdd = (
  expense: Expense,
  expenses: Expense[]
) => {
  const existingExpenseIndex = expenses.findIndex((e) => e.id === expense.id);

  if (existingExpenseIndex !== -1) {
    const updatedExpenses = [...expenses];

    updatedExpenses[existingExpenseIndex] = expense;

    return updatedExpenses;
  }

  return [...expenses, expense];
};
