<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../../../infrastructure/utilities/twUtils";

  const {
    children,
    class: _class,
    ...rest
  }: Omit<HTMLButtonAttributes, "children"> & { children: Snippet<[]> } =
    $props();
</script>

<button {...rest} class={cn(_class, "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded")}>
  {@render children()}
</button>
