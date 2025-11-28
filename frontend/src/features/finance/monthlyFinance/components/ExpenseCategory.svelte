<script lang="ts">
  import { RotateCcw } from "@lucide/svelte";
  import { sum } from "../../../../infrastructure/utilities/reduceUtility";
  import Inputfield from "../../../common/form/Inputfield.svelte";
  import type { Expense } from "../models/expense";
  import type { MonthlyFinance } from "../models/monthlyFinance";
  import ExpenseListItem from "./ExpenseListItem.svelte";

  let {
    categoryName,
    expenses,
    monthlyFinance,
    initialSearchQuery = "",
  }: {
    categoryName: string;
    expenses: Expense[];
    monthlyFinance: MonthlyFinance;
    initialSearchQuery?: string;
  } = $props();

  let categoryForDisplay =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  let search = $state(initialSearchQuery);

  let filteredExpenses = $derived(
    expenses.filter(
      (expense) =>
        expense.name.toLowerCase().includes(search.toLowerCase()) ||
        expense.description?.toLowerCase().includes(search.toLowerCase())
    )
  );
</script>

<details>
  <summary>{categoryForDisplay}</summary>
  <div class="mb-4"></div>
  {#if expenses.length > 0}
    <h2>Expenses for category: {categoryForDisplay}</h2>
    <div class="mb-4"></div>
    <div class="flex items-center gap-4">
      <Inputfield
        type="text"
        value={search}
        class="max-w-xs"
        placeholder="Search for an expense"
        oninput={({ currentTarget }) => (search = currentTarget.value)}
      />
      <button onclick={() => (search = "")} class="max-w-4 cursor-pointer text-white hover:text-gray-700"
        ><RotateCcw /></button
      >
    </div>
    <div class="mb-4"></div>
    <ul class="list-none grid grid-cols-2 gap-2">
      {#each filteredExpenses as expense (expense.id)}
        <ExpenseListItem {expense} month={monthlyFinance} />
      {/each}
    </ul>
    <div class="mb-4"></div>
    <p>Total for category: <span>{sum(expenses, "amount")}</span></p>
  {:else}
    <p>No expenses found for this category.</p>
  {/if}
</details>
