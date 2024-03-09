<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";
  import { convertNumberToUSDFormat } from "$lib/utils";

  export let updateSubjectField: Function;
  export let value: string;
  export let index: number;
  export let field: any;
  export let isEditing: boolean;
</script>

<div class={(index % 2 == 1) ? "px-[5px] lg:px-[15px] flex flex-row gap-[5px] justify-start items-center h-[30px]": "bg-card px-[5px] lg:px-[15px] flex flex-row gap-[5px] justify-start items-center h-[30px]"}>
	{#if field.name == "adj_price"}
		{"$" + convertNumberToUSDFormat(value)}
	{:else}
		{#if field.editableInSubject}
			{#if isEditing}
				<Input class="bg-primary rounded-none h-[25px] mr-[10px]" bind:value={value} on:input={() => updateSubjectField(field.name, value)}/>
			{:else}
				{#if field.type == "none"}
					<b class="w-full text-end">{field.nice_name}</b>
				{:else}
					{value == undefined? "-": value}
				{/if}
			{/if}
		{:else}
			{#if field.type == "none"}
				&nbsp;
			{:else}
				- - - - - -
			{/if}
		{/if}
	{/if}
</div>