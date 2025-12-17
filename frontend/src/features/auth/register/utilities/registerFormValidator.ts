import { authConstants } from "../../common/constants";

export const registerFormValidator = {
  validateEmail: (value: string) => {
    if (!value) {
      return "Email is required.";
    } else {
      if (!authConstants.emailRegex.test(value.trim())) return "Invalid email.";
      return undefined;
    }
  },
  validateFirstName: (value: string) => {
    if (!value) return "First name is required.";

    if (value.length < 2) return "First name must be at least 2 characters.";

    return undefined;
  },
  validateLastName: (value: string) => {
    if (!value) return "Last name is required.";

    if (value.length < 2) return "Last name must be at least 2 characters.";

    return undefined;
  },
  validatePassword: (value: string) => {
    if (!value) return "Password is required.";

    if (value.length < 8) return "Password must be at least 8 characters.";

    if (!authConstants.passwordRegex.test(value)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    return undefined;
  },
  validateRepeatPassword: (value: string, password: string) => {
    if (!value) return "Please repeat your password.";

    if (value !== password) return "Passwords do not match.";

    return undefined;
  },
} as const;
