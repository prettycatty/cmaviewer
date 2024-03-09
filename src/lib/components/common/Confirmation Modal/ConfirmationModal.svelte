<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import Separator from "$lib/components/ui/separator/separator.svelte";
	import { Label } from "$lib/components/ui/label";
	import { Button } from "$lib/components/ui/button";
	
    export let showModal: boolean;
	export let modalText: string;
	export let confirmHandler: Function;
</script>

<Dialog.Root bind:open={showModal}>
	<Dialog.Trigger />
	<Dialog.Portal>
	  <Dialog.Content class="sm:max-w-[350px] bg-primary text-primary-foreground">
		<Dialog.Header>
			<Dialog.Title class="text-[20px] font-bold text-center">Confirm</Dialog.Title>
		</Dialog.Header>
		<Separator />
		<div class="grid gap-4 py-1">
			<div class="flex flex-col items-start gap-4">
				<Label class="text-[15px] font-normal text-left">{modalText}</Label>
			</div>
			<div class="flex flex-row gap-[20px] justify-center">
				<Dialog.Close>
					<Button class="bg-card" on:click={() => confirmHandler()}>Confirm</Button>
				</Dialog.Close>
				<Dialog.Close>
					<Button class="bg-card">Cancel</Button>
				</Dialog.Close>
			</div>
		</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>