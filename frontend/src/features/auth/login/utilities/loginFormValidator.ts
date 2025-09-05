import { authConstants } from "../../common/constants";

export const loginFormValidator = {
  validateEmail: (value: string) => {
    if (!value) {
      return "Email is required.";
    } else {
      if (!authConstants.emailRegex.test(value.trim())) return "Invalid email.";
      return undefined;
    }
  },

  validatePassword: (value: string) => {
    if (!value) return "Password is required.";
    return undefined;
  },
} as const;
