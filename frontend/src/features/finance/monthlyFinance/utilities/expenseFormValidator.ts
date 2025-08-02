export const expenseFormValidator = {
  validateName: (value: string) => {
    if (value.length < 3) {
      return "Name must be at least 3 characters long";
    }
    return undefined;
  },

  validateAmount: (value: string | number) => {
    const num = typeof value === "number" ? value : Number(value);
    if (isNaN(num) || num <= 0) {
      return "Please enter a valid amount";
    }
    return undefined;
  },

  validateDate: (value: string) => {
    if (!value) {
      return "Please select a date";
    }
    return undefined;
  },

  validateDescription: (value: string) => {
    if (value.length > 0 && value.length < 10) {
      return "Description must be at least 10 characters long";
    }
    return undefined;
  },

  validateCategory: (value: string | undefined) => {
    if (!value) {
      return "Please select a category";
    }
    return undefined;
  },
} as const;