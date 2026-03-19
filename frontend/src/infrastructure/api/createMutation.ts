import {
  createMutation,
  type CreateMutationOptions,
} from "@tanstack/svelte-query";
import type { HTTPError } from "ky";
import { METHODS } from "./methods";

type CreateMutationFacadeOptions<TRequest, TResponse> = Omit<
  CreateMutationOptions<TResponse, HTTPError, TRequest>,
  "mutationFn"
> & { endpoint: string };

export const createMutationFacade = <TRequest, TResponse = void>({
  endpoint,
  ...rest
}: CreateMutationFacadeOptions<TRequest, string | TResponse>) =>
  createMutation({
    mutationFn: (body) =>
      METHODS.POST<TRequest, TResponse>(endpoint, body),
    ...rest,
  });
