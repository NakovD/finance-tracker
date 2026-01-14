export const endpoints = {
  auth: {
    register: "register",
    login: "login",
  },
  monthlyFinances: {
    getMonthlyFinances: "monthly-finances",
    createMonthlyFinance: "monthlyFinances",
    getMonthlyFinance: (id: string) => `monthly-finances/${id}`,
    updateMonthlyFinance: (id: string) => `monthly-finances/${id}`,
    deleteMonthlyFinance: (id: string) => `monthly-finances/${id}`,
  }
} as const;
