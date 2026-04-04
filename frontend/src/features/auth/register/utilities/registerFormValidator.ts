import { email, string } from "zod";
import { authConstants } from "../../common/constants";
import { handleZodValidationResult } from "../../../../infrastructure/utilities/validatorUtility";

export const registerFormValidator = {
  validateEmail: (value: string) =>
    handleZodValidationResult(
      email()
        .nonempty("Email is required.")
        .regex(authConstants.emailRegex, "Invalid email address")
        .safeParse(value),
    ),
  validateFirstName: (value: string) =>
    handleZodValidationResult(
      string()
        .nonempty("First name is required.")
        .min(2, "First name must be at least 2 characters.")
        .safeParse(value),
    ),
  validateLastName: (value: string) =>
    handleZodValidationResult(
      string()
        .nonempty("Last name is required.")
        .min(2, "Last name must be at least 2 characters.")
        .safeParse(value),
    ),
  validatePassword: (value: string) =>
    handleZodValidationResult(
      string()
        .nonempty("Password is required.")
        .min(8, "Password must be at least 8 characters.")
        .regex(
          authConstants.passwordRegex,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        )
        .safeParse(value),
    ),
  validateRepeatPassword: (value: string, password: string) =>
    handleZodValidationResult(
      string()
        .nonempty("Please repeat your password.")
        .refine((val) => val === password, "Passwords do not match.")
        .safeParse(value),
    ),
} as const;
