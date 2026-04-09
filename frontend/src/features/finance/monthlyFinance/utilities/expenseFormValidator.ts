import { number, preprocess, string, transform } from "zod";
import { handleZodValidationResult } from "../../../../infrastructure/utilities/validatorUtility";

export const expenseFormValidator = {
  validateName: (value: string) =>
    handleZodValidationResult(
      string()
        .nonempty("Name is required.")
        .min(3, "Name must be at least 3 characters long")
        .safeParse(value),
    ),
  validateAmount: (value: string) =>
    handleZodValidationResult(
      preprocess(
        (val: string) => parseFloat(val) || 0,
        number("Please enter a valid amount").positive(
          "Amount must be a positive number",
        ),
      ).safeParse(value),
    ),
  validateDate: (value: string) =>
    handleZodValidationResult(
      string().nonempty("Date is required.").safeParse(value),
    ),
  validateDescription: (value: string) =>
    handleZodValidationResult(
      preprocess(
        (val) => (val === "" ? undefined : val),
        string()
          .min(10, "Description must be at least 10 characters long")
          .optional(),
      ).safeParse(value),
    ),
  validateCategory: (value: string | undefined) =>
    handleZodValidationResult(
      string().nonempty("Category is required.").safeParse(value),
    ),
} as const;
