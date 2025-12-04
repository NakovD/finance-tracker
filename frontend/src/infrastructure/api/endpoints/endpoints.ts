export const endpoints = {
  auth: {
    register: "register",
    login: "login",
  },
  monthlyFinances: {
    getMonthlyFinances: "monthly-finances",
    createMonthlyFinance: "monthly-finances",
    getMonthlyFinance: (id: string) => `monthly-finances/${id}`,
    updateMonthlyFinance: (id: string) => `monthly-finances/${id}`,
    deleteMonthlyFinance: (id: string) => `monthly-finances/${id}`,
  }
} as const;
