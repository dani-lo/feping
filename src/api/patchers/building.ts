import jiff from "jiff"

import { 
    stepOpts as buildingStepOpts,
    apisection as buildingApiSection
} from "@/components/quote/screens/refine/building/refineBuildingStep"

// import {
//      stepOpts as ownershipAndValuesStepOpts,
//      apisection as ownershipAndValuesApiSection
// } from "@/components/quote/screens/refine/building/refineOwnershipAndValuesStep"

import { 
    stepOpts as risksStepOpts,
    apisection as risksApiSection
} from "@/components/quote/screens/refine/building/refineRiskStep"

import { documentSubtreeFromOpts, mergeSubtrees, treePatch } from "@/src/models/subtree"

import { UmbrlForm } from "@/src/models/form"
import { LocalState } from "@/src/stores/contexts/localStateContext"

export const refineBuildingsPatchDoc = (apiQuoteDoc: any, localState: LocalState): jiff.JSONPatch => {

    const apiResponseBuildingSubtree = documentSubtreeFromOpts(apiQuoteDoc, buildingApiSection, buildingStepOpts)
    // const apiResponseOwnershipAndValuesSubtree = documentSubtreeFromOpts(apiQuoteDoc, ownershipAndValuesApiSection, ownershipAndValuesStepOpts)
    const apiResponseRisksSubtree = documentSubtreeFromOpts(apiQuoteDoc, risksApiSection, risksStepOpts)

    const buildingLocalData = new UmbrlForm(buildingStepOpts, buildingApiSection, localState, null).dumpTreeWithMapping()
    // const ownershipAndValuesLocalData = new UmbrlForm(ownershipAndValuesStepOpts, ownershipAndValuesApiSection, localState, null).dumpTreeWithMapping()
    const risksLocalData = new UmbrlForm(risksStepOpts, risksApiSection, localState, null).dumpTreeWithMapping()

    const fullLocaDoc = mergeSubtrees([buildingLocalData, risksLocalData])
    const fullApiDoc = mergeSubtrees([apiResponseBuildingSubtree, apiResponseRisksSubtree]) 

    const newPatch = treePatch(fullApiDoc, fullLocaDoc)
    
    return newPatch.filter(d => ![null, undefined].includes(d.value))
}