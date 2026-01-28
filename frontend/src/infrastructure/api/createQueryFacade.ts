import { createQuery, type CreateQueryOptions } from "@tanstack/svelte-query";
import { type ZodType } from "zod";
import type { AppError } from "./models/AppError";
import { METHODS } from "./methods";

type FacadeOptions<T extends Record<string, any>> = Omit<
  CreateQueryOptions<T, AppError>,
  "queryFn"
> & { endpoint: string; validator: ZodType<T> };

export const createQueryFacade = <T extends Record<string, any>>({
  endpoint,
  validator,
  ...rest
}: FacadeOptions<T>) =>
  createQuery<T, AppError>({
    ...rest,
    queryFn: () => METHODS.GET(endpoint, validator),
  });
