import { Metadata } from "next"
import { QuoteState } from "../stores/contexts/quickQuoteStateContext"
import { MetadataState } from "../stores/contexts/metadataStateContext"
import { UmbrlForm } from "../models/form"
import { useEffect, useState } from "react"
import { populateOptsFromEnum, populateOptsFromQuote } from "../models/quote"
import { QuoteOpt } from "../stores/staticQuoteJourneyDefinition"

export const useFormApiDataSync = (
        quoteState: QuoteState | null, 
        formDataManager: UmbrlForm, 
        opts: QuoteOpt[]) => {
    
    useEffect(() => {

        if (quoteState) {
            
            const fullPopulatedOpts = populateOptsFromQuote(opts, formDataManager.storageKey ?? '', quoteState) as QuoteOpt[]

            if (fullPopulatedOpts) {
                formDataManager.syncQuoteDataOpts(fullPopulatedOpts, true)
            }
        } 

    }, [!!quoteState])
}   