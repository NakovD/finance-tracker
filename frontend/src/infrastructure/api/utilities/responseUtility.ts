import type { KyResponse } from "ky";

export const parseResponse = <T>(response: KyResponse<T>) => {
  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text();
};
