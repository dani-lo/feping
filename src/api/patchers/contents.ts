// import { 
//     stepOpts as coverInsideStepOpts,
//     apisection as coverInsideApiSection
// } from "@/components/quote/screens/refine/contents/refineCoverInside"

// import {
//      stepOpts as totalContentsStepOpts,
//      apisection as totalContentsApiSection
// } from "@/components/quote/screens/refine/contents/refineTotalContents"

import { 
    stepOpts as valuablesStepOpts,
    apisection as valuablesApiSection
} from "@/components/quote/screens/refine/contents/refineHighRiskItems"

import { documentSubtreeFromOpts, treePatch } from "@/src/models/subtree"

import { UmbrlForm } from "@/src/models/form"
import jiff from "jiff"
import { LocalState } from "@/src/stores/contexts/localStateContext"

export const refineContentsPatchDoc = (apiQuoteDoc: any, localState: LocalState) : jiff.JSONPatch => {

    const apiResponseValuablesSubtree = documentSubtreeFromOpts(apiQuoteDoc, valuablesApiSection, valuablesStepOpts)
    const valuablesLocalData = new UmbrlForm(valuablesStepOpts, valuablesApiSection, localState, null).dumpTreeWithMapping()

    // console.log(apiResponseValuablesSubtree)
    // console.log(valuablesLocalData)
    
    const patch = treePatch(apiResponseValuablesSubtree, valuablesLocalData).filter(d => ![null, undefined].includes(d.value))
    return patch
}