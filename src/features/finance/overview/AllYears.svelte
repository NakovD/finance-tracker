<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { Link } from "svelte-routing";
  import { expenseTrackerDB } from "../../../infrastructure/db";
  import { handleDbAction } from "../../../infrastructure/db/utilities/handleDbAction";

  const query = createQuery<number[]>({
    queryKey: ["all-finances"],
    queryFn: () => handleDbAction(() => expenseTrackerDB.getAvailableYears()),
  });
</script>

<div class="mx-auto my-8 max-w-2xl">
  <h1 class="text-2xl">Years</h1>
  <div class="mb-4"></div>
  <div class="max-w-2xl mx-auto grid grid-cols-4 gap-4">
    {#if $query.isSuccess}
      {#if $query.data.length > 0}
        {#each $query.data as year}
          <Link
            to="/yearly-finance/2025"
            class="shadow-md rounded-lg p-4 bg-blue-500 text-white hover:bg-blue-800 transition duration-300 ease-in-out"
          >
            <p class="text-xl font-semibold">{year}</p>
          </Link>
        {/each}
      {/if}
      {#if $query.data.length === 0}
        <p class="text-gray-500">No expenses found.</p>
      {/if}
    {/if}
  </div>
</div>
