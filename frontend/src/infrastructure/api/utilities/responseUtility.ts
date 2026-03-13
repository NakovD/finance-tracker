import type { KyResponse } from "ky";

export const parseResponse = (response: KyResponse) => {
  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text();
};
