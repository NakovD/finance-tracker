<script lang="ts">
  import type { EventHandler } from "svelte/elements";
  import { createMutationFacade } from "../../../infrastructure/api/createMutation";
  import { endpoints } from "../../../infrastructure/api/endpoints/endpoints";
  import Button from "../../common/button/Button.svelte";
  import Inputfield from "../../common/form/Inputfield.svelte";
  import Label from "../../common/form/Label.svelte";
  import { toaster } from "../../common/toaster/toaster";

  import type {
    RegisterForm,
    RegisterFormErrors,
    RegisterFormTouchedFields,
  } from "./models/registerForm";
  import { registerFormValidator } from "./utilities/registerFormValidator";
  import { Eye, EyeClosed } from "@lucide/svelte";
  import { navigate } from "svelte-routing";
  import { routePaths } from "../../../infrastructure/routing/routePaths";

  let form = $state<{
    values: RegisterForm;
    errors: RegisterFormErrors;
    touchedFields: RegisterFormTouchedFields;
  }>({
    values: {
      firstName: "",
      lastName: "",
      termsAccepted: false,
      repeatPassword: "",
      email: "",
      password: "",
    },
    errors: {},
    touchedFields: {
      firstName: false,
      lastName: false,
      termsAccepted: false,
      repeatPassword: false,
      email: false,
      password: false,
    },
  });

  let visibility = $state({
    password: false,
    repeatPassword: false,
  });

  const mutation = createMutationFacade<{
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }>({
    endpoint: endpoints.auth.register,
  });

  const handleSubmit: EventHandler<SubmitEvent> = (e) => {
    e.preventDefault();

    $mutation.mutate(
      {
        email: form.values.email,
        name: `${form.values.firstName} ${form.values.lastName}`,
        password: form.values.password,
        password_confirmation: form.values.password,
      },
      {
        onSuccess: () => {
          toaster.showSuccess("Login successful!");
          navigate(routePaths.home);
        },
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

    <Label id="first-name" label="First Name">
      <Inputfield
        type="text"
        id="first-name"
        name="first-name"
        error={form.errors.firstName}
        oninput={(e) => (form.values.firstName = e.currentTarget.value)}
        onblur={() => {
          form.touchedFields.firstName = true;
          form.errors.firstName = registerFormValidator.validateFirstName(
            form.values.firstName
          );
        }}
      />
      {#if form.errors.firstName}
        <div class="mb-1"></div>
        <p class="text-red-500 text-sm">
          {form.errors.firstName}
        </p>
      {/if}
    </Label>
    <div class="mb-6"></div>
    <Label id="last-name" label="Last Name">
      <Inputfield
        type="text"
        id="last-name"
        name="last-name"
        error={form.errors.lastName}
        oninput={(e) => (form.values.lastName = e.currentTarget.value)}
        onblur={() => {
          form.touchedFields.lastName = true;
          form.errors.lastName = registerFormValidator.validateLastName(
            form.values.lastName
          );
        }}
      />
      {#if form.errors.lastName}
        <div class="mb-1"></div>
        <p class="text-red-500 text-sm">
          {form.errors.lastName}
        </p>
      {/if}
    </Label>
    <div class="mb-6"></div>
    <Label id="email" label="Email">
      <Inputfield
        type="text"
        id="email"
        name="email"
        error={form.errors.email}
        oninput={(e) => (form.values.email = e.currentTarget.value)}
        onblur={() => {
          form.touchedFields.email = true;
          form.errors.email = registerFormValidator.validateEmail(
            form.values.email
          );
        }}
      />
      {#if form.errors.email}
        <div class="mb-1"></div>
        <p class="text-red-500 text-sm">
          {form.errors.email}
        </p>
      {/if}
    </Label>
    <div class="mb-6"></div>

    <Label id="password" label="Password">
      <div class="relative">
        <Inputfield
          type={visibility.password ? "text" : "password"}
          id="password"
          name="password"
          error={form.errors.password}
          oninput={(e) => (form.values.password = e.currentTarget.value)}
          onblur={() => {
            form.touchedFields.password = true;
            form.errors.password = registerFormValidator.validatePassword(
              form.values.password
            );
          }}
        />
        <button
          type="button"
          class="cursor-pointer absolute right-3 top-3 text-gray-400"
          onclick={() => (visibility.password = !visibility.password)}
          >{#if visibility.password}
            <EyeClosed />
          {:else}
            <Eye />
          {/if}</button
        >
      </div>
      {#if form.errors.password}
        <div class="mb-1"></div>
        <p class="text-red-500 text-sm">
          {form.errors.password}
        </p>
      {/if}
    </Label>
    <div class="mb-6"></div>
    <Label id="repeat-password" label="Repeat Password">
      <div class="relative">
        <Inputfield
          type={visibility.repeatPassword ? "text" : "password"}
          id="repeat-password"
          name="repeat-password"
          error={form.errors.repeatPassword}
          oninput={(e) => (form.values.repeatPassword = e.currentTarget.value)}
          onblur={() => {
            form.touchedFields.password = true;
            form.errors.repeatPassword =
              registerFormValidator.validateRepeatPassword(
                form.values.password,
                form.values.repeatPassword
              );
          }}
        />
        <button
          type="button"
          class="cursor-pointer absolute right-3 top-3 text-gray-400"
          onclick={() =>
            (visibility.repeatPassword = !visibility.repeatPassword)}
          >{#if visibility.repeatPassword}
            <EyeClosed />
          {:else}
            <Eye />
          {/if}</button
        >
      </div>
      {#if form.errors.repeatPassword}
        <div class="mb-1"></div>
        <p class="text-red-500 text-sm">
          {form.errors.repeatPassword}
        </p>
      {/if}
    </Label>
    <div class="mb-8"></div>
    <Button type="submit">Login</Button>
  </form>
</div>
