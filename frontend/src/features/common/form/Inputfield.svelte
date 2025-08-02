<script lang="ts">
  import type {
    HTMLInputAttributes,
  } from "svelte/elements";
  import { cn } from "../../../infrastructure/utilities/twUtils";

  type InputFieldProps = {
    error?: string;
  } & HTMLInputAttributes;

  const { class: className, error, ...other }: InputFieldProps = $props();
</script>

<input
  class={cn(
    className,
    {
      "border-amber-200 focus:border-blue-500 focus:ring-blue-500":
        error === undefined,
    },
    { "border-red-500": error !== undefined },
    "py-2.5 px-4 block w-full rounded-lg outline-none border-1 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
  )}
  {...other}
/>
