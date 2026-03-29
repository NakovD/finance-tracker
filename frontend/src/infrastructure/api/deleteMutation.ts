import {
  createMutation,
  type CreateMutationOptions,
} from "@tanstack/svelte-query";
import type { HTTPError } from "ky";
import { METHODS } from "./methods";

type DeleteMutationFacadeOptions<TResponse> = Omit<
  CreateMutationOptions<TResponse, HTTPError, void>,
  "mutationFn"
> & { endpoint: string };

export const createDeleteMutationFacade = <TResponse = void>({
  endpoint,
  ...rest
}: DeleteMutationFacadeOptions<string | TResponse>) =>
  createMutation({
    mutationFn: () => METHODS.DELETE<TResponse>(endpoint),
    ...rest,
  });
