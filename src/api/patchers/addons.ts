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

export const refineAddonsPatchDoc = (apiQuoteDoc: any, localState: LocalState) : jiff.JSONPatch => {
    
    // const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.QUICK_QUOTE_ADDONS) as QuoteScreen
    
    // const apiResponseAddonsSubtree = documentSubtreeFromOpts(apiQuoteDoc, screenDefinition.apisection, screenDefinition.opts)
    // const addonsLocalData = new UmbrlForm(screenDefinition.opts, screenDefinition.apisection, localState, null).dumpTreeWithMapping()

    const selectedProductId = apiQuoteDoc.selected_product_uuid
    // @ts-ignore
    const selectedOfferId = Object.values(apiQuoteDoc.offers).find(o => o.product?.uuid === selectedProductId)?.uuid ?? null

    if (
        !selectedOfferId || 
        !apiQuoteDoc.offers[selectedOfferId] || 
        !apiQuoteDoc.offers[selectedOfferId].addons_selection ||
        // @ts-ignore
        !localState?.toogles?.addons) {
        return []
    }

    // @ts-ignore
    const localAddons = localState.toogles.addons ?? {}

    const localAddonsWithOffer = {
        offers: {
            [selectedOfferId]: {
                addons_selection: {
                    // @ts-ignore
                    ...localAddons
                }
            }
        }
    }

    const apiResponseAddonsSubtree = {
        offers: {
            [selectedOfferId]: {
                addons_selection: { 
                        ...apiQuoteDoc.offers[selectedOfferId].addons_selection
                 }
            }
        }
    }
    
    return treePatch(apiResponseAddonsSubtree, localAddonsWithOffer).filter(d => ![null, undefined].includes(d.value))
}