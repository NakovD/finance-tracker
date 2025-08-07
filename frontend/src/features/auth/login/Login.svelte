<script lang="ts">
  import Button from "../../common/button/Button.svelte";
  import Inputfield from "../../common/form/Inputfield.svelte";
</script>

<div class="h-screen grid place-items-center">
  <form class="bg-zinc-500 p-6 rounded-2xl shadow-xl w-full max-w-sm space-y-4">
    <h2 class="text-2xl font-bold text-center text-gray-300">Login</h2>

    <div>
      <label for="username" class="block text-sm font-medium text-gray-300"
        >Email</label
      >
      <Inputfield
        type="text"
        id="email"
        name="email"
        class="mt-1 block p-4 w-full rounded-xl border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required
      />
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-300"
        >Password</label
      >
      <Inputfield
        type="password"
        id="password"
        name="password"
        class="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required
      />
    </div>

    <Button type="submit">Вход</Button>
  </form>
</div>
