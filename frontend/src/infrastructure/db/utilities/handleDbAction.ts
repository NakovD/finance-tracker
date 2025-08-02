import type { DbResult } from "../models/dbResult";

export const handleDbAction = async <T>(action: () => Promise<DbResult<T>>) => {
  const result = await action();

  if (!result.success) throw new Error(result.message);

  return result.data as T;
};
