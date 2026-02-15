export const endpoints = {
  auth: {
    register: "register",
    login: "login",
    user: "user",
  },
  monthlyFinances: {
    getAvailableYears: "monthlyFinances/meta/available-years",
    getMonthlyFinances: "monthlyFinances",
    createMonthlyFinance: "monthlyFinances",
    getMonthlyFinancesByYear: (year: number) => `monthlyFinances?year=${year}`,
    getMonthlyFinance: (id: string) => `monthlyFinances/${id}`,
    updateMonthlyFinance: (id: string) => `monthlyFinances/${id}`,
    deleteMonthlyFinance: (id: string) => `monthlyFinances/${id}`,
  }
} as const;
