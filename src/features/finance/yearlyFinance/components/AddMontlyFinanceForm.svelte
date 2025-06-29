<script lang="ts">
  import { createMutation } from "@tanstack/svelte-query";
  import Inputfield from "../../../common/form/Inputfield.svelte";
  import Label from "../../../common/form/Label.svelte";
  import { months } from "../constants/months";

  import type {
    MontlyFinanceForm,
    MontlyFinanceFormErrors,
    MontlyFinanceFormTouchedFields,
  } from "../models/montlyFinanceForm";
  import type { MontlyFinance } from "../../montlyFinance/models/montlyFinance";
  import Button from "../../../common/button/Button.svelte";
  import { expenseTrackerDB } from "../../../../infrastructure/db";
  import { handleDbAction } from "../../../../infrastructure/db/utilities/handleDbAction";

  let { year, onSuccess }: { year: number; onSuccess?: VoidFunction } =
    $props();

  let form = $state<{
    values: MontlyFinanceForm;
    errors: MontlyFinanceFormErrors;
    touchedFields: MontlyFinanceFormTouchedFields;
  }>({
    values: {
      monthName: "",
      income: 0,
    },
    errors: {},
    touchedFields: {
      income: false,
      monthName: false,
    },
  });

  const mutation = createMutation<MontlyFinance, Error, MontlyFinance>({
    mutationFn: (monthlyFinance) =>
      handleDbAction(() => expenseTrackerDB.addSingle(monthlyFinance)),
  });

  const handleSubmit = () =>
    $mutation.mutate(
      {
        id: crypto.randomUUID(),
        name: form.values.monthName,
        income: form.values.income,
        expenses: [],
        year,
      },
      { onSuccess: () => onSuccess?.() }
    );

  const validateMonthName = () => {
    if (!form.values.monthName) {
      form.errors.monthName = "Month name is required.";
    } else {
      if (months.some((m) => m === form.values.monthName))
        form.errors.monthName = undefined;
      else {
        form.errors.monthName = "Invalid month name.";
      }
    }
  };

  const validateIncome = () => {
    const value = form.values.income;
    if (value === undefined || value === null || isNaN(value)) {
      form.errors.income = "Income is required.";
    } else if (typeof value !== "number" || value <= 0) {
      form.errors.income = "Income must be a positive number.";
    } else {
      form.errors.income = undefined;
    }
  };

  $inspect(form);
</script>

<form>
  <h2>Add a Montly finance</h2>
  <div class="mb-8"></div>
  <Label id="monthName" label="Month Name">
    <Inputfield
      id="monthName"
      type="text"
      value={form.values.monthName}
      placeholder="Month Name"
      error={form.errors.monthName}
      oninput={(e) => (form.values.monthName = e.currentTarget.value)}
      onblur={() => {
        form.touchedFields.monthName = true;
        validateMonthName();
      }}
    />
    {#if form.errors.monthName}
      <div class="mb-1"></div>
      <p class="text-red-500 text-sm">{form.errors.monthName}</p>
    {/if}
  </Label>
  <div class="mb-4"></div>
  <Label id="income" label="Income">
    <Inputfield
      id="income"
      type="number"
      value={form.values.income}
      placeholder="Income"
      error={form.errors.income}
      oninput={(e) => (form.values.income = e.currentTarget.valueAsNumber)}
      onblur={() => {
        form.touchedFields.income = true;
        validateIncome();
      }}
    />
    {#if form.errors.income}
      <div class="mb-1"></div>
      <p class="text-red-500 text-sm">{form.errors.income}</p>
    {/if}
  </Label>
  <div class="mb-6"></div>
  <Button onclick={handleSubmit}>Add Montly Finance</Button>
</form>
