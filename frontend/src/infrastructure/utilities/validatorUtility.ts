import type { safeParse } from "zod";
import { formatError } from "zod";

export const handleZodValidationResult = (
  validationResult: ReturnType<typeof safeParse>,
) => {
  if (validationResult.success) return undefined;

  const errors = formatError(validationResult.error);

  return errors._errors[0];
};
