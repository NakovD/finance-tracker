<script lang="ts">
  import type { Snippet } from "svelte";

  type LabelProps = {
    id: string;
    label: string;
    children: Snippet;
  };

  let { id, label, children }: LabelProps = $props();
</script>

<label class="block" for={id}>
  <span>{label}</span>
  <div class="mb-2"></div>
  {@render children()}
</label>
