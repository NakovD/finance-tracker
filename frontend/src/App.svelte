<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import MonthlyFinance from "./features/finance/monthlyFinance/MonthlyFinance.svelte";
  import YearlyFinance from "./features/finance/yearlyFinance/YearlyFinance.svelte";
  import AllYears from "./features/finance/overview/AllYears.svelte";
  import { Toaster } from "svelte-sonner";
  import Login from "./features/auth/login/Login.svelte";
  import CrsrTokenLoader from "./features/auth/CsrfTokenLoader.svelte";
  import Register from "./features/auth/register/Register.svelte";
  import { routePaths } from "./infrastructure/routing/routePaths";
  import AuthGuard from "./features/auth/AuthGuard.svelte";

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
</script>

<QueryClientProvider client={queryClient}>
  <Toaster richColors={true} theme="dark" position="top-left" />
  <main class="h-full">
    <CrsrTokenLoader />
    <Router>
      <AuthGuard>
        <Route path={routePaths.monthlyFinance} let:params>
          <MonthlyFinance id={params.id} />
        </Route>
        <Route path={routePaths.yearlyFinance} let:params>
          <YearlyFinance id={params.id} /></Route
        >
        <Route path={routePaths.home}><AllYears /></Route>
        <Route path={routePaths.auth.login}><Login /></Route>
        <Route path={routePaths.auth.register}><Register /></Route>
      </AuthGuard>
    </Router>
  </main>
</QueryClientProvider>
