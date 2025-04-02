<script lang="ts">
  import type {
    FocusEventHandler,
    HTMLInputAttributes,
    HTMLInputTypeAttribute,
  } from "svelte/elements";
  import { cn } from "../../../infrastructure/utilities/twUtils";

  type InputFieldProps = {
    id: string;
    type: HTMLInputTypeAttribute;
    value: string;
    error?: string;
    placeholder: string;
    onBlur?: HTMLInputAttributes["onblur"];
  };

  let {
    id,
    type,
    value = $bindable(""),
    placeholder,
    error,
    onBlur,
  }: InputFieldProps = $props();
</script>

<input
  {id}
  {type}
  {placeholder}
  {value}
  onblur={onBlur}
  oninput={({ currentTarget }) => (value = currentTarget.value)}
  class={cn(
    {
      "border-amber-200 focus:border-blue-500 focus:ring-blue-500":
        error === undefined,
    },
    { "border-red-500": error !== undefined },
    "py-2.5 sm:py-3 px-4 block w-full rounded-lg outline-none border-1 sm:text-sm  disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
  )}
/>
