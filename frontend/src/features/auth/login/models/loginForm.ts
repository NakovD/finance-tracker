export type LoginForm = {
  email: string;
  password: string;
};

export type LoginFormErrors = {
  [K in keyof LoginForm]?: string;
};

export type LoginFormTouchedFields = {
  [K in keyof LoginForm]: boolean;
};
