// import { useEffect } from "react"
// import { FormDataItem, StorableObj, UmbrlForm, stateFromOpts } from "../models/form"
// import { QuoteOpt } from "../stores/staticQuoteJourneyDefinition"
// import { LocalState } from "../stores/contexts/localStateContext"

// export const useLocalStatePopulation = (
//     opts: QuoteOpt[],
//     dataManager: UmbrlForm,
//     onPopulated: (d: StorableObj[]) => void,
//     localState: LocalState | null
// ) => {

//     useEffect(() => {

//         const fromOptsState = stateFromOpts(opts, dataManager) ?? {}

//         const toSave = Object.keys(fromOptsState).map(apikey => {

//             return {
//                 apikey,
//                 val: fromOptsState[apikey] as FormDataItem
//             }
//         })

//         if (fromOptsState && dataManager.hasAllRequiredDataInStorableFormat(toSave)) {            
//             onPopulated(toSave)
//         } 

//     }, [localState])

// }