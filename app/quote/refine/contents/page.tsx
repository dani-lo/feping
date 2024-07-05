'use client'

import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { StepsOrchestratorComponent } from "@/components/quote/orchestrators/stepsOrchestrator"

import { AppHeaderComponent } from "@/components/quote/widgets/header"
import { LoadingSection } from "@/components/quote/widgets/loadingSection"
import { NumberedListComponent } from "@/components/quote/widgets/numberedList"
import { FooterMode, ScreenFooterComponent } from "@/components/quote/widgets/screenFooter"

import { useQuoteRetrieval } from "@/src/hooks/useQuoteRetrieval"
import { useQuoteRefinement } from "@/src/hooks/useQuoteRefinement"

import { QQResponseStateContext } from "@/src/stores/contexts/quickQuoteStateContext"
import {
    QuoteScreen,
    QuoteScreenId,
    QuoteScreenIdToUrl,
    StaticQuoteJourneyDefinition
} from "@/src/stores/staticQuoteJourneyDefinition"

import { refineContentsPatchDoc } from "@/src/api/patchers/contents"
import { useProducts } from "@/src/hooks/useProducts"
// import { useQuotePremiumBoost } from "@/src/hooks/useQuotePremiumBoost"
import { PolicyType, currentPolicy } from "@/src/models/policy"
import { formatCurrency } from "@/src/util/currency"
import { TxtListItem, TxtPara, TxtTitleSection, TxtTitleSub } from "@/components/util/txt"
import { useUat } from "@/src/hooks/useUat"
import { useAtom } from "jotai"
import { uiStateAboutModal, uiStateRefreshAtom } from "@/src/stores/jotai/uiState"
import { useMetadata } from "@/src/hooks/useMetadata"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
import { useLocalStorage } from "@/src/hooks/useLocalStorage"
import { ExpandableSection } from "@/components/quote/widgets/expandableSection"
import { InfoBlockComponent } from "@/components/quote/widgets/infoBlock"
import CheckmarkFeature from "@/components/quote/widgets/checkmarkFeature"
import { currentOfferByProduct } from "@/src/models/offer"
import { QuotePremiumComponent } from "@/components/quote/widgets/quotePremium"
import { DesktopSidebar } from "@/components/quote/widgets/desktopSidebar"
import { ScreenContainerComponent } from "@/components/quote/widgets/screenContainer"
import { BtnComponentB, UmbrlButton } from "@/components/libForm/btn"

