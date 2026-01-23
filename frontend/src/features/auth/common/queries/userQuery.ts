import { email, number, object, string } from "zod";
import { createQueryFacade } from "../../../../infrastructure/api/createQueryFacade";
import { endpoints } from "../../../../infrastructure/api/endpoints/endpoints";

export const userQuery = () =>
  createQueryFacade({
    queryKey: ["user-query"],
    endpoint: endpoints.auth.user,
    validator: object({
      email: email(),
      id: number(),
      name: string(),
    }),
  });
