<script lang="ts">
  import { Link } from "svelte-routing";
  import AddMonthlyFinanceForm from "./components/AddMonthlyFinanceForm.svelte";
  import Modal from "../../common/modal/Modal.svelte";
  import { CirclePlus } from "@lucide/svelte";
  import Loader from "../../common/loader/Loader.svelte";
  import { createQueryFacade } from "../../../infrastructure/api/createQueryFacade";
  import { endpoints } from "../../../infrastructure/api/endpoints/endpoints";
  import { array, number, object, string } from "zod";

  const { id }: { id: string } = $props();

  let formModal = $state<HTMLDialogElement>()!;

  let isOpen = $state(false);

  const query = createQueryFacade({
    queryKey: ["all-finances", id],
    endpoint: endpoints.monthlyFinances.getMonthlyFinancesByYear(+id),
    validator: array(
      object({
        id: number(),
        name: string(),
      }),
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
        <AddMonthlyFinanceForm onSuccess={closeModal} year={+id} />
      {/key}
    </Modal>
  </div>
  <div class="mb-6"></div>
  {#if $query.isLoading}
    <Loader class="min-h-80" />
  {:else if $query.isError}
    <p class="text-red-500">Failed to load data.</p>
  {:else if $query.isSuccess}
    {#if $query.data.length > 0}
      <div class="max-w-2xl mx-auto grid grid-cols-4 gap-4">
        {#each $query.data as monthlyExpense}
          <Link
            to={`/monthly-finance/${monthlyExpense.id}`}
            class="shadow-md rounded-lg p-4 bg-amber-950 text-white hover:bg-amber-800 transition duration-300 ease-in-out"
          >
            <p class="text-xl font-semibold">{monthlyExpense.name}</p>
          </Link>
        {/each}
      </div>
    {:else}
      <p class="text-gray-500">No data available for this year.</p>
    {/if}
  {/if}
</div>
