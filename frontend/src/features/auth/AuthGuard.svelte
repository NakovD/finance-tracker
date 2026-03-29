<script lang="ts">
  import type { Snippet } from "svelte";
  import { userQuery } from "./common/queries/userQuery";
  import { routePaths } from "../../infrastructure/routing/routePaths";
  import { getIsAuthRequiredForRoute } from "../../infrastructure/routing/utilities/routingUtility";
  import { navigate } from "svelte-routing";
  import { authStore } from "./stores/AuthStore.svelte";

  const { children }: { children: Snippet<[]> } = $props();

  const query = userQuery();

  $effect(() => {
    if ($query.isLoading) return;
    const currentRoute = window.location.pathname;

    const isAuthRequired = getIsAuthRequiredForRoute(currentRoute);

    if (
      (!$query.data || $query.isError || !$query.isSuccess) &&
      isAuthRequired
    ) {
      navigate(routePaths.auth.login);

      return;
    }

    if (!$query.isSuccess) return;

    authStore.value = {
      isAuthenticated: true,
      userEmail: $query.data.email,
      userId: $query.data.id,
      userName: $query.data.name,
    };

    if (!isAuthRequired) navigate(routePaths.home);
  });
</script>

{#if $query.isLoading}
  <div class="h-full flex items-center justify-center">
    <p class="text-center text-slate-200 text-sm tracking-wide animate-pulse">
      Checking if you are authenticated, please wait…
    </p>
  </div>
{:else}
  {@render children()}
{/if}
