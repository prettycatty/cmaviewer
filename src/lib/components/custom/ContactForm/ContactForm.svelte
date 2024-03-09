<script lang="ts">
    import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Button } from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
	import Separator from "$lib/components/ui/separator/separator.svelte";

	import { validateEmail } from "$lib/utils";

	export let setClientInfo: Function;

	let firstName = "";
	let lastName = "";
	let email = "";

	$: isValidated = (firstName != "" && lastName != "" && validateEmail(email));

	const saveClientInfo = () => setClientInfo(firstName, lastName, email);
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Button class="bg-card">Assign</Button>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[450px] bg-primary text-primary-foreground">
		<Dialog.Header>
			<Dialog.Title class="text-[20px] font-bold text-center">CONTACTS</Dialog.Title>
		</Dialog.Header>
		<Separator />
		<div class="grid gap-4 py-4">
			<div class="flex flex-col items-start gap-4">
				<Label class="text-[20px] font-normal text-right">Lookup Contact</Label>
				<Label class="font-normal text-right">Start typing a FIRST or LAST Name</Label>
				<Input type="text" class="bg-primary" />
			</div>
			<div class="flex justify-center">
				<Dialog.Close>
					<Button class="bg-card">Assign Contact</Button>
				</Dialog.Close>
			</div>
			<Separator />
			<div class="flex flex-col items-start gap-4">
				<Label class="text-[20px] font-normal text-right">Add New Contact</Label>
				<div class="w-full flex flex-row justify-between gap-[20px]">
					<Input type="text" class="bg-primary" bind:value={firstName} placeholder="First Name"/>
					<Input type="text" class="bg-primary" bind:value={lastName} placeholder="Last Name"/>
				</div>
				<Input type="email" class="bg-primary" bind:value={email} placeholder="Email"/>
			</div>
			<div class="flex justify-center">
				{#if isValidated}
					<Dialog.Close>
						<Button class="bg-card" on:click={saveClientInfo}>Save As New Contact</Button>
					</Dialog.Close>
				{:else}
					<Button class="bg-card">Save As New Contact</Button>
				{/if}
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>