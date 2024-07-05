// import { populateOptsFromACloud } from '@/src/models/address'
// import { FormDataItem, UmbrlForm } from '@/src/models/form'
// import { QuoteOpt, QuoteScreen, QuoteScreenId, StaticQuoteJourneyDefinition } from '@/src/stores/staticQuoteJourneyDefinition'
// import { useEffect, useState } from 'react'
// import { FormOrchestrator } from '../orchestrators/formOrchestrator'
// import { config } from '@/src/config'
// import { SkeletonsComponent } from './ghost'
// import { TextOrchestratorComponent } from '../orchestrators/textOrchestrator'

// type Props = {
//     acloud_id: string;
//     onValid: (data: { apikey: string; val: FormDataItem | null; }[]) => void;
//     onUnvalid: () => void;
//     formDataManager: UmbrlForm;
//     'data-testid'?: string;
// }

// const AddressForm = ({ acloud_id, onUnvalid, onValid, formDataManager, 'data-testid': testId }: Props) => {

//     const [addressDetails, setAddressDetails] = useState<any>(null)  

//     const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.QUICK_QUOTE_PROPERTY) as QuoteScreen

//     useEffect(() => {
//         const fetchAddressDetails = async () => {
//             try {
//                 const response = await fetch(`${ config.url.addressDetails }/${acloud_id}`, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "x-api-key": config.acloud.key,
//                         "x-client-id": config.acloud.clientId
//                     }
//                 })


//                 if (response?.ok) {
//                     const data = await response.json()
//                     setTimeout(() => setAddressDetails(data["result"]["properties"]), 1000)
                    
//                 }
//             } catch (error) {
//                 console.log(error)
//             }
//         }

//         fetchAddressDetails()
//     }, [acloud_id])

//     const populatedOpts = addressDetails ? populateOptsFromACloud(screenDefinition.opts, formDataManager.storageKey ?? '', addressDetails, acloud_id) as QuoteOpt[] : null

//     if (populatedOpts) {
//         formDataManager.syncQuoteDataOpts(populatedOpts, true)
//     }
  
//     return <SkeletonsComponent on={ !populatedOpts || !addressDetails }>
//         <TextOrchestratorComponent
//             opts={ screenDefinition.opts || [] }
//             question={ null }
//             formDataManager={ formDataManager }
//         />
//     </SkeletonsComponent>
// }

// export default AddressForm