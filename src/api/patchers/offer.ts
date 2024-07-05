import jiff from "jiff"

import { 
    documentSubtreeFromOpts, 
    treePatch 
} from "@/src/models/subtree"

import { UmbrlForm } from "@/src/models/form"

import { 
    QuoteScreen, 
    QuoteScreenId, 
    StaticQuoteJourneyDefinition 
} from "@/src/stores/staticQuoteJourneyDefinition"

import { LocalState } from "@/src/stores/contexts/localStateContext"

export const refineOfferPatchDoc = (apiQuoteDoc: any, localState: LocalState) : jiff.JSONPatch => {

    const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.QUICK_QUOTE_RESULT) as QuoteScreen

    const apiResponseOfferSubtree = documentSubtreeFromOpts(apiQuoteDoc, screenDefinition.apisection, screenDefinition.opts)
    const offerLocalData = new UmbrlForm(screenDefinition.opts, screenDefinition.apisection, localState, null).dumpTreeWithMapping()

    const patchDoc = treePatch(apiResponseOfferSubtree, offerLocalData).filter(d => ![null, undefined].includes(d.value))

    return patchDoc
}

export const selectedOfferPatchDoc = () => {

}