<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { Link } from "svelte-routing";
  import { expenseTrackerDB } from "../../../infrastructure/db";
  import { handleDbAction } from "../../../infrastructure/db/utilities/handleDbAction";
  import type { MonthlyFinance } from "../monthlyFinance/models/monthlyFinance";
  import AddMontlyFinanceForm from "./components/AddMontlyFinanceForm.svelte";
  import Modal from "../../common/modal/Modal.svelte";
  import { CirclePlus } from "@lucide/svelte";

  const { id }: { id: string } = $props();

  let formModal = $state<HTMLDialogElement>()!;

  let isOpen = $state(false);

  const query = createQuery<MonthlyFinance[]>({
    queryKey: ["all-finances", id],
    queryFn: () =>
      handleDbAction(() =>
        expenseTrackerDB.getAllForYear<MonthlyFinance[]>(+id)
      ),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const openModal = () => {
    isOpen = true;
    formModal.showModal();
  };

  const closeModal = () => {
    isOpen = false;
    formModal.close();
  };
</script>

<div class="my-8 mx-auto max-w-2xl">
  <h1 class="text-2xl text-center">{id}</h1>
  <div class="mb-8"></div>
  <div class="flex items-center justify-between mb-4">
    <p class="text-2xl">Months:</p>
    <button class="cursor-pointer hover:text-red-900" onclick={openModal}
      ><CirclePlus /></button
    >
    <Modal bind:dialog={formModal} onclose={closeModal}>
      {#key isOpen}
        <AddMontlyFinanceForm onSuccess={closeModal} year={+id} />
      {/key}
    </Modal>
  </div>
  <div class="mb-6"></div>
  <div class="max-w-2xl mx-auto grid grid-cols-4 gap-4">
    {#if $query.isLoading}
      <p>Loading...</p>
    {:else if $query.isError}
      <p class="text-red-500">Failed to load data.</p>
    {:else if $query.isSuccess}
      {#if $query.data.length > 0}
        {#each $query.data as montlyExpense}
          <Link
            to={`/montly-finance/${montlyExpense.id}`}
            class="shadow-md rounded-lg p-4 bg-amber-950 text-white hover:bg-amber-800 transition duration-300 ease-in-out"
          >
            <p class="text-xl font-semibold">{montlyExpense.name}</p>
          </Link>
        {/each}
      {:else}
        <p class="text-gray-500">No data available for this year.</p>
      {/if}
    {/if}
  </div>
</div>
