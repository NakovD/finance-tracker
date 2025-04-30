<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
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
    <Router>
      <Route path="/finance/:id" component={Finance} />
    </Router>
    <Finance />
  </main>
</QueryClientProvider>
