<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import type { MontlyFinance } from "./models/montlyFinance";
  import AddExpenseForm from "./components/AddExpenseForm.svelte";
  import ExpenseListItem from "./components/ExpenseListItem.svelte";
  import { expenseTrackerDB } from "../../../infrastructure/db";
  import { handleDbAction } from "../../../infrastructure/db/utilities/handleDbAction";
  import { sum } from "../../../infrastructure/utilities/reduceUtility";

  const query = createQuery<MontlyFinance>({
    queryKey: ["montly-finance", "147a2270-0c34-4c9e-bae7-7d16fcdebf13"],
    queryFn: () =>
      handleDbAction(() =>
        expenseTrackerDB.getSingleById<MontlyFinance>(
          "147a2270-0c34-4c9e-bae7-7d16fcdebf13"
        )
      ),
  });
</script>

{#if $query.isLoading}
  <p>Loading...</p>
{:else if $query.isError}
  <p>Error: {$query.error.message}</p>
{:else if $query.isSuccess}
  <div class="max-w-2xl my-8 mx-auto">
    <h1>
      Finance for month: {$query.data.name}/{$query.data.year}
    </h1>
    <p>Income: <span>{$query.data.income}</span></p>
    <div class="mb-4"></div>
    {#if $query.data.expenses.length > 0}
      <h2>Expenses</h2>
      <div class="mb-4"></div>
      <ul class="list-none grid grid-cols-2 gap-2">
        {#each $query.data.expenses as expense (expense.id)}
          <ExpenseListItem {expense} month={$query.data} />
        {/each}
      </ul>
    {:else}
      <p>No expenses found.</p>
    {/if}
    <div class="mb-4"></div>
    <div>
      <h2>Summary</h2>
      <div class="mb-4"></div>
      <p>
        Total Expenses: <span>{sum($query.data.expenses, "amount")}</span>
      </p>
      <div class="mb-4"></div>
      <p>
        Remaining Budget: <span
          >{$query.data.income - sum($query.data.expenses, "amount")}</span
        >
      </p>
    </div>
    <div class="mb-5"></div>
    <AddExpenseForm month={$query.data} />
  </div>
{/if}
