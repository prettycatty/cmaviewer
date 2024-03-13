<script lang="ts">
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Button } from "$lib/components/ui/button";
	import { Textarea } from "$lib/components/ui/textarea";
	import { dndzone, SOURCES, TRIGGERS, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';

	import ConfirmationModal from "$lib/components/common/Confirmation Modal/ConfirmationModal.svelte";
	import ListingCardEdit from '$lib/components/custom/ListingCardEdit/ListingCardEdit.svelte';
	import ControlMenuField from '$lib/components/custom/ControlMenuField/ControlMenuField.svelte';
	import RadioButton from '$lib/components/common/RadioButton/RadioButton.svelte';
	import ContactForm from "../ContactForm/ContactForm.svelte";
	import ChangeContactInfoForm from "../ChangeContactForm/ChangeContactInfoForm.svelte";
	import SubjectEdit from "$lib/components/custom/SubjectEdit/SubjectEdit.svelte";
  	import { getDOMValue } from "$lib/utils";
	import { flip } from 'svelte/animate';
  
  	let flipDurationMs = 300;
	/////////////////////////////////////////////////// State
	// Represent Current Grid Info
    export let CMA: any;
	// Represent Origin Grid Info without any change
	export let originFields: any;

	// Subject Property Content
	let Subject_Data: any = {
		list_price: "0",
		total_adj: "0",
		adj_price: "0"
	};

	// Additional Fields
	let subjectPropertyRemarks: string = "";
	let propertyLocations: string = "";
	let comparableRemarks: string = "";
	let propertyMarketValue: string = "";
	let suggestedListPrice: string = "";
	let reconciliationRemarks: string = "";

	// Client Info
	let Client_FirstName: string | null = null;
	let Client_LastName: string | null = null;
	$: Client_Name = (Client_FirstName !=null && Client_LastName !=null)? `${Client_FirstName} ${Client_LastName}`: null;
	let Client_Email: string = "";

	let hideReportAdjustments = false;

	// Confirmation Modal State
	let showModal = false;
	let modalText = "";
	let confirmHandler: Function;

	// Control Menu Instance
	let controlMenuRef: any;

	let dragDisabled: boolean = true;
	///////////////////////////////////////////////////	Handlers
	// TODO
	const saveAll = () => {
		// Call Backend APIs using following data
		// CMA
		
		// Subject_Data
		
		// Client_FirstName, Client_LastName, Client_Email
		
		// subjectPropertyRemarks
		// propertyLocations
		// comparableRemarks
		// propertyMarketValue
		// suggestedListPrice
		// reconciliationRemarks
	};

	// TODO
	const viewCMAReport = () => {

	}
	
	// Handler to Drag and Drop. Essential!
	const handleConsider = (e: any) => {
		CMA = {
			index: CMA.index,
			detail: {
				cma_id: CMA.detail.cma_id,
				created: CMA.detail.created,
				modified: CMA.detail.modified,
				title: CMA.detail.title,
				listings: e.detail.items
			},
			fields: CMA.fields
		};
		
		if (e.detail.info.source === SOURCES.KEYBOARD && e.detail.info.trigger === TRIGGERS.DRAG_STOPPED) {
			dragDisabled = true;
		}
	};

	// Define activity when we end Drag and Drop Listing. Essential!
	const handleFinalize = (e: any) => {
		CMA = {
			index: CMA.index,
			detail: {
				cma_id: CMA.detail.cma_id,
				created: CMA.detail.created,
				modified: CMA.detail.modified,
				title: CMA.detail.title,
				listings: e.detail.items
			},
			fields: CMA.fields
		};

		if (e.detail.info.source === SOURCES.POINTER) {
			dragDisabled = true;
		}
	};

	// Handler to start Drag
	const startDrag = () => {
		dragDisabled = false;
	};

	// Handler to hide/show Report Adjustments
	const toggleHideReportAdjustments = () => hideReportAdjustments = !hideReportAdjustments;

	// Handler to set Client Info
	const setClientInfo = (firstName: string, lastName: string, email: string) => {
		Client_FirstName = firstName;
		Client_LastName = lastName;
		Client_Email = email;
	};

	// Handler to remove Client Info by clicking "Remove" Button
	const removeClientInfo = () => {
		Client_FirstName = null;
		Client_LastName = null;
		Client_Email = "";
	};
	
	// Handler to remove Field on Control Menu
	const handlerFieldRemove = (name: string) => {
		// Control Menu Column, Subject Column and all listings of CMA is drawn based on same fields array of CMA.
		// Once we remove given field in fields array, the all columns are updated automatically.
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

	// Handler to swap two listings of CMA.
	const swapTwoListing = (item1: number, item2: number) => {
		if (item1 == item2) {
			return;
		}

		let listings = [...CMA.detail.listings];
		
		const swap = listings[item1];
		listings[item1] = listings[item2];
		listings[item2] = swap;

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
	};

	// Handler to reorder listings of CMA.
	const reOrderListings = (orders: Array<any>) => {
		let listings: any = [];
		for (let i = 0; i < orders.length; i++) {
			listings.push({
				...CMA.detail.listings[orders[i]]
			});
		}

		CMA = {
			index: CMA.index,
			detail: {
				cma_id: CMA.detail.cma_id,
				created: CMA.detail.created,
				modified: CMA.detail.modified,
				title: CMA.detail.title,
				listings: [...listings]
			},
			fields: CMA.fields
		};
	};

	// Handler to add Custom Comp.
	const addCustomComp = () => {
		// Generate Random Unique ID. ID is essential for svelte-dnd-action module. We should replace this ID with actual ID on Backend.
		// For new Comp, ID is string of negative number. For existing Comp, ID is string of positive number. So we can distinguish the new Comps on Backend and handle them.
		let id: string = Math.floor(-Math.random() * 10000).toString();
		let continueLoop = true;

		while(continueLoop) {
			continueLoop = false;
			id = Math.floor(Math.random() * 10000).toString();;
			for (let i = 0; i < CMA.detail.listings.length; i++) {
				if (CMA.detail.listings[i].id == id) {
					continueLoop = true;
				}
			}
		}

		const listings = [...CMA.detail.listings, {id: Math.floor(Math.random() * 10000).toString(), list_price: "0", total_adj: "0", adj_price: "0"}];

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
	};

	// Set Text of Modal Body.
	const setModalText = (text: string) => modalText = text;

	// Define the activity when Modal is confirmed by user.
	const setConfirmHandler = (callback: Function) => confirmHandler = callback;

	// Handler to remove listing. 
	const removeListingHandler = (index: number) => {
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
			controlMenuRef.classList.remove("absolute");
		}
	};

	// Handler to popup the modal for removing lisintg.
	const removeListingHandlerWrapper = (index: number) => {
		// When modal is closed, this value is not set as false. Before popup modal again, we should set this value as false.
		showModal = false;
		// Set Modal Content
		setConfirmHandler(() => {
			removeListingHandler(index);
		});
		setModalText("Do you want to remove this listing?");
		// Popup Modal
		showModal = true;
	};

	// Handler to popup the modal for making subject.
	const makeSubject = (listing: any, index: number) => {
		// When modal is closed, this value is not set as false. Before popup modal again, we should set this value as false.
		showModal = false;
		// Set Modal Content
		setConfirmHandler(() => {
			Subject_Data = listing;
			removeListingHandler(index);
		});
		setModalText("Do you want to overwrite the current subject property with this listing?");
		// Popup Modal
		showModal = true;
	};

	// Handler to update Field of Subject Column
	const updateSubjectField = (field: string, value: string) => {
		if (field == "list_price") {
			// @ts-ignore
			if (!isNaN(value)) {
				value = value == ""? "0": value;
				// @ts-ignore
				Subject_Data[field] = value;
				updateSubjectTotalAdjust();
			}
		} else {
			// @ts-ignore
			Subject_Data[field] = value;
		}
	};


	const getAdjInfoFromListing = (listing: any) => {
		let total_adj = 0;
		let keys = Object.keys(listing);

		for (let i = 0; i < keys.length; i++) {
			if (typeof listing[keys[i]] === "object") {
				total_adj += parseFloat(listing[keys[i]].adjAmount == ""? "0": listing[keys[i]].adjAmount);
			}
		}

		if (listing["sold_price"] == undefined) {
			return  {
				total_adj: total_adj.toString(),
				adj_price: (total_adj > 0)? (parseFloat(listing["list_price"]) + total_adj).toString(): (parseFloat(listing["list_price"]) - total_adj).toString()
			};
		} else {
			if (!isNaN(listing["sold_price"])) {
				return  {
					total_adj: total_adj.toString(),
					adj_price: (total_adj > 0)? (parseFloat(listing["sold_price"]) + total_adj).toString(): (parseFloat(listing["sold_price"]) - total_adj).toString()
				};
			} else {
				return  {
					total_adj: total_adj.toString(),
					adj_price: (total_adj > 0)? (parseFloat(listing["list_price"]) + total_adj).toString(): (parseFloat(listing["list_price"]) - total_adj).toString()
				};
			}
		}
	};

	// Handler to update Adjustment Price of Subject Column. This is used when we edit list price on Subject Column.
	const updateSubjectTotalAdjust = () => {
		let adjInfo = getAdjInfoFromListing(Subject_Data);
		Subject_Data["total_adj"] = adjInfo.total_adj;
		Subject_Data["adj_price"] = adjInfo.adj_price;
	};

	// Handler to update Total Adjustment and Adjusted Price of given Listing
	const updateTotalAdjust = (iListing: number) => {
		let adjInfo = getAdjInfoFromListing(CMA.detail.listings[iListing]);
		CMA.detail.listings[iListing]["total_adj"] = adjInfo.total_adj;
		CMA.detail.listings[iListing]["adj_price"] = adjInfo.adj_price;
	};
	
	// Handler to edit Field of Listing
	const updateListingField = (iListing: number, field: string, value: any) => {
		CMA.detail.listings[iListing][field] = value;

		if (field == "listdate" || field == "solddate") {
			console.log(value, CMA.detail.listings[iListing]["listdate"], CMA.detail.listings[iListing]["solddate"]);
			CMA.detail.listings[iListing]["dom"] = getDOMValue(CMA.detail.listings[iListing]["listdate"], CMA.detail.listings[iListing]["solddate"]);
		} else {
			if (typeof value != "string") {
				updateTotalAdjust(iListing);
			} else if (field == "list_price" || field == "sold_price") {
				updateTotalAdjust(iListing);
			}
		}
	};

	// Handler to edit manual field on Control Menu
	const updateControlMenuField = (field: string, nice_name: string) => {
		for (let i = 0; i < CMA.fields.length; i++) {
			if (CMA.fields[i].name == field) {
				CMA.fields[i].nice_name = nice_name;
				break;
			}
		}
	}

	// Handler to edit Title of CMA
	const changeCMATitle = (e: any) => {
		CMA.detail.title = e.target.value;
	}

	// Handler to recover all fields
	const resetFields = () => {
		CMA = {
			index: CMA.index,
			detail: {
				cma_id: CMA.detail.cma_id,
				created: CMA.detail.created,
				modified: CMA.detail.modified,
				title: CMA.detail.title,
				listings: CMA.detail.listings
			},
			fields: originFields
		};
	};

</script>

<div class="w-full flex flex-col items-start gap-[20px] overflow-hidden">
	<!-- cma-header -->
	<div class="w-full flex flex-col items-start gap-[15px]">
		<div class="flex flex-col w-full items-start gap-[5px]">
			<h1 class="text-[25px] sm:text-[30px] font-bold">
				{`CMA Adjustments - ${CMA.detail.listings.length} Comps`}
			</h1>
			<p>Drag and drop comp photo to change the order.</p>	
		</div>
		<div class="flex flex-row w-full items-center gap-[10px]">
			<Label class="text-[20px] font-bold">CMA Title:</Label>
			<Input class="max-w-[290px] bg-primary" value={CMA.detail.title} on:input={changeCMATitle}/>
		</div>
		<div class="flex flex-row items-center gap-[10px]">
			<div class="flex flex-row items-center gap-[5px]">
				<Label class="text-[20px] font-bold">Client:</Label>
				{#if Client_Name != null}
					<div class="text-[20px]">{Client_Name}</div>
				{:else}
					<div class="text-[20px] italic">None</div>
				{/if}
			</div>
			{#if Client_Name != null}
				<ChangeContactInfoForm 
					firstName={Client_FirstName} 
					lastName={Client_LastName} 
					email={Client_Email} 
					setClientInfo={setClientInfo} 
				/>
				<Button class="bg-card" on:click={removeClientInfo}>
					Remove
				</Button>
			{:else}
				<ContactForm setClientInfo={setClientInfo} />
			{/if}
		</div>
		<div class="flex flex-row items-center gap-[5px]">
			<Label class="text-[20px] font-bold">Hide Report Adjustments:</Label>
			<RadioButton isChecked={hideReportAdjustments} toggle={toggleHideReportAdjustments} />
		</div>
		<div class="flex flex-row items-center gap-[5px] sm:gap-[10px]">
			<Button class="bg-card" on:click={addCustomComp}>Add Custom Comp</Button>
			<Button class="bg-card" on:click={viewCMAReport}>View CMA Report</Button>
			<Button class="bg-card" on:click={saveAll}>Save All</Button>
		</div>
	</div>

	<!-- cma-body -->
	<ul class="overflow-x-scroll w-full flex flex-row">
		<div class="sm:absolute bg-primary z-10 pl-[5px] py-[5px] flex flex-row" bind:this={controlMenuRef}>
			<!-- cma-control-menu -->
			<li class=" flex flex-col justify-between w-[180px] lg:min-w-[250px] border-solid border-card-foreground rounded-lg border-[1px] py-[10px]">
				<!-- cma-control-menu-header -->
				<div class="flex flex-col h-[250px] gap-[15px] px-[5px] lg:px-[15px]">
					<Button class="w-fit bg-cyan-foreground hover:bg-cyan-foreground text-white font-bold border-none" on:click={resetFields}>Reset Fields</Button>
				</div>
				<!-- cma-control-menu-fields -->
				<div class="flex flex-col gap-[5px]">
					{#each CMA.fields as Field, iField}
						<ControlMenuField 
							index={iField} 
							Field={Field} 
							niceName={Field.nice_name} 
							removeHandler={handlerFieldRemove} 
							updateControlMenuField={updateControlMenuField} 
						/>
					{/each}
				</div>
			</li>

			<!-- subject property -->
			<SubjectEdit 
				fields={CMA.fields} 
				Subject_Data={Subject_Data} 
				updateSubjectField={updateSubjectField} />
		</div>

		<!-- listings-body -->
		<section class="flex flex-1 sm:ml-[360px] lg:ml-[500px] p-[5px]" 
			style="mouse-wheel:horizontal;"
			use:dndzone={{items: CMA.detail.listings, dragDisabled, flipDurationMs}} 
			on:consider={handleConsider} 
			on:finalize={handleFinalize}
		>
			{#each CMA.detail.listings as listing, iListing(listing.id)}
				<div animate:flip={{duration: flipDurationMs}}>
					<ListingCardEdit
						updateListingField={updateListingField} 
						makeSubject={makeSubject} 
						fields={CMA.fields} 
						listing={listing} 
						removeListingHandler={removeListingHandlerWrapper} 
						iListing={iListing} 
						hideReportAdjustments={hideReportAdjustments} 
						startDrag={startDrag}
						dragDisabled={dragDisabled}
					/>		
				</div>	
			{/each}
		</section>
	</ul>

	<!-- Additonal Fields -->
	<div class="flex flex-col w-full gap-[20px]">
		<div class="flex flex-col gap-[5px] w-full">
			<Label class="text-[20px] font-bold">Subject Property Remarks</Label>
			<Textarea class="bg-primary border-solid outline-none border-black border-[1px] focus:border-[3px] focus:border-cyan-foreground" bind:value={subjectPropertyRemarks} />
		</div>

		<div class="flex flex-col gap-[5px] w-full">
			<Label class="text-[20px] font-bold">Property Locations</Label>
			<Textarea class="bg-primary border-solid outline-none border-black border-[1px] focus:border-[3px] focus:border-cyan-foreground" bind:value={propertyLocations} />
		</div>

		<div class="flex flex-col gap-[5px] w-full">
			<Label class="text-[20px] font-bold">Comparable Remarks</Label>
			<Textarea class="bg-primary border-solid outline-none border-black border-[1px] focus:border-[3px] focus:border-cyan-foreground" bind:value={comparableRemarks} />
		</div>

		<div class="flex flex-col gap-[5px] w-full">
			<Label class="text-[20px] font-bold">Property Market Value</Label>
			<Input class="bg-primary border-solid outline-none border-black border-[1px] ring-none focus:border-[3px] focus:border-cyan-foreground" bind:value={propertyMarketValue} />
		</div>

		<div class="flex flex-col gap-[5px] w-full">
			<Label class="text-[20px] font-bold">Suggested List Price</Label>
			<Input class="bg-primary border-solid outline-none border-black border-[1px] focus:border-[3px] focus:border-cyan-foreground" bind:value={suggestedListPrice} />
		</div>

		<div class="flex flex-col gap-[5px] w-full">
			<Label class="text-[20px] font-bold">Reconciliation Remarks</Label>
			<Textarea class="bg-primary border-solid outline-none border-black border-[1px] focus:border-[3px] focus:border-cyan-foreground" bind:value={reconciliationRemarks} />
		</div>
	</div>

	<Button class="bg-card" on:click={saveAll}>Save all</Button>

	<!-- Confirmation Modal -->
	<ConfirmationModal 
		showModal={showModal} 
		confirmHandler={confirmHandler} 
		modalText={modalText} 
	/>
</div>