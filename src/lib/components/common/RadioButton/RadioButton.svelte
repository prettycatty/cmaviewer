<script lang="ts">
    export let isChecked: any;
	export let toggle: VoidFunction;
</script>

<button on:click={toggle} class={isChecked? "bg-blue cursor-pointer flex flex-row items-center justify-between rounded-r-full rounded-l-full border-solid border-[2px] px-[6px] py-[4px] w-[80px]": "cursor-pointer flex flex-row items-center justify-between rounded-r-full rounded-l-full border-solid border-[2px] px-[6px] py-[4px] w-[80px]"}>
	{#if !isChecked}
		<div class="px-[4px] leading-[20px]">NO</div>
	{/if}
	<div class={isChecked? "rounded-full w-[20px] h-[20px] bg-white border-solid border-[2px]" : "rounded-full w-[20px] h-[20px] bg-card border-solid border-[2px]"}></div>
	{#if isChecked}
		<div class="px-[4px] leading-[20px] text-white">YES</div>
	{/if}
</button>