import { createQuery, type CreateQueryOptions } from "@tanstack/svelte-query";
import { httpInstance } from "./httpInstance";
import { HTTPError } from "ky";
import { object, string, type ZodObject } from "zod";
import type { AppError } from "./models/AppError";

type FacadeOptions<T extends Record<string, any>> = Omit<
  CreateQueryOptions<T, AppError>,
  "queryFn"
> & { endpoint: string; validator: ZodObject<T> };

export const createQueryFacade = <T extends object>({
  endpoint,
  validator,
  ...rest
}: FacadeOptions<T>) =>
  createQuery<T, AppError>({
    ...rest,
    queryFn: async () => {
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
  });
