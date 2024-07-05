
// 'use client'

// import { useEffect, useState, useContext } from "react"

// import { FormOrchestrator } from "@/components/quote/orchestrators/formOrchestrator"
// import { StepFooterComponent } from "@/components/quote/orchestrators/stepsOrchestrator"
// import { TextOrchestratorComponent } from "@/components/quote/orchestrators/textOrchestrator"

// import { FormDataItem, stateFromOpts, UmbrlForm } from "@/src/models/form"
// import { populateOptsFromEnum, populateOptsFromQuote } from "@/src/models/quote"

// import { QuoteOpt, QuoteOptType } from "@/src/stores/staticQuoteJourneyDefinition"

// import { QQResponseStateContext } from '@/src/stores/contexts/quickQuoteStateContext'

// import { StepMode } from "@/src/types"

// import { UmbrlButton } from "@/components/libForm/btn"
// import { TxtTitleSection, TxtTitleSub } from "@/components/util/txt"

// import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
// import { MetadataStateContext } from "@/src/stores/contexts/metadataStateContext"
// import { StepResumeComponent } from "@/components/quote/widgets/stepResume"
// import { useFormApiDataSync } from "@/src/hooks/useFormApiDataSync"
// // import { useLocalStatePopulation } from "@/src/hooks/useLocalStatePopulation"
// import { useUmbrlForm } from "@/src/hooks/useUmbrlForm"

// export const apisection = 'ownership_values'

// export const stepOpts: QuoteOpt[] = [
//     {
//         type: QuoteOptType.SELECT,
//         title: 'You own the property',
//         text: 'Select an option...',
//         apikey: 'ownership_type',
//         optionvals: [],
//         enumkey: 'property_ownership',
//         confirmable: true,
//         required: true
//     }
// ]                

// const stepactions = [
//     {
//         type: UmbrlButton.UPDATE,
//         text: 'update'
//     },
//     {
//         type: UmbrlButton.CONFIRM,
//         text: 'confirm'
//     }
// ]


// export const RefineOwnershipAndValuesStepComponent =  ({ 
//     stepId, 
//     editable, 
//     expanded, 
//     onConfirm, 
//     icon, 
//     expand, 
//     setStepValid, 
//     setStepUnvalid }: {
//         stepId: string;
//         editable: boolean;
//         onConfirm: () => void;
//         icon: string;
//         expanded: boolean;
//         expand: () => void;
//         setStepValid: (s: string) => void;
//         setStepUnvalid: (s: string) => void;
// }) => {

//     const [screendatavalid, setScreendataValid] = useState<{ apikey: string; val: FormDataItem | null; }[] | null>(null)

//     const [mode, setMode] = useState(StepMode.DISPLAY)

//     const qqCtx = useContext(QQResponseStateContext)
//     const localCtx = useContext(LocalStateContext)

//     // const formDataManager = new UmbrlForm(
//     //     stepOpts, 
//     //     apisection, 
//     //     localCtx?.state ?? null, 
//     //     localCtx?.dispatch  ?? null
//     // )

//     const formDataManager = useUmbrlForm(stepOpts, apisection, localCtx, qqCtx, setScreendataValid)

//     useEffect(() => {
//         if (!expanded && editable) {
//             setMode(StepMode.RESUME)
//         }
//     }, [expanded, editable])

//     // useLocalStatePopulation(stepOpts, formDataManager, setScreendataValid, localCtx?.state ?? null)
//     // useFormApiDataSync(qqCtx?.state ?? null, formDataManager, stepOpts)

//     // const canConfirm = formDataManager.hasAllRequiredData() || (screendatavalid !== null  && !screendatavalid.some(d => !d))
//     const canConfirm = formDataManager.hasAllRequiredDataInStorableFormat(screendatavalid)
    
//     if (mode === StepMode.RESUME) {
//         return <StepResumeComponent
//             key={ apisection }
//             title={ 'Ownership and Values' }
//             icon={ icon }
//             editable={ editable }
//             onClick={ () => {
//                 if (editable) {
//                     setMode(StepMode.DISPLAY)
//                     expand()
//                 }
//             }}
//         />
//     }

//     return <li 
//         className={ `step-current` }
//         key={ apisection }
//     >
//         <div>
//             <TxtTitleSub
//                 txt="Ownership and Values"
//             />
//         </div>
//         <div>
//             {
//                 mode === StepMode.DISPLAY ?
//                 <TextOrchestratorComponent
//                     question={ null }
//                     opts={ stepOpts }
//                     formDataManager={ formDataManager }
//                 />:
//                 <FormOrchestrator
//                     opts={ stepOpts }
//                     formDataManager={ formDataManager }
//                     onValid={ (data) => {
//                         setScreendataValid(data) 
//                         setStepValid(stepId)
                        
//                     }}
//                     onUnvalid={ () => {
//                         setScreendataValid(null) 
//                         setStepUnvalid(stepId)
//                     }}
//                     withFade={ true }
//                 />
//             }
//         </div>
//         <StepFooterComponent
//             mode={ mode }
//             disabledConfirm={ !canConfirm }
//             disabledSave={ !screendatavalid }
//             onConfirm={ () => {
//                 setMode(StepMode.RESUME)
//                 onConfirm()
//             }}
//             onUpdate={ () => {
//                 setMode(StepMode.EDIT)
//             }}
//             onSaveEdit={ () => {
//                 if (screendatavalid) {
//                     formDataManager.saveScreenData(screendatavalid, true)
//                 }
//                 setMode(StepMode.RESUME)
//                 onConfirm()
//             } }
//             onCancelEdit={ () => {
//                 setMode(StepMode.DISPLAY)
//             }}
//             stepactions={ stepactions }
//         />
//     </li>
// }