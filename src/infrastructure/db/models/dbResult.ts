export type DbResult<T> = {
  success: boolean;
  message: string;
  data?: T;
};
