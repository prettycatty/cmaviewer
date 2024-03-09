<script lang="ts">
    import SubjectField from '$lib/components/custom/SubjectField/SubjectField.svelte';

    export let updateSubjectField: Function;
    export let fields: any;
    export let Subject_Data: any;

    const getListingAdjustValueByKey = (listing: any, key: string) => {
      try {
        return listing[key].value == undefined? listing[key]: listing[key].value;
      } catch(error) {
        return "";
      }
    };
</script>

<!-- listing-card -->
<li class="z-10 flex flex-col w-[180px] lg:min-w-[250px] border-solid border-card-foreground rounded-lg border-[1px] py-[10px]">
    <!-- listing-card-header -->
    <div class="flex flex-col h-[300px] gap-[15px] px-[5px] lg:px-[15px]">
        <div class="w-full h-[40px] flex flex-row items-center justify-between font-bold">
            Subject Property
        </div>
        <div class="w-full flex justify-center">
          <div class="bg-cover w-full h-[130px] lg:h-[150px]" style={`background: url(${Subject_Data.photo_url? Subject_Data.photo_url: "assets/images/empty.png"}); background-size: cover;`}></div>
        </div>
        <div class="flex flex-col items-start justify-start gap-[15px]">
          <div class="text-cyan cursor-pointer w-fit p-0 underline underline-offset-4 font-bold">Change Photo</div>
        </div>
    </div>

    <!-- cma-control-menu-fields -->
    <div class="flex flex-col gap-[5px]">
        {#each fields as Field, index}
            <SubjectField 
                index={index} 
                updateSubjectField={updateSubjectField} 
                isEditing={true} 
                field={Field} 
                value={getListingAdjustValueByKey(Subject_Data, Field.name)} 
            />
        {/each}
    </div>
</li>