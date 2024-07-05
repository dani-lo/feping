import { useEffect, useState } from "react"
import { FormDataItem, UmbrlForm, stateFromOpts } from "../models/form"
import { QuoteOpt } from "../stores/staticQuoteJourneyDefinition"
import { populateOptsFromQuote } from "../models/quote"



export const useUmbrlForm = (
        stepOpts: QuoteOpt[], 
        apisection: string, 
        localCtx: any, 
        qqCtx: any, 
        onValid?: (d: { apikey: string; val: FormDataItem; }[]) => void
    ) => {

    const [formDataManager, setFormDataManager] = useState<UmbrlForm>(new UmbrlForm(
        stepOpts, 
        apisection, 
        localCtx?.state ?? null, 
        localCtx?.dispatch  ?? null
    ))

    const syncStateEager = () => {
        
        // console.log('SYNC EAGERLY =====')

        if (qqCtx?.state) {
            
            // console.log('A111111')
            
            const fullPopulatedOpts = populateOptsFromQuote(stepOpts, apisection ?? '', qqCtx?.state) as QuoteOpt[]
            
            // console.log(fullPopulatedOpts)

            if (fullPopulatedOpts) {
                // console.log('22222222')

                formDataManager.syncQuoteDataOpts(fullPopulatedOpts, true)
            }
        }
    }
    
    useEffect(() => {

        const fm = new UmbrlForm(
            stepOpts, 
            apisection, 
            localCtx?.state ?? null, 
            localCtx?.dispatch  ?? null
        )

        const fromOptsState = stateFromOpts(stepOpts, fm) ?? {}

        const toSave = Object.keys(fromOptsState).map(apikey => {

            return {
                apikey,
                val: fromOptsState[apikey] as FormDataItem
            }
        })

        if (fromOptsState && fm.hasAllRequiredDataInStorableFormat(toSave) && onValid) { 
            onValid(toSave)
        } 

        syncStateEager()

        setFormDataManager(fm)

    }, [localCtx?.state, qqCtx?.state])

    syncStateEager()

    return formDataManager

}