<script lang="ts">
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import Inputfield from "../../../common/form/Inputfield.svelte";
  import Label from "../../../common/form/Label.svelte";

  import type {
    MonthlyFinanceForm,
    MonthlyFinanceFormErrors,
    MonthlyFinanceFormTouchedFields,
  } from "../models/monthlyFinanceForm";
  import Button from "../../../common/button/Button.svelte";
  import { expenseTrackerDB } from "../../../../infrastructure/db";
  import { handleDbAction } from "../../../../infrastructure/db/utilities/handleDbAction";
  import type { MonthlyFinance } from "../../monthlyFinance/models/monthlyFinance";
  import { toaster } from "../../../common/toaster/toaster";
  import { monthlyFinanceFormValidator } from "../utilities/monthlyFinanceFormValidator";
  import { endpoints } from "../../../../infrastructure/api/endpoints/endpoints";
  import { createMutationFacade } from "../../../../infrastructure/api/createMutation";

  let { year, onSuccess }: { year: number; onSuccess?: VoidFunction } =
    $props();

  let form = $state<{
    values: MonthlyFinanceForm;
    errors: MonthlyFinanceFormErrors;
    touchedFields: MonthlyFinanceFormTouchedFields;
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

  const qc = useQueryClient();

  const mutation = createMutationFacade<{ month: string; income: number }>({
    endpoint: endpoints.monthlyFinances.createMonthlyFinance,
    onSuccess: () => toaster.showSuccess("Monthly finance added successfully."),
    onError: () => toaster.showError("Failed to add monthly finance."),
  });

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    $mutation.mutate(
      {
        month: form.values.monthName,
        income: form.values.income,
      },
      { onSuccess: () => onSuccess?.() }
    );
  };
</script>

<form onsubmit={handleSubmit}>
  <h2>Add a Monthly finance</h2>
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
        form.errors.monthName = monthlyFinanceFormValidator.validateMonthName(
          form.values.monthName
        );
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
        form.errors.income = monthlyFinanceFormValidator.validateIncome(
          form.values.income
        );
      }}
    />
    {#if form.errors.income}
      <div class="mb-1"></div>
      <p class="text-red-500 text-sm">{form.errors.income}</p>
    {/if}
  </Label>
  <div class="mb-6"></div>
  <Button type="submit">Add Monthly Finance</Button>
</form>
