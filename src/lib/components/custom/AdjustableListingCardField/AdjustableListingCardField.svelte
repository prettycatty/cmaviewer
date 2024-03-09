<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";
  import { getShortString } from "$lib/utils";

  export let updateListingField: Function;
  export let value: string;
  export let adjAmount: string;
  export let index: number;
  export let iListing: number;
  export let field: any;
  export let isEditing: boolean;
  export let hideReportAdjustments: boolean;

  ////////////////////////////////////	Handlers
  const onInput = () => {
	// @ts-ignore
	if (!isNaN(adjAmount)) {
		updateListingField(iListing, field.name, { value: value, adjAmount: adjAmount });
	}
  };
</script>

<div class={(index % 2 == 1) ? "w-full px-[5px] lg:px-[15px] flex flex-row gap-[5px] justify-between items-center h-[30px]": "w-full bg-card px-[5px] lg:px-[15px] flex flex-row gap-[5px] justify-between items-center h-[30px]"}>
	{#if field.type == "none"}
		<b class="w-full text-end">{field.nice_name}</b>
	{:else}
		{#if isEditing}
			<Input class="bg-primary rounded-none flex-1 h-[25px] mr-[5px]" bind:value={value} on:input={onInput}/>
		{:else}
			{value == undefined || value == ''? "-": getShortString(value)}
		{/if}
		{#if hideReportAdjustments && value != undefined && value != ""}
			<Input class={parseFloat(adjAmount) >= 0? "text-green bg-primary rounded-none w-[45px] sm:w-[60px] h-[25px] px-[4px]": "text-red bg-primary rounded-none w-[45px] sm:w-[60px] h-[25px] px-[4px]"} bind:value={adjAmount} on:input={onInput}/>
		{:else}
			<Input class={parseFloat(adjAmount) >= 0? "text-green bg-primary rounded-none w-[45px] sm:w-[60px] h-[25px] px-[4px]": "text-red bg-primary rounded-none w-[45px] sm:w-[60px] h-[25px] px-[4px]"} bind:value={adjAmount} disabled/>
		{/if}
	{/if}
</div>