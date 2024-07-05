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

    // const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.QUICK_QUOTE_BOOSTS) as QuoteScreen
    
    // const apiResponseBoostsSubtree = documentSubtreeFromOpts(apiQuoteDoc, screenDefinition.apisection, screenDefinition.opts)
    // const boostsLocalData = new UmbrlForm(screenDefinition.opts, screenDefinition.apisection, localState, null).dumpTreeWithMapping()

    const selectedProductId = apiQuoteDoc.selected_product_uuid
    // @ts-ignore
    const selectedOfferId = Object.values(apiQuoteDoc.offers).find(o => o.product?.uuid === selectedProductId)?.uuid ?? null

    if (
        !selectedOfferId || 
        !apiQuoteDoc.offers[selectedOfferId] || 
        !apiQuoteDoc.offers[selectedOfferId].boost_selection ||
        // @ts-ignore
        !localState?.toogles?.boosts) {
        return []
    }

    // @ts-ignore
    const localBoosts = Object.keys(localState.toogles.boosts).reduce((acc, curr) => {
        
        const apiKey = curr + '_boost'

        // @ts-ignore
        acc[apiKey] = localState.toogles.boosts[curr]

        return acc
    }, {})

    const localBoostsWithOffer = {
        offers: {
            [selectedOfferId]: {
                boost_selection: {
                    // @ts-ignore
                    ...localBoosts
                }
            }
        }
    }

    const apiResponseBoostsSubtree = {
        offers: {
            [selectedOfferId]: {
                boost_selection: {
                        ...apiQuoteDoc.offers[selectedOfferId].boost_selection
                }
            }
        }
    }

    return treePatch(apiResponseBoostsSubtree, localBoostsWithOffer).filter((d: any) => ![null, undefined].includes(d.value))
}