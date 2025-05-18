<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import type { MontlyFinance } from "./models/montlyFinance";
  import AddExpenseForm from "./components/AddExpenseForm.svelte";
  import { expenseTrackerDB } from "../../../infrastructure/db";
  import { handleDbAction } from "../../../infrastructure/db/utilities/handleDbAction";
  import { sum } from "../../../infrastructure/utilities/reduceUtility";
  import type { ExpenseCategory as ExponseCategoryType } from "./models/expenseCategory";
  import ExpenseCategory from "./components/ExpenseCategory.svelte";

  let props: { id: string } = $props();

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
    <p>Expenses grouped by category</p>
    <div class="mb-4"></div>
    {#if $query.data.expenses.length > 0}
      {@const categories = Object.groupBy(
        $query.data.expenses,
        (e) => e.category
      )}
      {@const categoryNames = Object.keys(categories) as ExponseCategoryType[]}
      <div class="flex flex-col gap-4">
        {#each categoryNames as categoryName}
          {#if categories[categoryName] !== undefined}
            <ExpenseCategory
              {categoryName}
              expenses={categories[categoryName]}
              montlyFinance={$query.data}
            />
          {/if}
        {/each}
      </div>
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
