import { number, object, string } from "zod";

export const expenseValidator = object({
  id: number(),
  name: string(),
  description: string().nullable().optional(),
  amount: number(),
  date: string(),
  category: string(),
});
