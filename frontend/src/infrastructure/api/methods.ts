import { HTTPError } from "ky";
import { httpInstance } from "./httpInstance";
import type { AppError } from "./models/AppError";
import type { ZodObject } from "zod";

export const METHODS = {
  GET: async <T extends Record<string, any>>(
    endpoint: string,
    validator: ZodObject<T>
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
    const response = httpInstance
      .post<TResponse>(endpoint, { json: body })
      .json();

    return response;
  },
} as const;
