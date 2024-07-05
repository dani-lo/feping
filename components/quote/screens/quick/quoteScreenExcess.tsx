// 'use client'

// import { useContext, useEffect, useState } from "react"

// import { QuoteOpt, QuoteScreen, QuoteScreenIdToUrl } from "@/src/stores/staticQuoteJourneyDefinition"

// import { FooterMode, ScreenFooterComponent } from "@/components/quote/widgets/screenFooter"
// import { ScreenMode } from "@/src/types"

// import { FormDataItem, UmbrlForm } from "@/src/models/form"
// import { TxtNoteEvidence, TxtTitlePage, TxtTitleSection } from "@/components/util/txt"
// import { QQResponseStateContext } from "@/src/stores/contexts/quickQuoteStateContext"
// import { populateOptsFromQuote } from "@/src/models/quote"
// import { useQuoteRetrieval } from "@/src/hooks/useQuoteRetrieval"
// import { useQuoteRefinement } from "@/src/hooks/useQuoteRefinement"
// import { useRouter } from "next/navigation"
// import { InfoBlockComponent } from "../../widgets/infoBlock"
// import { Slider } from "@nextui-org/react"
// import { ExcessDetailsComponent } from "../../widgets/excessDetails"
// import { LoadingSection } from "../../widgets/loadingSection"
// import { refineExcesssPatchDoc } from "@/src/api/patchers/excess"
// import { PolicyType, currentPolicy } from "@/src/models/policy"
// // import { useQuotePremiumBoost } from "@/src/hooks/useQuotePremiumBoost"
// import { useAtom } from "jotai"
// import { uiStateRefreshAtom } from "@/src/stores/jotai/uiState"
// import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
// import { MetadataStateContext } from "@/src/stores/contexts/metadataStateContext"
// import { useFormApiDataSync } from "@/src/hooks/useFormApiDataSync"
// import { ExcessesComponent, ExcessOptData } from "../../widgets/excesses"

// // const excessCoverageDetails = {
// //     building: {
// //         'Buildings claims': 199,
// //         'Flood-related claims': 250,
// //         'Escape of water claims': 500,
// //         'Subsidence claims': 1000,
// //     },
// //     content: {
// //         'Contents claims': 199,
// //         'Flood':250,
// //         'Escape of water': 500,
// //     }
// // }


// export const QuoteScreenExcessComponent = ({ screenDefinition, mode }: {
//             screenDefinition: QuoteScreen;
//             mode: ScreenMode;
//         }) => {
    
            
//     const localCtx = useContext(LocalStateContext)
//     const ctxQuickQuote = useContext(QQResponseStateContext)

//     // const [refresh, setRefresh] = useAtom(uiStateRefreshAtom)
    
//     useQuoteRetrieval({ state: ctxQuickQuote?.state ?? null, dispatch: ctxQuickQuote?.dispatch ?? null })

//     const [buildingExcess, setBuildingExcess] = useState(0)
//     const [contentsExcess, setContentsExcess] = useState(0)

//     const router = useRouter()

//     const [refined, setRefining] = useQuoteRefinement({
//         quoteState: ctxQuickQuote?.state ?? null,
//         quoteDispatch: ctxQuickQuote?.dispatch ?? null,
//         localState: localCtx?.state ?? null,
//         localDispatch: localCtx?.dispatch ?? null,
//         patchFn: refineExcesssPatchDoc,
//         testing: true
//     })

//     const offer = ctxQuickQuote?.state ? currentOffer(ctxQuickQuote?.state) : null

//     // const boostedVal = useQuotePremiumBoost(offer?.premium ?? 0, refresh)

//     useEffect(() => {
//         if (refined) {
//             router.push(nextUrl)
//         }
//     }, [refined])
// console.log('--------------------------')
//     useEffect(() => {
//         const bExcess = formDataManager.keyVal('voluntary_excess', 'buildings_coverage') 
//         const cExcess = formDataManager.keyVal('voluntary_excess', 'contents_coverage') 

//         console.log(bExcess)
//         console.log(cExcess)

//                 setBuildingExcess(bExcess ?? 250)
//                 setContentsExcess(cExcess ?? 250)
        
//         }, [ctxQuickQuote])

    

//     const policySelected = currentPolicy(ctxQuickQuote?.state ?? null, null)

//     const formDataManager = new UmbrlForm(
//         screenDefinition.opts, 
//         screenDefinition.apisection, 
//         localCtx?.state ?? null, 
//         localCtx?.dispatch  ?? null
//     )
    
//     useFormApiDataSync(ctxQuickQuote?.state ?? null, formDataManager, screenDefinition.opts)

//     if (!ctxQuickQuote?.state) {
//         return <LoadingSection />
//     }

//     const nextScreen = screenDefinition.sidnext
//     const nextUrl = QuoteScreenIdToUrl[nextScreen]

//     return <>
//         <div className="screen">
//             <TxtTitlePage txt="Choose your excess" />
//             <InfoBlockComponent info="Excess is the total amount you pay towards your claim before we cover the remaining cost. it’s the sum total of compulsory excess (set by us) and voluntary excess (set by you)." />
//             <ExcessesComponent
//                 policySelected={ policySelected }
//                 buildingsOpt={ screenDefinition.opts[0] }
//                 contentsOpt={ screenDefinition.opts[1] }
//                 onExcessChange={ (d: ExcessOptData[]) => {

//                     const building = d.find(item => item.subsection === 'buildings_coverage')
//                     const contents = d.find(item => item.subsection === 'contents_coverage')

//                     setBuildingExcess(Number(building?.val) ?? 0)
//                     setContentsExcess(Number(contents?.val) ?? 0)

//                     formDataManager.saveScreenData(d, true)

//                     // setRefresh(refresh + 1)
//                 }}
//                 buildingExcess={ buildingExcess }
//                 contentsExcess={ contentsExcess }
//             />
//         </div>
//         <ScreenFooterComponent
//             screenDefinition={screenDefinition}
//             screenValid={true}
//             mode={FooterMode.FIXED}
//             noRouting={true}
//             onNext={() => {
//                 // @ts-ignore
//                 setRefining()
//             }}
//             quoteData={{
//                 price: offer ? offer.formattedPremium() : null,
//                 title: offer ? offer.title() : ''
//             }}
//         />
//     </>
// }