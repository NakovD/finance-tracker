import { number, string } from "zod";
import { handleZodValidationResult } from "../../../../infrastructure/utilities/validatorUtility";
import { months } from "../constants/months";

export const monthlyFinanceFormValidator = {
  validateMonthName: (value: string) =>
    handleZodValidationResult(
      string()
        .nonempty("Month name is required.")
        .refine((val) => months.some((m) => m === val), "Invalid month name.")
        .safeParse(value),
    ),
  validateIncome: (value: number) =>
    handleZodValidationResult(
      number("Please enter a valid income")
        .positive("Income must be a positive number")
        .safeParse(value),
    ),
  validateYear: (value: number) => handleZodValidationResult(
    number("Please enter a valid year")
      .min(2000, "Year must be between 2000 and 2100")
      .max(2100, "Year must be between 2000 and 2100")
      .safeParse(value)
  ),
} as const;
