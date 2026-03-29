import { routePaths } from "../routePaths";

export const getIsAuthRequiredForRoute = (route: string) => {
  if (route === routePaths.auth.login || route === routePaths.auth.register) {
    return false;
  }

  return true;
};
