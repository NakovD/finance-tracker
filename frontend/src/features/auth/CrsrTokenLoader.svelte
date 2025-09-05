<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { httpInstance } from "../../infrastructure/api/httpInstance";

  const query = createQuery({
    queryKey: ["csrf-token"],
    queryFn: async () => httpInstance.get("csrf-cookie"),
  });
</script>

<div data-csrf-token-loader={$query.isSuccess}></div>
