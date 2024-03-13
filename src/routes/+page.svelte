<script lang="ts">
    import CMAEditor from "$lib/components/custom/CMAEditor/CMAEditor.svelte";
    import { getDOMValue } from "$lib/utils";

    import CMAs from "../demo/cmasEdit.json";
    import Fields from "../demo/fieldsEdit.json";

    let cmaData: any = CMAs.map((CMA, index) => {
        return {
            index,
            detail: CMA,
            fields: Fields
        }
    });

    for (let i = 0; i < cmaData.length; i++) {
        for (let j = 0; j < cmaData[i].detail.listings.length; j++) {
            cmaData[i].detail.listings[j]["dom"] = getDOMValue(cmaData[i].detail.listings[j]["listdate"], cmaData[i].detail.listings[j]["solddate"]);
        }
    }
    
    let CMA = cmaData[0];
</script>
   
<div class="bg-primary text-primary-foreground flex flex-col gap-[50px] w-full min-h-screen px-[10px] py-[20px] sm:p-[20px] text-[15px]" style="font-family: Arial, Helvetica, sans-serif;">
    <CMAEditor CMA={CMA} originFields={CMA.fields} />
</div>