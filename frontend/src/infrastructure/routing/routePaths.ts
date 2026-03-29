export const routePaths = {
  home: "/",
  auth: {
    login: "/login",
    register: "/register",
  },
  monthlyFinance: "/monthly-finance/:id",
  yearlyFinance: "/yearly-finance/:id",
} as const;
