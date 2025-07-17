<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import MontlyFinance from "./features/finance/monthlyFinance/MonthlyFinance.svelte";
  import YearlyFinance from "./features/finance/yearlyFinance/YearlyFinance.svelte";
  import AllYears from "./features/finance/overview/AllYears.svelte";
  import { Toaster } from "svelte-sonner";

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
  <Toaster richColors={true} theme="dark" position="top-left" />
  <main>
    <Router>
      <Route path="/montly-finance/:id" let:params>
        <MontlyFinance id={params.id} />
      </Route>
      <Route path="/yearly-finance/:id" let:params>
        <YearlyFinance id={params.id} /></Route
      >
      <Route path="/"><AllYears /></Route>
    </Router>
  </main>
</QueryClientProvider>
