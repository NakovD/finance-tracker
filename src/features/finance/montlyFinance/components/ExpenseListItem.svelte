<script lang="ts">
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import type { Expense } from "../models/expense";
  import type { MontlyFinance } from "../models/montlyFinance";
  import ExpenseForm from "./ExpenseForm.svelte";
  import Button from "../../../common/button/Button.svelte";
  import Modal from "../../../common/modal/Modal.svelte";
  import Tooltip from "../../../common/tooltip/Tooltip.svelte";
  import { expenseTrackerDB } from "../../../../infrastructure/db";
  import { handleDbAction } from "../../../../infrastructure/db/utilities/handleDbAction";

  const { expense, month }: { expense: Expense; month: MontlyFinance } =
    $props();

  const qc = useQueryClient();

  let formDialog = $state<HTMLDialogElement>()!;
  let deleteDialog = $state<HTMLDialogElement>()!;
  let isOpen = $state(false);

  const handleCloseEditDialog = () => {
    isOpen = false;
    formDialog.close();
  };
  const handleOpenEditDialog = () => {
    isOpen = true;
    formDialog.showModal();
  };
  const handleOpenDeleteDialog = () => {
    deleteDialog.showModal();
  };
  const handleCloseDeleteDialog = () => {
    deleteDialog.close();
  };

  let mutation = createMutation<MontlyFinance, Error, void>({
    mutationFn: () =>
      handleDbAction(() =>
        expenseTrackerDB.editSingle({
          ...month,
          expenses: month.expenses.filter((e) => e.id !== expense.id),
        })
      ),
  });

  const handleDeleteExpense = () => {
    $mutation.mutate(undefined, {
      onSuccess: () => {
        handleCloseDeleteDialog();
        qc.invalidateQueries({
          queryKey: ["montly-finance", month.id],
        });
      },
    });
    handleCloseDeleteDialog();
  };
</script>

<li class="flex flex-col gap-4 bg-blue-400 rounded-2xl p-2.5">
  <div class="flex items-center w-full">
    <span>{expense.name}</span>
    <span class="ml-auto">{expense.amount}</span>
    <button class="ml-4 underline cursor-pointer" onclick={handleOpenEditDialog}
      >Edit</button
    >
    <button
      class="ml-4 underline cursor-pointer"
      onclick={handleOpenDeleteDialog}>Delete</button
    >
    <Modal bind:dialog={deleteDialog}>
      <h3 class="text-xl">Delete expense - {expense.name}</h3>
      <div class="mb-8"></div>
      Are you sure you want to delete this expense?
      <div class="mb-8"></div>
      <div class="flex justify-center gap-4">
        <Button onclick={handleDeleteExpense}>Yes, delete it.</Button>
        <Button onclick={handleCloseDeleteDialog}>No.</Button>
      </div>
    </Modal>
    <Modal bind:dialog={formDialog} onclose={handleCloseEditDialog}>
      {#key isOpen}
        <ExpenseForm {month} onSuccess={handleCloseEditDialog} {expense} />
      {/key}
    </Modal>
  </div>
  <div class="flex justify-between items-center">
    <p>Date: {new Date(expense.date).toLocaleDateString("bg-BG")}</p>
    {#if expense.description}
      <Tooltip title={expense.description}>Description here</Tooltip>
    {/if}
  </div>
</li>
