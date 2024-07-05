'use client'

import { useState, useContext, useEffect } from "react"
import { useRouter } from "next/navigation"

import { StepsOrchestratorComponent } from "@/components/quote/orchestrators/stepsOrchestrator"

import { AppHeaderComponent } from "@/components/quote/widgets/header"
import { NumberedListComponent } from "@/components/quote/widgets/numberedList"
import { FooterMode, ScreenFooterComponent } from "@/components/quote/widgets/screenFooter"
import { LoadingSection } from "@/components/quote/widgets/loadingSection"

import { QuoteScreen, QuoteScreenId, QuoteScreenIdToUrl, StaticQuoteJourneyDefinition } from "@/src/stores/staticQuoteJourneyDefinition"
import { QQResponseStateContext } from '@/src/stores/contexts/quickQuoteStateContext'

import { useQuoteRetrieval } from "@/src/hooks/useQuoteRetrieval"
import { useQuoteRefinement } from "@/src/hooks/useQuoteRefinement"

import { refinePersonsPatchDoc } from "@/src/api/patchers/persons"
import { useProducts } from "@/src/hooks/useProducts"
// import { useQuotePremiumBoost } from "@/src/hooks/useQuotePremiumBoost"
import { PolicyType, currentPolicy } from "@/src/models/policy"
import CheckmarkFeature from "@/components/quote/widgets/checkmarkFeature"
import { useMetadata } from "@/src/hooks/useMetadata"
import { MetadataStateContext } from "@/src/stores/contexts/metadataStateContext"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
import { useLocalStorage } from "@/src/hooks/useLocalStorage"
import { currentOfferByProduct } from "@/src/models/offer"
import { QuotePremiumComponent } from "@/components/quote/widgets/quotePremium"
import { ScreenContainerComponent } from "@/components/quote/widgets/screenContainer"
import { DesktopSidebar } from "@/components/quote/widgets/desktopSidebar"

const QuoteRefinePersonsPage = () => {

    useLocalStorage()
    useMetadata()
    
    const products = useProducts()

    const [valid, setValid] = useState(false)
    const router = useRouter()

    // const metadataCtx = useContext(MetadataStateContext)
    const ctxQuickQuote = useContext(QQResponseStateContext)
    const localCtx = useContext(LocalStateContext)

    // const products = metadataCtx?.state?.products

    useQuoteRetrieval({ state: ctxQuickQuote?.state ?? null, dispatch: ctxQuickQuote?.dispatch ?? null })

    const offer = ctxQuickQuote?.state && products ? currentOfferByProduct(ctxQuickQuote?.state, products) : null
    // const boostedVal = useQuotePremiumBoost(offer?.premium ?? 0)

    const [refined, refining, setRefining] = useQuoteRefinement({
        quoteState: ctxQuickQuote?.state ?? null,
        quoteDispatch: ctxQuickQuote?.dispatch ?? null,
        localState: localCtx?.state ?? null,
        localDispatch: localCtx?.dispatch ?? null,
        patchFn: refinePersonsPatchDoc,
        testing: true
    })

    const policySelected = currentPolicy(ctxQuickQuote?.state ?? null, null)

    useEffect(() => {

        if (refined) {

            const nextScreen = policySelected === PolicyType.CONTENTS ? QuoteScreenId.REFINE_QUOTE_CONTENTS : screenDefinition.sidnext
            // @ts-ignore
            const nextUrl = QuoteScreenIdToUrl[nextScreen]

            router.push(nextUrl)
        }
    }, [refined])

    const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.REFINE_QUOTE_PERSONS) as QuoteScreen

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
                                    {
                                        title: 'You and people who live with you.',
                                        text: null
                                    }
                                ]}
                            />
                            <StepsOrchestratorComponent
                                steps={screenDefinition.steps ?? []}
                                onScreenValid={() => setValid(true)}
                                onScreenUnvalid={() => setValid(false)}
                                txtNext="Next, confirm the details we have about your home."
                            />
                        </div>
                        {
                        valid ?
                            <div className="screen-footer no-cancel">
                                <ScreenFooterComponent
                                    screenDefinition={ screenDefinition }
                                    screenValid={ valid }
                                    noRouting={ true }
                                    onNext={ () => {
                                        // @ts-ignore
                                        setRefining()
                                    }}
                                    sidNextOverride={ policySelected === PolicyType.CONTENTS ? QuoteScreenId.REFINE_QUOTE_CONTENTS : undefined }
                                    textnextOverride={ policySelected === PolicyType.CONTENTS ? 'Add contents'  : undefined  }
                                />
                                { 
                                    offer && localCtx?.state ? 
                                        <QuotePremiumComponent 
                                            offer={ offer } 
                                            localState={ localCtx.state }
                                        /> : 
                                        null 
                                }
                            </div>: null
                        }
                    </> : <LoadingSection />
                }
            </div>
        </ScreenContainerComponent>
    </>
}

export default QuoteRefinePersonsPage


