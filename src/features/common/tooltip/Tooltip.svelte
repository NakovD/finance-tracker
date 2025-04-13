<script lang="ts">
  import type { Snippet } from "svelte";

  let { title = "", children }: { title: string; children: Snippet<[]> } =
    $props();
  let isHovered = $state(false);
  let x = $state();
  let y = $state();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<div
  onmouseover={(event) => {
    isHovered = true;
    x = event.pageX + 5;
    y = event.pageY + 5;
  }}
  onmouseleave={() => {
    isHovered = false;
  }}
  onmousemove={(event) => {
    x = event.pageX + 5;
    y = event.pageY + 5;
  }}
>
  {@render children()}
</div>

{#if isHovered}
  <div style="top: {y}px; left: {x}px;" class="absolute border border-b-cyan-500 rounded-md bg-pink-100 text-black whitespace-pre-wrap p-3">{title}</div>
{/if}
