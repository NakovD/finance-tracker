type AuthStoreUnAuthenticated = { isAuthenticated: false } & {};

type AuthStoreAuthenticated = { isAuthenticated: true } & {
  userName: string;
  userId: number;
  userEmail: string;
};

type AuthStore = AuthStoreUnAuthenticated | AuthStoreAuthenticated;

export const authStore = $state<{ value: AuthStore }>({
  value: { isAuthenticated: false },
});
