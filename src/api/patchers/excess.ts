import jiff from "jiff"

import { 
    documentSubtreeFromOpts, 
    treePatch 
} from "@/src/models/subtree"

import { UmbrlForm } from "@/src/models/form"

import { 
    QuoteOptType,
    QuoteScreen, 
    QuoteScreenId, 
    StaticQuoteJourneyDefinition 
} from "@/src/stores/staticQuoteJourneyDefinition"
import { LocalState } from "@/src/stores/contexts/localStateContext"

export const refineExcesssPatchDoc = (apiQuoteDoc: any, localState: LocalState) : jiff.JSONPatch => {

    const apisection = 'policy'
    const opts =  [
                {
                    "type": QuoteOptType.RANGE_CURRENCY,
                    "apisubsection": "buildings_coverage",
                    "apikey": "voluntary_excess",
                    "title": "Buildings voluntary excess",
                    "breakdowntitle": "Total buildings excess",
                    "blocktitle": "Buildings claims",
                    "required": true,
                },
                {
                    "type": QuoteOptType.RANGE_CURRENCY,
                    "apisubsection": "contents_coverage",
                    "apikey": "voluntary_excess",
                    "title": "Contents voluntary excess",
                    "breakdowntitle": "Total contents excess",
                    "required": true,
                },
            ]

    
    const apiResponseExcesSubtree = documentSubtreeFromOpts(apiQuoteDoc, apisection, opts)

    const excessLocalData = new UmbrlForm(opts, apisection, localState, null).dumpTreeWithMapping()


    return treePatch(apiResponseExcesSubtree, excessLocalData).filter(d => ![null, undefined].includes(d.value))
}