import { email, number, object, string } from "zod/v4";
import { createQueryFacade } from "../../../../infrastructure/api/createQueryFacade";
import { endpoints } from "../../../../infrastructure/api/endpoints/endpoints";

export const queryKeyUser = ["user"];

export const userQuery = () =>
  createQueryFacade({
    queryKey: queryKeyUser,
    endpoint: endpoints.auth.user,
    validator: object({
      email: email(),
      id: number(),
      name: string(),
    }),
  });
