import type { HTTPError } from "ky";
import type { ZodError } from "zod";

export type AppError =
  | {
      type: "validation";
      error: ZodError;
    }
  | {
      type: "error";
      error: HTTPError;
    }
  | {
      type: "unknown";
      error: unknown;
    };
