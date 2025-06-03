<script lang="ts">
  import { OctagonX } from "@lucide/svelte";
  import type { Snippet } from "svelte";
  import type { HTMLDialogAttributes } from "svelte/elements";

  

  type ModalProps = {
    dialog: HTMLDialogElement;
    children: Snippet<[]>;
  } & Omit<HTMLDialogAttributes, "children">;

  let {
    dialog = $bindable(),
    children,
    onclick,
    ...rest
  }: ModalProps = $props();

  const onClick: HTMLDialogAttributes["onclick"] = (e) => {
    const modalDimensions = e.currentTarget.getBoundingClientRect();

    if (
      e.clientX < modalDimensions?.left ||
      e.clientX > modalDimensions?.right ||
      e.clientY < modalDimensions?.top ||
      e.clientY > modalDimensions?.bottom
    ) {
      dialog?.close();
    }
    onclick?.(e);
  };
</script>

<dialog
  class="m-auto w-full max-w-md p-6 rounded-2xl backdrop:bg-gray-50/50"
  bind:this={dialog}
  onclick={onClick}
  {...rest}
>
  <button
    class="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
    onclick={() => dialog?.close()}><OctagonX /></button
  >
  {@render children()}
</dialog>
