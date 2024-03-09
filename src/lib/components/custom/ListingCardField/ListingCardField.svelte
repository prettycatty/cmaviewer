<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";
  import * as Select from "$lib/components/ui/select";
  
  import { getShortString, convertNumberToUSDFormat } from "$lib/utils";

  export let updateListingField: Function;
  export let value: any;
  export let index: number;
  export let iListing: number;
  export let field: any;
  export let isEditing: boolean;

  ////////////////////////////////////	Handlers
  const onInput = () => {
	if (field.name == "list_price" || field.name == "sold_price") {
		if (!isNaN(value)) {
			value = value == "" && field.name == "list_price"? "0": value;
			updateListingField(iListing, field.name, value);
		}
	} else {
		updateListingField(iListing, field.name, value);
	}
  };

  // @ts-ignore
  const onSelectedChange = (selected) => {
	value = selected.value;
	updateListingField(iListing, field.name, value);
  };
</script>

<div class={(index % 2 == 1) ? "w-full px-[5px] lg:px-[15px] flex flex-row gap-[5px] justify-between items-center h-[30px]": "w-full bg-card px-[5px] lg:px-[15px] flex flex-row gap-[5px] justify-between items-center h-[30px]"}>
	{#if field.type == "none"}
		<b class="w-full text-end">{field.nice_name}</b>
	{:else}
		{#if field.name == "total_adj" || field.name == "adj_price"}
			{#if field.name == "adj_price"}
				{"$" + convertNumberToUSDFormat(value)}
			{:else}
				{#if parseFloat(value) >= 0}
					{convertNumberToUSDFormat(value)}
				{:else}
					<span class="text-red">{convertNumberToUSDFormat(value)}</span>
				{/if}
			{/if}
		{:else}
			{#if isEditing}
				{#if field.controlType != "dropdown"}
					<Input class="bg-primary rounded-none flex-1 h-[25px] mr-[10px]" bind:value={value} on:input={onInput}/>
				{:else}
					<Select.Root onSelectedChange={onSelectedChange}>
						<Select.Trigger class="bg-primary rounded-none flex-1 h-[25px] mr-[10px]">
							<Select.Value placeholder=""/>
						</Select.Trigger>
						<Select.Content class="border-none">
						<Select.Group>
							{#each field.values as item}
								<Select.Item value={item.value} label={item.label} class="bg-primary rounded-none h-[25px] text-primary-foreground">
									{item.label}
								</Select.Item>
							{/each}
						</Select.Group>
						</Select.Content>
						<Select.Input name="Status" />
					</Select.Root>
				{/if}
			{:else}
				{#if value == undefined} 
					-
				{:else} 
					{#if field.name == "list_price" || field.name == "sold_price"}
						{#if parseFloat(value) >= 0}
							{convertNumberToUSDFormat(value)}
						{:else}
							<span class="text-red">{convertNumberToUSDFormat(value)}</span>
						{/if}
					{:else}
						{#if field.name == "source_id"}
							<span class="text-blue">{getShortString(value)}</span>
						{:else}
							{getShortString(value)}
						{/if}
					{/if}
				{/if}
			{/if}
		{/if}
	{/if}
</div>