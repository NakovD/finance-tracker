import {
  createMutation,
  type CreateMutationOptions,
} from "@tanstack/svelte-query";
import type { HTTPError } from "ky";
import { METHODS } from "./methods";

type UpdateMutationFacadeOptions<TRequest, TResponse> = Omit<
  CreateMutationOptions<TResponse, HTTPError, TRequest>,
  "mutationFn"
> & { endpoint: string };

export const updateMutationFacade = <TRequest, TResponse = void>({
  endpoint,
  ...rest
}: UpdateMutationFacadeOptions<TRequest, string | TResponse>) =>
  createMutation({
    mutationFn: (body) =>
      METHODS.PUT<TRequest, TResponse>(endpoint, body),
    ...rest,
  });
