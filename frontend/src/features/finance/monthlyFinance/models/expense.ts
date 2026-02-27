import type { expenseValidator } from "../validators/expenseValidator";
import type { infer as ZodInfer } from "zod";

export type Expense = ZodInfer<typeof expenseValidator>;
