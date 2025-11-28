<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import MonthlyFinance from "./features/finance/monthlyFinance/MonthlyFinance.svelte";
  import YearlyFinance from "./features/finance/yearlyFinance/YearlyFinance.svelte";
  import AllYears from "./features/finance/overview/AllYears.svelte";
  import { Toaster } from "svelte-sonner";
  import Login from "./features/auth/login/Login.svelte";
  import CrsrTokenLoader from "./features/auth/CrsrTokenLoader.svelte";
  import Register from "./features/auth/register/Register.svelte";

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
    <CrsrTokenLoader />
    <Router>
      <Route path="/monthly-finance/:id" let:params>
        <MonthlyFinance id={params.id} />
      </Route>
      <Route path="/yearly-finance/:id" let:params>
        <YearlyFinance id={params.id} /></Route
      >
      <Route path="/"><AllYears /></Route>
      <Route path="/login"><Login /></Route>
      <Route path="/register"><Register /></Route>
    </Router>
  </main>
</QueryClientProvider>
