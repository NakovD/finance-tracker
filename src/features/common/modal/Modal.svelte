<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLDialogAttributes } from "svelte/elements";

  type ModalProps = {
    dialog: HTMLDialogElement;
    onClose?: HTMLDialogElement["onclose"];
    children: Snippet;
  };

  let { dialog = $bindable(), children, onClose }: ModalProps = $props();

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
  };
</script>

<dialog
  class="m-auto w-full max-w-md p-6 rounded-2xl backdrop:bg-gray-50/50"
  bind:this={dialog}
  onclick={onClick}
  onclose={onClose}
>
  <button
    class="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
    onclick={() => dialog?.close()}>X</button
  >
  {@render children()}
</dialog>
