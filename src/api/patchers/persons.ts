import jiff from "jiff"

import { 
    stepOpts as mainPolicyHolderOpts,
    apisection as mainPolicyHolderApiSection
} from "@/components/quote/screens/refine/persons/refineMainPolicyHolderStep"

import {
     stepOpts as jointPolicyHolderOpts,
     apisection as jointPolicyHolderApiSection
} from "@/components/quote/screens/refine/persons/refineJointPolicyHolderStep"

import { 
    stepOpts as residentsStepOpts,
    apisection as residentsApiSection
} from "@/components/quote/screens/refine/persons/refineResidentsStep"

import { 
    stepOpts as claimsStepOpts,
    apisection as claimsApiSection
} from "@/components/quote/screens/refine/persons/refineClaimsStep"

import { documentSubtreeFromOpts, treePatch } from "@/src/models/subtree"

import { UmbrlForm } from "@/src/models/form"

import { LocalState } from "@/src/stores/contexts/localStateContext"
import { mergeSubtrees } from "@/src/models/subtree"

export const refinePersonsPatchDoc = (apiQuoteDoc: any, localState: LocalState) : jiff.JSONPatch => {

    console.log('REFINE PATCH')
    console.log(localState)

    const apiResponseMainPolicyHolderSubtree = documentSubtreeFromOpts(apiQuoteDoc, mainPolicyHolderApiSection, mainPolicyHolderOpts)
    const apiResponseJointPolicyHolderSubtree = documentSubtreeFromOpts(apiQuoteDoc, jointPolicyHolderApiSection, jointPolicyHolderOpts)
    const apiResponseResidentsSubtree = documentSubtreeFromOpts(apiQuoteDoc, residentsApiSection, residentsStepOpts)
    const apiResponseClaimsSubtree = documentSubtreeFromOpts(apiQuoteDoc, claimsApiSection, claimsStepOpts)

    const mainPolicyHolderLocalData = new UmbrlForm(mainPolicyHolderOpts, mainPolicyHolderApiSection, localState, null).dumpTreeWithMapping(true)
    const jointPolicyHolderLocalData = new UmbrlForm(jointPolicyHolderOpts, jointPolicyHolderApiSection, localState, null).dumpTreeWithMapping()
    const residentsLocalData = new UmbrlForm(residentsStepOpts, residentsApiSection, localState, null).dumpTreeWithMapping()
    const claimsLocalData = new UmbrlForm(claimsStepOpts, claimsApiSection, localState, null).dumpTreeWithMapping()

    const fullLocaDoc = mergeSubtrees([mainPolicyHolderLocalData,jointPolicyHolderLocalData, residentsLocalData, claimsLocalData])
    const fullApiDoc = mergeSubtrees([apiResponseMainPolicyHolderSubtree, apiResponseJointPolicyHolderSubtree, apiResponseResidentsSubtree, apiResponseClaimsSubtree]) 
    
    console.log('apiResponseClaimsSubtree then claimsLocalData')
    console.log(fullLocaDoc)
    console.log(fullApiDoc)

    console.log('EXPERIMENT')
    console.log(treePatch(apiResponseClaimsSubtree, claimsLocalData))
    
    const newPatch = treePatch(fullApiDoc, fullLocaDoc)

    return newPatch.filter(d => ![null, undefined].includes(d.value))
}