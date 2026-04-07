<script lang="ts">
  import { cn } from "../../../infrastructure/utilities/twUtils";

  const { class: _class }: { class?: string } = $props();
</script>

<div
  class={cn(
    "flex justify-center items-center min-h-screen bg-neutral-700",
    _class,
  )}
>
  <div
    class="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"
  ></div>
</div>
