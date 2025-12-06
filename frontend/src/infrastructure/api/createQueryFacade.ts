import { createQuery, type CreateQueryOptions } from "@tanstack/svelte-query";
import { httpInstance } from "./httpInstance";
import type { HTTPError } from "ky";

type FacadeOptions<T extends object> = Omit<
  CreateQueryOptions<T, HTTPError>,
  "queryFn"
> & { endpoint: string };

export const createQueryFacade = <T extends object>({
  endpoint,
  ...rest
}: FacadeOptions<T>) =>
  createQuery<T, HTTPError>({
    ...rest,
    queryFn: () => httpInstance.get(endpoint).json<T>(),
  });
