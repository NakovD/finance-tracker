import { createQueryFacade } from "../../../../infrastructure/api/createQueryFacade";
import { endpoints } from "../../../../infrastructure/api/endpoints/endpoints";
import { monthlyFinanceQueryValidator } from "../validators/monthlyFinanceValidator";

export const monthlyFinanceQueryKey = (id: string | number) =>
  ["monthly-finance", id.toString()] as const;

export const monthlyFinanceQuery = (id: string) =>
  createQueryFacade({
    queryKey: monthlyFinanceQueryKey(id),
    endpoint: endpoints.monthlyFinances.getMonthlyFinance(id.toString()),
    validator: monthlyFinanceQueryValidator,
  });
