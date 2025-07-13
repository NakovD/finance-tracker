<script lang="ts">
  import type { MonthlyFinance } from "../models/monthlyFinance";
  import { useQueryClient, createMutation } from "@tanstack/svelte-query";
  import type { Expense } from "../models/expense";
  import { formatDateForDateInput } from "../utils/formatDateForDateInput";
  import { handleExpenseUpdateAdd } from "../utils/handleExpenseUpdateAdd";
  import { expenseTrackerDB } from "../../../../infrastructure/db";
  import { handleDbAction } from "../../../../infrastructure/db/utilities/handleDbAction";
  import Inputfield from "../../../common/form/Inputfield.svelte";
  import Label from "../../../common/form/Label.svelte";
  import Textarea from "../../../common/form/Textarea.svelte";
  import type { ExpenseCategory } from "../models/expenseCategory";
  import { toaster } from "../../../common/toaster/toaster";

  const today = new Date();

  const {
    month,
    expense,
    onSuccess,
    onError,
  }: {
    month: MonthlyFinance;
    expense?: Expense;
    onSuccess?: VoidFunction;
    onError?: VoidFunction;
  } = $props();

  const qc = useQueryClient();

  let nameField = $state(expense?.name ?? "");
  let amountField = $state(expense?.amount.toString() ?? "");
  let dateField = $state(
    formatDateForDateInput(expense?.date ? new Date(expense.date) : today)
  );
  let descriptionField = $state(expense?.description ?? "");

  let categoryField = $state<ExpenseCategory | undefined>(
    expense?.category ?? undefined
  );

  let touchedFields = $state<{
    name: boolean;
    amount: boolean;
    date: boolean;
    description: boolean;
    category: boolean;
  }>({
    name: false,
    amount: false,
    date: expense ? false : true,
    description: expense ? false : true,
    category: false,
  });

  let errors = $state<{
    name?: string;
    amount?: string;
    date?: string;
    description?: string;
    category?: string;
  }>({});

  let mutation = createMutation<MonthlyFinance, Error, Expense>({
    mutationFn: (expense: Expense) =>
      handleDbAction(() =>
        expenseTrackerDB.editSingle({
          ...month,
          expenses: handleExpenseUpdateAdd(expense, month.expenses),
        })
      ),
      onSuccess: () => toaster.showSuccess("Expense saved successfully!"),
      onError: () => toaster.showError("Failed to save expense"),
  });

  const validateName = () => {
    if (nameField.length < 3) {
      errors.name = "Name must be at least 3 characters long";
    } else {
      errors.name = undefined;
    }
  };

  const validateAmount = () => {
    const value = Number(amountField);

    if (isNaN(value) || value <= 0) {
      errors.amount = "Please enter a valid amount";
    } else {
      errors.amount = undefined;
    }
  };

  const validateDate = () => {
    if (!dateField) {
      errors.date = "Please select a date";
    } else {
      errors.date = undefined;
    }
  };

  const validateDescription = () => {
    if (descriptionField.length > 0 && descriptionField.length < 10) {
      errors.description = "Description must be at least 10 characters long";
      return;
    }
    errors.description = undefined;
  };

  const validateCategory = () => {
    if (!categoryField) {
      errors.category = "Please select a category";
    } else {
      errors.category = undefined;
    }
  };

  const resetForm = () => {
    nameField = "";
    amountField = "";
    dateField = "";
    touchedFields.name = false;
    touchedFields.amount = false;
    touchedFields.date = false;
    errors.name = undefined;
    errors.amount = undefined;
    errors.date = undefined;
  };

  const handleSubmit = () => {
    $mutation.mutate(
      {
        amount: Number(amountField),
        date: dateField,
        id: expense ? expense.id : crypto.randomUUID(),
        name: nameField,
        description: descriptionField.length > 0 ? descriptionField : undefined,
        category: categoryField!,
      },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: ["montly-finance", month.id] });
          resetForm();
          onSuccess?.();
        },
        onError: () => onError?.(),
      }
    );
  };

  let canSubmit = $derived(
    (() => {
      if (expense)
        return (
          touchedFields.name ||
          touchedFields.amount ||
          touchedFields.date ||
          touchedFields.description ||
          touchedFields.category
        );

      return (
        touchedFields.name &&
        touchedFields.amount &&
        touchedFields.date &&
        touchedFields.category
      );
    })() &&
      errors.name === undefined &&
      errors.amount === undefined &&
      errors.date === undefined &&
      errors.category === undefined
  );
