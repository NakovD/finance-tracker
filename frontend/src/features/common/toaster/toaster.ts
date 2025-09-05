import { toast } from "svelte-sonner";

export const toaster = {
  showSuccess: (...args: Parameters<typeof toast.success>) => toast(...args),
  showError: (...args: Parameters<typeof toast.error>) => toast(...args),
  showInfo: (...args: Parameters<typeof toast.info>) => toast(...args),
} as const;
