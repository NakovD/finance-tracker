<script lang="ts">
  import type { Expense } from "../models/expense";
  import type { MontlyFinance } from "../models/montlyFinance";
  import ExpenseListItem from "./ExpenseListItem.svelte";

  let {
    categoryName,
    expenses,
    montlyFinance,
  }: {
    categoryName: string;
    expenses: Expense[];
    montlyFinance: MontlyFinance;
  } = $props();

  let categoryForDisplay =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
</script>

<details>
  <summary>{categoryForDisplay}</summary>
  <div class="mb-4"></div>
  {#if expenses.length > 0}
    <h2>Expenses for category: {categoryForDisplay}</h2>
    <div class="mb-4"></div>
    <ul class="list-none grid grid-cols-2 gap-2">
      {#each expenses as expense (expense.id)}
        <ExpenseListItem {expense} month={montlyFinance} />
      {/each}
    </ul>
  {:else}
    <p>No expenses found for this category.</p>
  {/if}
</details>
