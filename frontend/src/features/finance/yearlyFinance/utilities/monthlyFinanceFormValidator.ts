import { months } from "../constants/months";

export const monthlyFinanceFormValidator = {
  validateMonthName: (value: string) => {
    if (!value) {
      return "Month name is required.";
    } else {
      if (months.some((m) => m === value)) return undefined;
      else {
        return "Invalid month name.";
      }
    }
  },

  validateIncome: (value: number) => {
    if (value === undefined || value === null || isNaN(value))
      return "Income is required.";
    else if (typeof value !== "number" || value <= 0)
      return "Income must be a positive number.";
    else return undefined;
  },
  validateYear: (value: number) => {
    if (value === undefined || value === null || isNaN(value))
      return "Year is required.";
    else if (
      typeof value !== "number" ||
      value < 2000 ||
      value > 2100
    )
      return `Year must be between 2000 and ${new Date().getFullYear() + 1}.`;
    else return undefined;
  },
} as const;
