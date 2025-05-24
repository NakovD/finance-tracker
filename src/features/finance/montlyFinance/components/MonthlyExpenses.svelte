<script lang="ts">
  import type { Expense } from "../models/expense";
  import type { ExpenseCategory as ExpenseCategoryType } from "../models/expenseCategory";
  import type { MontlyFinance } from "../models/montlyFinance";
  import ExpenseCategory from "./ExpenseCategory.svelte";

  const {
    expenses,
    monthFinance,
  }: { expenses: Expense[]; monthFinance: MontlyFinance } = $props();

  const groupedByCategories = Object.groupBy(expenses, (e) => e.category);
  const categories = Object.keys(groupedByCategories) as ExpenseCategoryType[];
</script>

<div class="flex flex-col gap-4">
  {#each categories as category}
    {#if groupedByCategories[category] !== undefined}
      <ExpenseCategory
        categoryName={category}
        expenses={groupedByCategories[category]}
        montlyFinance={monthFinance}
      />
    {/if}
  {/each}
</div>
