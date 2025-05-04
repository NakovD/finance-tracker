<script lang="ts">
  import { Link } from "svelte-routing";

  const { id }: { id: string } = $props();
</script>

<div class="my-8 mx-auto max-w-2xl">
  <h1 class="text-2xl text-center">2025</h1>
  <div class="mb-8"></div>
  <p class="">Months:</p>
  <div class="mb-6"></div>
  <div class="max-w-2xl mx-auto grid grid-cols-4 gap-4">
    <Link
      to="/montly-finance/147a2270-0c34-4c9e-bae7-7d16fcdebf13"
      class="shadow-md rounded-lg p-4 bg-amber-950 text-white hover:bg-amber-800 transition duration-300 ease-in-out"
    >
      <p class="text-xl font-semibold">January</p>
    </Link>
  </div>
</div>