const QuoteRefineContentsPage = () => {

    useLocalStorage()
    useMetadata()

    const products = useProducts()

    const [_a, setAboutModal] = useAtom(uiStateAboutModal)

    const [hasitems, setHasitems] = useState<boolean | null>(null)

    const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.REFINE_QUOTE_CONTENTS) as QuoteScreen

    const [valid, setValid] = useState(false)
    const router = useRouter()

    const localCtx = useContext(LocalStateContext)

    // const metadataCtx = useContext(MetadataStateContext)
    const ctxQuickQuote = useContext(QQResponseStateContext)

    // const products = metadataCtx?.state?.products

    useQuoteRetrieval({ state: ctxQuickQuote?.state ?? null, dispatch: ctxQuickQuote?.dispatch ?? null })

    const offer = ctxQuickQuote?.state && products ? currentOfferByProduct(ctxQuickQuote?.state, products) : null
    // const boostedVal = useQuotePremiumBoost(offer?.premium ?? 0)

    const [refined, setRefining] = useQuoteRefinement({
        quoteState: ctxQuickQuote?.state ?? null,
        quoteDispatch: ctxQuickQuote?.dispatch ?? null,
        localState: localCtx?.state ?? null,
        localDispatch: localCtx?.dispatch ?? null,
        patchFn: refineContentsPatchDoc,
        testing: true
    })

    useEffect(() => {

        if (refined) {
            const nextScreen = screenDefinition.sidnext
            // @ts-ignore
            const nextUrl = QuoteScreenIdToUrl[nextScreen]

            router.push(nextUrl)
        }
    }, [refined])
    
    const policySelected = currentPolicy(ctxQuickQuote?.state ?? null, null)

    const txtNumberedItems = [null]

    if (policySelected !== PolicyType.CONTENTS) {
        txtNumberedItems.push(null)
    }

    // @ts-ignore
    txtNumberedItems.push({
        title: 'Insure your contents',
        text: null
    })

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
                                textItems={txtNumberedItems}
                            />
                            {/* <div className="block-bg">
                                <ExpandableSection
                                    aria_label="Included in your umbrl flex"
                                    title="Included in your umbrl flex"
                                    subtitle={null}
                                    body={[]}
                                >
                                    <ul className="list-check">
                                        <TxtListItem txt={`Up to  ${formatCurrency(ctVal ?? 0)}  contents cover`} icon="fa fa-check-circle" />
                                        <TxtListItem txt={`Up to ${formatCurrency(currCoverages.highRiskItems)} high-risk items cover`} icon="fa fa-check-circle" />
                                        <TxtListItem txt={`Up to  ${formatCurrency(currCoverages.personalPossessions ?? 0)}  personal possessions cover`} icon="fa fa-check-circle" />
                                    </ul>
                                </ExpandableSection>
                            </div> */}
                            <div>
                                <div className="pill-widget quote-offer-widget">
                                    <div className="flex-offer">
                                        <TxtTitleSection txt="Included in your umbrl flex" />
                                    </div>
                                    <div className="content-coverage-list">
                                        <ul className="list-check">
                                            <TxtListItem txt={`Up to  ${formatCurrency(offer?.product.getBuildingsSumInsured() ?? 0)}  contents cover`} icon="fa fa-check-circle" />
                                            <TxtListItem txt={`Up to ${formatCurrency(offer?.product.getContentsSumInsured() ?? 0)} high-risk items cover`} icon="fa fa-check-circle" />
                                            <TxtListItem txt={`Up to  ${formatCurrency(offer?.product.getHighRiskItemsSumInsured() ?? 0)}  personal possessions cover`} icon="fa fa-check-circle" />
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="fxrow mt-4">
                                <TxtTitleSub
                                    txt="Your high risk items"
                                />
                                <div onClick={() => setAboutModal('SPECIFIED_HIGH_RISK_ITEMS')} className="pill-icon">
                                    <i className="question-icon fa fa-question" />
                                </div>
                            </div>
                            
                            {
                                hasitems === null ? 
                                <div>
                                    <TxtPara
                                        txt={ `Do you own any high-risk items worth more than _#£1,500_ or bikes over _#£350_?`}
                                    />
                                    <div className="step-footer">
                                        <BtnComponentB
                                            type={ UmbrlButton.GENERIC }
                                            onClick={ () => {
                                                setHasitems(true)
                                            } }
                                            label="Yes"
                                        />
                                        <BtnComponentB
                                            type={ UmbrlButton.GENERIC }
                                            onClick={ () => {
                                                setHasitems(false)
                                            } }
                                            label="No"
                                        />
                                    </div>
                                </div>
                                : null
                            }
                            
                        {
                            hasitems === true ?
                            <StepsOrchestratorComponent
                                steps={screenDefinition.steps ?? []}
                                onScreenValid={() => setValid(true)}
                                onScreenUnvalid={() => setValid(false)}
                                txtNext="Next, review your policy and proceed to payment."
                            />:
                            <InfoBlockComponent
                                info={`Not declaring your high-risk items over ${formatCurrency(1500)} and bicycles over ${formatCurrency(350)} will impact settlement of all your contents claims.`}
                            />
                        }
                            
                            
                        </div>
                        {
                        valid ?
                            <div className="screen-footer no-cancel">
                                <ScreenFooterComponent
                                    screenDefinition={ screenDefinition }
                                    screenValid={ valid }
                                    noRouting={ true }
                                    onNext={ () => {
                                        typeof setRefining !== 'boolean' && setRefining()
                                    }}
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

export default QuoteRefineContentsPage


