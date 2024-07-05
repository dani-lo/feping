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

export const refineBoostsPatchDoc = (apiQuoteDoc: any, localState: LocalState) : jiff.JSONPatch => {

    const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.QUICK_QUOTE_COVERS) as QuoteScreen
    
    const apiResponseCoversSubtree = documentSubtreeFromOpts(apiQuoteDoc, screenDefinition.apisection, screenDefinition.opts)
    
    const coversLocalData = new UmbrlForm(screenDefinition.opts, screenDefinition.apisection, localState, null).dumpTreeWithMapping()

    return treePatch(apiResponseCoversSubtree, coversLocalData).filter(d => ![null, undefined].includes(d.value))
}