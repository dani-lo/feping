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

    const [formDataManager, setFormDataManager] = useState<UmbrlForm | null>(null)
    const [syncd, setSyncd] = useState(false)

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

        setFormDataManager(fm)
    }, [])

    useEffect(() => {
        if (qqCtx?.state && formDataManager) {
                        
            const fullPopulatedOpts = populateOptsFromQuote(stepOpts, apisection ?? '', qqCtx?.state) as QuoteOpt[]

            if (fullPopulatedOpts && !syncd) {

                formDataManager?.syncQuoteDataOpts(fullPopulatedOpts, true)

                setSyncd(true)
            }
        }
    }, [formDataManager, qqCtx?.state])

    return formDataManager

}