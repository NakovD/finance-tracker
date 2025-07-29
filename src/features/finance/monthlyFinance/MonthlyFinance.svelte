<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import type { MonthlyFinance } from "./models/monthlyFinance";
  import AddExpenseForm from "./components/AddExpenseForm.svelte";
  import { expenseTrackerDB } from "../../../infrastructure/db";
  import { handleDbAction } from "../../../infrastructure/db/utilities/handleDbAction";
  import { sum } from "../../../infrastructure/utilities/reduceUtility";
  import MonthlyExpenses from "./components/MonthlyExpenses.svelte";
  import Loader from "../../common/loader/Loader.svelte";

  let { id }: { id: string } = $props();

  const query = createQuery<MonthlyFinance>({
    queryKey: ["monthly-finance", id],
    queryFn: () =>
      handleDbAction(() => expenseTrackerDB.getSingleById<MonthlyFinance>(id)),
  });
</script>

{#if $query.isLoading}
  <Loader />
{:else if $query.isError}
  <p>Error: {$query.error.message}</p>
{:else if $query.isSuccess}
  <div class="max-w-2xl my-8 mx-auto">
    <h1>
      Finance for month: {$query.data.name}/{$query.data.year}
    </h1>
    <p>Income: <span>{$query.data.income}</span></p>
    <div class="mb-4"></div>
    <p>Expenses grouped by category</p>
    <div class="mb-4"></div>
    {#if $query.data.expenses.length > 0}
      <MonthlyExpenses
        expenses={$query.data.expenses}
        monthFinance={$query.data}
      />
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
