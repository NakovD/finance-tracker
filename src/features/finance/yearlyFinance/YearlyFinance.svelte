<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { Link } from "svelte-routing";
  import { expenseTrackerDB } from "../../../infrastructure/db";
  import { handleDbAction } from "../../../infrastructure/db/utilities/handleDbAction";
  import type { MontlyFinance } from "../montlyFinance/models/montlyFinance";
  import AddMontlyFinanceForm from "./components/AddMontlyFinanceForm.svelte";

  const { id }: { id: string } = $props();

  const query = createQuery<MontlyFinance[]>({
    queryKey: ["all-finances"],
    queryFn: () =>
      handleDbAction(() =>
        expenseTrackerDB.getAllForYear<MontlyFinance[]>(+id)
      ),
  });
</script>

<div class="my-8 mx-auto max-w-2xl">
  <h1 class="text-2xl text-center">2025</h1>
  <div class="mb-8"></div>
  <div>
    <p class="">Months:</p>
    <AddMontlyFinanceForm />
  </div>
  <div class="mb-6"></div>
  <div class="max-w-2xl mx-auto grid grid-cols-4 gap-4">
    {#if $query.isSuccess}
      {#if $query.data.length > 0}
        {#each $query.data as montlyExpense}
          <Link
            to="/montly-finance/147a2270-0c34-4c9e-bae7-7d16fcdebf13"
            class="shadow-md rounded-lg p-4 bg-amber-950 text-white hover:bg-amber-800 transition duration-300 ease-in-out"
          >
            <p class="text-xl font-semibold">{montlyExpense.name}</p>
          </Link>
        {/each}
      {/if}
      {#if $query.data.length === 0}
        <p class="text-gray-500">No data available for this year.</p>
      {/if}
    {/if}
  </div>
</div>
