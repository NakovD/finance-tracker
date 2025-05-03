<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import MontlyFinance from "./features/finance/montlyFinance/MontlyFinance.svelte";
  import YearlyFinance from "./features/finance/yearlyFinance/YearlyFinance.svelte";

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
      <Route path="/montly-finance/:id" let:params>
        <MontlyFinance id="{params.id}" />
    </Route>
      <Route path="/yearly-finance/:id" component={YearlyFinance} />
    </Router>
  </main>
</QueryClientProvider>
