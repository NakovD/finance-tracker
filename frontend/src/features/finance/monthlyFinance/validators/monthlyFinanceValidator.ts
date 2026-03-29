import { array, number, object, string } from "zod";
import { expenseValidator } from "./expenseValidator";

export const monthlyFinanceQueryValidator = object({
  id: number(),
  income: number(),
  name: string(),
  year: number(),
  expenses: array(expenseValidator),
});
