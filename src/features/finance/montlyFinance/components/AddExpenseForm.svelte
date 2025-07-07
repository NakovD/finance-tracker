<script lang="ts">
  import Button from "../../../common/button/Button.svelte";
  import Modal from "../../../common/modal/Modal.svelte";
  import type { MonthlyFinance } from "../models/monthlyFinance";
  import ExpenseForm from "./ExpenseForm.svelte";

  const { month }: { month: MonthlyFinance } = $props();
  let dialog = $state<HTMLDialogElement>()!;
  let isOpen = $state(false);

  const handleClose = () => {
    isOpen = false;
    dialog.close();
  };
  const handleOpen = () => {
    isOpen = true;
    dialog.showModal();
  };
</script>

<Button onclick={handleOpen}>Add Expense</Button>
<Modal bind:dialog onclose={handleClose}>
  {#key isOpen}
    <ExpenseForm {month} onSuccess={handleClose} />
  {/key}
</Modal>
