<script lang="ts">
	import Input from "$lib/components/ui/input/input.svelte";

	export let removeHandler: Function;
	export let updateControlMenuField: Function;
    export let Field: any;
	export let index: number;
	export let niceName: string;
</script>

<div class={(index % 2 == 1) ? "pl-[5px] lg:pl-[20px] flex flex-row gap-[5px] justify-start items-center h-[30px]": "bg-card pl-[5px] lg:pl-[20px] flex flex-row gap-[5px] justify-start items-center h-[30px]"}>
	<!-- svelte-ignore empty-block -->
	{#if Field.type == "removable"}
		<button on:click={() => removeHandler(Field.name)}>
			<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="red" fill-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06" clip-rule="evenodd"/></svg>
		</button>
		{#if Field.editableField} 
			<Input class="w-full bg-primary rounded-none h-[25px] mr-[10px]" bind:value={niceName} on:input={() => updateControlMenuField(Field.name, niceName)}/>
		{:else}
			{Field.nice_name}
		{/if}
	{:else if Field.type == "fixed"}
		<div class="w-[18px] h-[18px] flex flex-row justify-center">
			<div class="w-[15px] h-[15px] bg-card-foreground rounded-full"></div>
		</div>
		{Field.nice_name}
	{:else}
		&nbsp;
	{/if}
</div>