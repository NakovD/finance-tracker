<script lang="ts">
  import { Link } from "svelte-routing";
</script>

<div class="mx-auto my-8 max-w-2xl">
  <h1 class="text-2xl">Years</h1>
  <div class="mb-4"></div>
  <div class="max-w-2xl mx-auto grid grid-cols-4 gap-4">
    <Link
      to="/yearly-finance/2025"
      class="shadow-md rounded-lg p-4 bg-blue-500 text-white hover:bg-blue-800 transition duration-300 ease-in-out"
    >
      <p class="text-xl font-semibold">2025</p>
    </Link>
  </div>
</div>
