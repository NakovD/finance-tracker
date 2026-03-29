<script lang="ts">
  import Loader from "../../common/loader/Loader.svelte";
  import { createQueryFacade } from "../../../infrastructure/api/createQueryFacade";
  import { endpoints } from "../../../infrastructure/api/endpoints/endpoints";
  import { array, number } from "zod";
  import { Link } from "svelte-routing";

  const query = createQueryFacade({
    endpoint: endpoints.monthlyFinances.getAvailableYears,
    queryKey: ["all-finances"],
    validator: array(number()),
  });
</script>

<div class="mx-auto my-8 max-w-2xl">
  <h1 class="text-2xl">Years</h1>
  <div class="mb-4"></div>
  <div class="max-w-2xl mx-auto grid grid-cols-4 gap-4">
    {#if $query.isLoading}
      <Loader />
    {:else if $query.isError}
      <p class="text-red-500">Failed to load data.</p>
    {:else if $query.isSuccess}
      {#if $query.data.length > 0}
        {#each $query.data as year}
          <Link
            to={`/yearly-finance/${year}`}
            class="shadow-md rounded-lg p-4 bg-blue-500 text-white hover:bg-blue-800 transition duration-300 ease-in-out"
          >
            <p class="text-xl font-semibold">{year}</p>
          </Link>
        {/each}
      {/if}
      {#if $query.data.length === 0}
        <p class="text-gray-500">No years found.</p>
      {/if}
    {/if}
  </div>
</div>
