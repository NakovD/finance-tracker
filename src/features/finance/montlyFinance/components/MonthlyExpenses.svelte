<script lang="ts">
  import Inputfield from "../../../common/form/Inputfield.svelte";
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

  let search = $state("");

  let filteredExpensesCategories = $derived(
    categories.filter(
      (category) =>
        groupedByCategories[category] !== undefined &&
        groupedByCategories[category].some(
          (expense) =>
            expense.name.toLowerCase().includes(search.toLowerCase()) ||
            expense.description?.toLowerCase().includes(search.toLowerCase())
        )
    )
  );
</script>

<Inputfield
  type="text"
  value={search}
  class="max-w-xs"
  placeholder="Search for an expense in all categories"
  oninput={({ currentTarget }) => (search = currentTarget.value)}
/>
<div class="mb-4"></div>
<div class="flex flex-col gap-4">
  {#key filteredExpensesCategories}
    {#each filteredExpensesCategories as category}
      {#if groupedByCategories[category] !== undefined}
        <ExpenseCategory
          categoryName={category}
          expenses={groupedByCategories[category]}
          montlyFinance={monthFinance}
          initialSearchQuery={search}
        />
      {/if}
    {/each}
  {/key}
</div>
