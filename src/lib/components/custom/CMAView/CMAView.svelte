<script lang="ts">
	import ControlMenuField from '$lib/components/custom/ControlMenuField/ControlMenuField.svelte';
    import ListingCardField from '$lib/components/custom/ListingCardField/ListingCardField.svelte';

    export let CMA: any;

	let controlMenuRef: any;

	const handlerFieldRemove = (name: string) => {
		console.log("handlerFieldRemove", name);

		const fields = [];
		for (let i = 0; i < CMA.fields.length; i++) {
			if (CMA.fields[i].name !== name) {
				fields.push(CMA.fields[i]);
			}
		}

        CMA = {
			index: CMA.index,
			detail: CMA.detail,
			fields: fields
		};
    };

	const removeListingHandler = (index: number) => {
		console.log("removeListingHandler", index);

		const listings = [];

		for (let i = 0; i < CMA.detail.listings.length; i++) {
			if (i != index) {
				listings.push(CMA.detail.listings[i]);
			}
		}

		CMA = {
			index: CMA.index,
			detail: {
				cma_id: CMA.detail.cma_id,
				created: CMA.detail.created,
				modified: CMA.detail.modified,
				title: CMA.detail.title,
				listings: listings
			},
			fields: CMA.fields
		};

		if (listings.length == 0) {
			console.log(controlMenuRef);
			controlMenuRef.classList.remove("absolute");
		}
	}
	
    const getListingValueByKey = (listing: any, key: string) => {
        return listing[key];
    };

	const updateListingField = () => {

	};
</script>

<div class="w-full flex flex-col items-start gap-[20px] overflow-hidden">
	<h1 class="text-[30px] font-bold">{CMA.detail.title}</h1>
	<ul class="overflow-x-scroll cma w-full flex flex-row gap-[20px] border-solid border-[2px]">
		<div class="bg-primary absolute z-10 p-[5px]" bind:this={controlMenuRef}>
			<li class="cma-control-menu flex flex-col justify-between w-[180px] lg:w-[250px] rounded-lg border-solid border-[2px] py-[10px] lg:mr-5">
				<div class="cma-control-menu-header flex flex-col h-[300px] px-[5px] lg:px-[20px]">
					<h2 class="text-[20px] font-bold">Information</h2>
					<p>Choose the fields you wish to compare</p>
				</div>
				<div class="cma-control-menu-fields flex flex-col gap-[5px]">
					{#each CMA.fields as Field, iField}
						<ControlMenuField 
							index={iField} 
							Field={Field} 
							removeHandler={handlerFieldRemove} 
							niceName={Field.nice_name}
							updateControlMenuField={() => {}}
						/>
					{/each}
				</div>
			</li>
		</div>
		<div class="flex flex-1 gap-1 lg:gap-5 ml-[185px] lg:ml-[280px] p-[5px]">
			{#each CMA.detail.listings as listing, iListing}
				<li class="listing-card flex flex-col w-[180px] lg:min-w-[250px] rounded-lg border-solid border-[2px] py-[10px]">
					<div class="listing-card-header flex flex-col h-[300px] px-[5px] lg:px-[15px]">
						<div class="w-full flex flex-row items-center justify-between">
							<h2 class="text-[20px] font-bold">Sold</h2>
							<button on:click={() => removeListingHandler(iListing)}>
								<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06" clip-rule="evenodd"/></svg>
							</button>
						</div>
						<p>{listing.address}</p>
						<p>{`${listing.city} (${listing.county}), ${listing.state}`}</p>
						<div class="bg-cover w-full h-[200px]" style="background: url({listing.photo_url}); background-size: cover;"></div>
					</div>
					<div class="cma-control-menu-fields flex flex-col gap-[5px]">
						{#each CMA.fields as Field, index}
							<ListingCardField 
								index={index} 
								iListing={iListing} 
								updateListingField={updateListingField} 
								field={Field} 
								isEditing={false} 
								value={getListingValueByKey(listing, Field.name)} 
							/>
						{/each}
					</div>
				</li>
			{/each}
		</div>
	</ul>
</div>