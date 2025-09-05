<script lang="ts">
  import type { EventHandler } from "svelte/elements";
  import { createMutationFacade } from "../../../infrastructure/api/createMutation";
  import { endpoints } from "../../../infrastructure/api/endpoints/endpoints";
  import Button from "../../common/button/Button.svelte";
  import Inputfield from "../../common/form/Inputfield.svelte";
  import Label from "../../common/form/Label.svelte";
  import type {
    LoginForm,
    LoginFormErrors,
    LoginFormTouchedFields,
  } from "./models/loginForm";
  import { loginFormValidator } from "./utilities/loginFormValidator";
  import { toaster } from "../../common/toaster/toaster";
  import { Eye, EyeClosed } from "@lucide/svelte";

  let form = $state<{
    values: LoginForm;
    errors: LoginFormErrors;
    touchedFields: LoginFormTouchedFields;
  }>({
    values: {
      email: "",
      password: "",
    },
    errors: {},
    touchedFields: {
      email: false,
      password: false,
    },
  });

  let isPasswordVisible = $state(false);

  const mutation = createMutationFacade<{ email: string; password: string }>({
    endpoint: endpoints.auth.login,
  });

  const handleSubmit: EventHandler<SubmitEvent> = (e) => {
    e.preventDefault();

    $mutation.mutate(
      { email: form.values.email, password: form.values.password },
      {
        onSuccess: () => toaster.showSuccess("Login successful!"),
        onError: async (error) =>
          toaster.showError(await error.response.json()),
      }
    );
  };
</script>

<div class="h-screen grid place-items-center">
  <form
    class="bg-zinc-500 p-6 rounded-2xl shadow-xl w-full max-w-sm space-y-4"
    onsubmit={handleSubmit}
  >
    <h2 class="text-2xl font-bold text-center text-gray-300">Login</h2>

    <div>
      <Label id="email" label="Email">
        <Inputfield
          type="text"
          id="email"
          name="email"
          error={form.errors.email}
          oninput={(e) => (form.values.email = e.currentTarget.value)}
          onblur={() => {
            form.touchedFields.email = true;
            form.errors.email = loginFormValidator.validateEmail(
              form.values.email
            );
          }}
        />
        {#if form.errors.email}
          <div class="mb-1"></div>
          <p class="text-red-500 text-sm">{form.errors.email}</p>
        {/if}
      </Label>
    </div>

    <div>
      <Label id="password" label="Password">
        <div class="relative">
          <Inputfield
            type="password"
            id="password"
            name="password"
            error={form.errors.password}
            oninput={(e) => (form.values.password = e.currentTarget.value)}
            onblur={() => {
              form.touchedFields.password = true;
              form.errors.password = loginFormValidator.validatePassword(
                form.values.password
              );
            }}
          />
          <button
            type="button"
            class="cursor-pointer absolute right-3 top-3 text-gray-400"
            onclick={() => (isPasswordVisible = !isPasswordVisible)}
          >
            {#if isPasswordVisible}
              <EyeClosed />
            {:else}
              <Eye />
            {/if}</button
          >
        </div>
        {#if form.errors.password}
          <div class="mb-1"></div>
          <p class="text-red-500 text-sm">{form.errors.password}</p>
        {/if}
      </Label>
    </div>

    <Button type="submit">Login</Button>
  </form>
</div>
