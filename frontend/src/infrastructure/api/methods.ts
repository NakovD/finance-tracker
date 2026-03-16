import { HTTPError } from "ky";
import { httpInstance } from "./httpInstance";
import type { AppError } from "./models/AppError";
import type { ZodType } from "zod";
import { getCsrfToken } from "./utilities/csrfTokenUtility";
import { parseResponse } from "./utilities/responseUtility";

export const METHODS = {
  GET: async <T extends Record<string, unknown>>(
    endpoint: string,
    validator: ZodType<T>,
  ) => {
    try {
      const result = await httpInstance.get(endpoint).json<T>();

      const validation = validator.safeParse(result);

      if (!validation.success) {
        throw <AppError>{
          type: "validation",
          error: validation.error,
        };
      }

      return result;
    } catch (error) {
      if (error instanceof HTTPError) {
        throw <AppError>{
          type: "error",
          error: error,
        };
      }

      if (typeof error === "object" && error && "type" in error) {
        throw error as AppError;
      }

      throw <AppError>{
        type: "unknown",
        error: error,
      };
    }
  },
  POST: async <TRequest, TResponse>(endpoint: string, body: TRequest) => {
    const response = await httpInstance.post<TResponse>(endpoint, {
      headers: new Headers({
        "X-XSRF-TOKEN": getCsrfToken() ?? "",
      }),
      json: body,
    });

    return parseResponse(response);
  },
  DELETE: async <TResponse>(endpoint: string) => {
    const response = await httpInstance.delete<TResponse>(endpoint, {
      headers: new Headers({
        "X-XSRF-TOKEN": getCsrfToken() ?? "",
      }),
    });

    return parseResponse(response);
  }
} as const;


