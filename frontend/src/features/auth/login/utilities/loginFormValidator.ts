const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const loginFormValidator = {
  validateEmail: (value: string) => {
    console.log("daw");
    
    if (!value) {
      return "Email is required.";
    } else {
      if (!emailRegex.test(value.trim())) return "Invalid email.";
      return undefined;
    }
  },

  validatePassword: (value: string) => {
    if (!value) return "Password is required.";
    return undefined;
  },
} as const;
