<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";
  import { cn } from "../../../infrastructure/utilities/twUtils";

  const {
    class: className,
    error,
    ...other
  }: HTMLTextareaAttributes & {
    error?: string;
  } = $props();
</script>

<textarea
  class={cn(
    {
      "border-amber-200 focus:border-blue-500 focus:ring-blue-500":
        error === undefined,
    },
    { "border-red-500": error !== undefined },
    "py-2.5 sm:py-3 px-4 block w-full rounded-lg outline-none border-1 sm:text-sm  disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600",
    className
  )}
  {...other}
></textarea>