</script>

<form>
  <h2 class="font-bold">Add an expense</h2>
  <div class="mb-5"></div>
  <Label id="name" label="Name of expense">
    <Inputfield
      id="name"
      type="text"
      value={nameField}
      placeholder="Name of expense"
      error={errors.name}
      oninput={(e) => (nameField = e.currentTarget.value)}
      onblur={() => {
        touchedFields.name = true;
        validateName();
      }}
    />
    {#if errors.name}
      <div class="mb-1"></div>
      <p class="text-red-500 text-sm">{errors.name}</p>
    {/if}
  </Label>
  <div class="mb-5"></div>
  <Label id="amount" label="Amount">
    <Inputfield
      id="amount"
      type="number"
      value={amountField}
      placeholder="Amount"
      error={errors.amount}
      oninput={(e) => (amountField = e.currentTarget.value)}
      onblur={() => {
        touchedFields.amount = true;
        validateAmount();
      }}
    />
    {#if errors.amount}
      <div class="mb-1"></div>
      <p class="text-red-500 text-sm">{errors.amount}</p>
    {/if}
  </Label>
  <div class="mb-5"></div>
  <Label id="calendar" label="Date">
    <Inputfield
      id="calendar"
      type="date"
      value={dateField}
      placeholder="Date"
      error={errors.date}
      oninput={(e) => (dateField = e.currentTarget.value)}
      onblur={() => {
        touchedFields.date = true;
        validateDate();
      }}
    />
    {#if errors.amount}
      <div class="mb-1"></div>
      <p class="text-red-500 text-sm">{errors.date}</p>
    {/if}
  </Label>
  <div class="mb-5"></div>
  <Label id="description" label="Description">
    <Textarea
      id="description"
      value={descriptionField}
      placeholder="Description"
      error={errors.description}
      oninput={(e) => (descriptionField = e.currentTarget.value)}
      onblur={() => {
        touchedFields.description = true;
        validateDescription();
      }}
    />
    {#if errors.description}
      <div class="mb-1"></div>
      <p class="text-red-500 text-sm">{errors.description}</p>
    {/if}
  </Label>
  <div class="mb-5"></div>
  <Label id="category" label="Category">
    <select
      class="py-2.5 px-4 border-amber-200 border-1 text-neutral-400"
      bind:value={categoryField}
      onblur={() => {
        touchedFields.category = true;
        validateCategory();
      }}
      onchange={() => {
        touchedFields.category = true;
        validateCategory();
      }}
    >
      <option class="text-neutral-400 bg-black" value="" disabled selected>
        Select a category
      </option>
      <option class="text-neutral-400 bg-black" value="groceries">
        Groceries
      </option>
      <option class="text-neutral-400 bg-black" value="transportation">
        Transportation
      </option>
      <option class="text-neutral-400 bg-black" value="entertainment">
        Entertainment
      </option>
      <option class="text-neutral-400 bg-black" value="utilities">
        Utilities
      </option>
      <option class="text-neutral-400 bg-black" value="healthcare">
        Healthcare
      </option>
      <option class="text-neutral-400 bg-black" value="parentcare">
        Parentcare
      </option>
      <option class="text-neutral-400 bg-black" value="other">Other</option>
    </select>
    {#if errors.category}
      <div class="mb-1"></div>
      <p class="text-red-500 text-sm">{errors.category}</p>
    {/if}
  </Label>
  <div class="mb-5"></div>
  <button
    disabled={!canSubmit}
    type="button"
    class="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2 px-4 rounded"
    onclick={handleSubmit}
    >{expense ? "Edit expense" : "Add new expense"}</button
  >
</form>
