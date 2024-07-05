'use client'

import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { StepsOrchestratorComponent } from "@/components/quote/orchestrators/stepsOrchestrator"
import { AppHeaderComponent } from "@/components/quote/widgets/header"
import { LoadingSection } from "@/components/quote/widgets/loadingSection"
import { NumberedListComponent } from "@/components/quote/widgets/numberedList"
import { FooterMode, ScreenFooterComponent } from "@/components/quote/widgets/screenFooter"

import { QQResponseStateContext } from "@/src/stores/contexts/quickQuoteStateContext"
import { QuoteScreen, QuoteScreenId, QuoteScreenIdToUrl, StaticQuoteJourneyDefinition } from "@/src/stores/staticQuoteJourneyDefinition"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"

import { useLocalStorage } from "@/src/hooks/useLocalStorage"
import { useQuoteRefinement } from "@/src/hooks/useQuoteRefinement"
import { useProducts } from "@/src/hooks/useProducts"
import { useMetadata } from "@/src/hooks/useMetadata"
import { useQuoteRetrieval } from "@/src/hooks/useQuoteRetrieval"

import { refineBuildingsPatchDoc } from "@/src/api/patchers/building"

import { PolicyType, currentPolicy } from "@/src/models/policy"
import { currentOfferByProduct } from "@/src/models/offer"
import { QuotePremiumComponent } from "@/components/quote/widgets/quotePremium"
import { DesktopSidebar } from "@/components/quote/widgets/desktopSidebar"
import { ScreenContainerComponent } from "@/components/quote/widgets/screenContainer"

const QuoteRefineBuildingPage = () => {

    useLocalStorage()
    useMetadata()
    
    const router = useRouter()
    const products = useProducts()

    const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.REFINE_QUOTE_BUILDING) as QuoteScreen

    const ctxQuickQuote = useContext(QQResponseStateContext)
    const localCtx = useContext(LocalStateContext)

    const [valid, setValid] = useState(false)
    
    useQuoteRetrieval({ state: ctxQuickQuote?.state ?? null, dispatch: ctxQuickQuote?.dispatch ?? null })

    const [refined, refining, setRefining] = useQuoteRefinement({
        quoteState: ctxQuickQuote?.state ?? null,
        quoteDispatch: ctxQuickQuote?.dispatch ?? null,
        localState: localCtx?.state ?? null,
        localDispatch: localCtx?.dispatch ?? null,
        patchFn: refineBuildingsPatchDoc,
        testing: true
    })

    useEffect(() => {

        if (refined) {

            const nextScreen = policySelected === PolicyType.BUILDINGS ? QuoteScreenId.CHOOSE_POLICY : screenDefinition.sidnext
            // @ts-ignore
            const nextUrl = QuoteScreenIdToUrl[nextScreen]

            router.push(nextUrl)
        }
    }, [refined])

    const offer = ctxQuickQuote?.state  && products ? currentOfferByProduct(ctxQuickQuote?.state, products) : null
    const policySelected = currentPolicy(ctxQuickQuote?.state ?? null, null)

    if (!ctxQuickQuote?.state || !localCtx?.state) {
        return null
    }

    return <>
        <ScreenContainerComponent>
            <div className="screen-inner-container refine">
                {
                    ctxQuickQuote?.state != null ? <>
                        <div className="screen screen-with-price">
                            <NumberedListComponent
                                role="as-title"
                                textItems={[
                                    null,
                                    {
                                        title: 'Check the information about your home',
                                        text: null
                                    }
                                ]}
                            />
                            <StepsOrchestratorComponent
                                steps={screenDefinition.steps ?? []}
                                onScreenValid={() => setValid(true)}
                                onScreenUnvalid={() => setValid(false)}
                                txtNext="Next, add your contents."
                            />

                        </div>
                        {
                        valid ?
                                <div className="screen-footer no-cancel">
                                    <ScreenFooterComponent
                                        screenDefinition={screenDefinition}
                                        screenValid={valid}
                                        noRouting={true}
                                        onNext={() => {
                                            // @ts-ignore
                                            setRefining()
                                        }}
                                        sidNextOverride={ policySelected === PolicyType.BUILDINGS ? QuoteScreenId.CHOOSE_POLICY : undefined }
                                        textnextOverride={ policySelected === PolicyType.BUILDINGS ? 'Review your policy'  : undefined  }
                                    />
                                    { 
                                        offer && localCtx?.state ? 
                                            <QuotePremiumComponent 
                                                offer={ offer } 
                                                localState={ localCtx.state }
                                            /> : 
                                            null 
                                    }
                                </div>
                                : null
                        }     
                    </> : <LoadingSection />
                }
            </div>
        </ScreenContainerComponent>
    </>
}

export default QuoteRefineBuildingPage


