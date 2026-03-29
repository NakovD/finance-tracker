import type { monthlyFinanceQueryValidator } from "../validators/monthlyFinanceValidator";
import type { infer as ZodInfer } from "zod";

export type MonthlyFinance = ZodInfer<typeof monthlyFinanceQueryValidator>;
