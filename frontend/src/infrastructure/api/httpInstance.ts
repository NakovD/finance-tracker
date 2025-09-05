import ky from "ky";

export const httpInstance = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL,
  retry: 0,
});