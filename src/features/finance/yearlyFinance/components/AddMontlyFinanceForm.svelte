<script lang="ts">
  import Inputfield from "../../../common/form/Inputfield.svelte";
  import Label from "../../../common/form/Label.svelte";
  import { months } from "../constants/months";

  import type {
    MontlyFinanceForm,
    MontlyFinanceFormErrors,
    MontlyFinanceFormTouchedFields,
  } from "../models/montlyFinanceForm";

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

  const validateMonthName = () => {
    if (!form.values.monthName) {
      form.errors.monthName = "Month name is required.";
    } else {
      if (months.some((m) => m === form.values.monthName))
        form.errors.monthName = "";
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
      form.errors.income = "";
    }
  };
</script>

<form>
  <Label id="name" label="Name of expense">
    <Inputfield
      id="name"
      type="text"
      value={form.values.monthName}
      placeholder="Name of expense"
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
  <Label id="name" label="Income">
    <Inputfield
      id="name"
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
</form>
