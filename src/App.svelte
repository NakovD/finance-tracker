<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import MontlyFinance from "./features/finance/montlyFinance/MontlyFinance.svelte";

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
</script>

<QueryClientProvider client={queryClient}>
  <main>
    <Router>
      <Route path="/montly-finance/:id" component={MontlyFinance} />
    </Router>
    <MontlyFinance />
  </main>
</QueryClientProvider>
