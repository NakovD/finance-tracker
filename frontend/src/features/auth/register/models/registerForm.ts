export type RegisterForm = {
  email: string;
  password: string;
  repeatPassword: string;
  termsAccepted: boolean;
  firstName: string;
  lastName: string;
};

export type RegisterFormErrors = {
  [K in keyof RegisterForm]?: string;
};

export type RegisterFormTouchedFields = {
  [K in keyof RegisterForm]: boolean;
};
