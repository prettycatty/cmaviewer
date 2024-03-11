<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

    import ListingCardField from '$lib/components/custom/ListingCardField/ListingCardField.svelte';
    import AdjustableListingCardField from '$lib/components/custom/AdjustableListingCardField/AdjustableListingCardField.svelte';

    ////////////////////////////////////////////////  State
    export let removeListingHandler: Function;
    export let makeSubject: Function;
    export let updateListingField: Function;
    export let startDrag: Function;
    export let dragDisabled: boolean;
    export let iListing: number;
    export let listing: any;
    export let fields: any;
    export let hideReportAdjustments: boolean;

    let isEditing = false;

    ////////////////////////////////////////////////  Handlers
    const getListingValueByKey = (listing: any, key: string) => {
        return listing[key];
    };

    const getListingAdjustValueByKey = (listing: any, key: string) => {
      try {
        return listing[key].value == undefined? listing[key]: listing[key].value;
      } catch(error) {
        return "";
      }
    };

    const getListingAdjustAmountByKey = (listing: any, key: string) => {
      try {
        return listing[key].adjAmount == undefined? "0": listing[key].adjAmount;
      } catch(error) {
        return "0";
      }
    };

    const viewListing = () => {
        isEditing = false;
    };

    const editListing = () => {
        isEditing = true;
    };
</script>

<!-- listing-card -->
<li data-key={iListing} class="bg-primary flex flex-col w-[180px] lg:min-w-[250px] border-solid border-card-foreground rounded-lg border-[1px] py-[10px]">
    <!-- listing-card-header -->
    <div class="flex flex-col h-[300px] gap-[15px] px-[5px] lg:px-[15px]">
        <div class="w-full flex flex-row items-center justify-between">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild let:builder>
                  <Button class="bg-cyan-foreground border-none text-white rounded-[6px] font-bold hover:bg-cyan-foreground" builders={[builder]}>
                    Actions
                    <svg class="ml-[5px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12.37 15.835l6.43-6.63C19.201 8.79 18.958 8 18.43 8H5.57c-.528 0-.771.79-.37 1.205l6.43 6.63c.213.22.527.22.74 0"/></svg>
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content class="w-36 bg-card bg-cyan-foreground text-white">
                  <DropdownMenu.Item on:click={() => makeSubject(listing, iListing)}>
                    Make Subject
                  </DropdownMenu.Item>
                  <DropdownMenu.Item on:click={() => removeListingHandler(iListing)}>
                    Remove Comp
                  </DropdownMenu.Item>
                  <DropdownMenu.Item on:click={editListing}>
                    Edit Comp Fields
                  </DropdownMenu.Item>
                  <DropdownMenu.Item on:click={viewListing}>
                    View Listing
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div 
              style={dragDisabled ? 'cursor: grab' : 'cursor: grabbing'}
              on:mousedown={() => startDrag()} 
              on:touchstart={() => startDrag()}
            >
              <svg class="fill-black opacity-70" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path d="M18 11V8l4 4l-4 4v-3h-5v5h3l-4 4l-4-4h3v-5H6v3l-4-4l4-4v3h5V6H8l4-4l4 4h-3v5z"/></svg>
            </div>
        </div>
        <div class="bg-cover w-full h-[130px] lg:h-[150px]" style={`background: url(${listing.photo_url? listing.photo_url: "assets/images/empty.png"}); background-size: cover;`}></div>
        <div class="flex flex-col items-start justify-start gap-[15px]">
            {#if isEditing}
                <div class="text-cyan cursor-pointer w-fit p-0 underline underline-offset-4 font-bold">Change Photo</div>
            {/if}
            <p class="font-bold">{`#${iListing + 1}`}</p>
        </div>
    </div>

    <!-- cma-control-menu-fields -->
    <div class="flex flex-col gap-[5px]">
        {#each fields as Field, index}
          {#if Field.isAdjustable}
            <AdjustableListingCardField 
              index={index} 
              iListing={iListing} 
              updateListingField={updateListingField} 
              isEditing={isEditing} 
              field={Field} 
              hideReportAdjustments={hideReportAdjustments} 
              value={getListingAdjustValueByKey(listing, Field.name)} 
              adjAmount={getListingAdjustAmountByKey(listing, Field.name)} 
            />
          {:else}
            <ListingCardField 
              index={index} 
              iListing={iListing} 
              updateListingField={updateListingField} 
              isEditing={isEditing} 
              field={Field} 
              value={getListingValueByKey(listing, Field.name)} 
            />
          {/if}
        {/each}
    </div>
</li>