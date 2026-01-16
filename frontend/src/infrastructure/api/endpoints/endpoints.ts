export const endpoints = {
  auth: {
    register: "register",
    login: "login",
  },
  monthlyFinances: {
    getMonthlyFinances: "monthlyFinances",
    createMonthlyFinance: "monthlyFinances",
    getMonthlyFinance: (id: string) => `monthlyFinances/${id}`,
    updateMonthlyFinance: (id: string) => `monthlyFinances/${id}`,
    deleteMonthlyFinance: (id: string) => `monthlyFinances/${id}`,
  }
} as const;
