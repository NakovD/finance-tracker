import {
  createMutation,
  type CreateMutationOptions,
} from "@tanstack/svelte-query";
import { httpInstance } from "./httpInstance";
import type { HTTPError } from "ky";

type CreateMutationFacadeOptions<TRequest, TResponse> = Omit<
  CreateMutationOptions<TResponse, HTTPError, TRequest>,
  "mutationFn"
> & { endpoint: string };

export const createMutationFacade = <TRequest, TResponse>({
  endpoint,
  ...rest
}: CreateMutationFacadeOptions<TRequest, TResponse>) =>
  createMutation({
    mutationFn: (body) =>
      httpInstance.post<TResponse>(endpoint, { json: body }).json(),
    ...rest,
  });
