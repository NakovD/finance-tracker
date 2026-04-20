import { email, string } from "zod";
import { handleZodValidationResult } from "../../../../infrastructure/utilities/validatorUtility";
import { authConstants } from "../../common/constants";

export const loginFormValidator = {
  validateEmail: (value: string) =>
    handleZodValidationResult(
      email()
        .nonempty("Email is required.")
        .regex(authConstants.emailRegex, "Invalid email address")
        .safeParse(value),
    ),

  validatePassword: (value: string) =>
    handleZodValidationResult(
      string()
        .nonempty("Password is required.")
        .min(8, "Password must be at least 8 characters long")
        .safeParse(value),
    ),
} as const;
