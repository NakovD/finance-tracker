<script lang="ts">
  import clsx from "clsx";
import type { Snippet } from "svelte";
  import type { HTMLLabelAttributes } from "svelte/elements";

  type LabelProps = {
    id: string;
    label: string;
    children: Snippet;
  } & Omit<HTMLLabelAttributes, "children">;

  let { id, label, class: className, children, ...rest }: LabelProps = $props();
</script>

<label class={clsx("block", className)} for={id} {...rest}>
  <span>{label}</span>
  <div class="mb-2"></div>
  {@render children()}
</label>
