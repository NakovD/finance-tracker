<script lang="ts">
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
  import Finance from "./features/finance/Finance.svelte";
</script>

<QueryClientProvider client={queryClient}>
  <main>
    <Finance />
  </main>
</QueryClientProvider>

<!-- <style>
</style> -->
