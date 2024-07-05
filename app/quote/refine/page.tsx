'use client'
import { useContext } from 'react'
import { QQResponseStateContext } from '@/src/stores/contexts/quickQuoteStateContext'
import { MetadataStateContext } from '@/src/stores/contexts/metadataStateContext'

import { AppHeaderComponent } from "@/components/quote/widgets/header"
import { NumberedListComponent } from "@/components/quote/widgets/numberedList"
import { FooterMode, ScreenFooterComponent } from "@/components/quote/widgets/screenFooter"
import { QuoteScreen, QuoteScreenId, StaticQuoteJourneyDefinition } from "@/src/stores/staticQuoteJourneyDefinition"
import { twParagraph, twTitleMain, twTitleSub } from "@/src/styles/text.tailwind"
import { InfoBlockComponent } from '@/components/quote/widgets/infoBlock'
import { TxtTitleList, TxtTitlePage, TxtTitleSub } from '@/components/util/txt'
import { currentOfferByProduct } from '@/src/models/offer'

// import { useQuotePremiumBoost } from '@/src/hooks/useQuotePremiumBoost'
import { useProducts } from '@/src/hooks/useProducts'
import { useQuoteRetrieval } from '@/src/hooks/useQuoteRetrieval'
import { useMetadata } from '@/src/hooks/useMetadata'
import { useLocalStorage } from '@/src/hooks/useLocalStorage'
import { PolicyType, currentPolicy } from '@/src/models/policy'
import { QuotePremiumComponent } from '@/components/quote/widgets/quotePremium'
import { LocalStateContext } from '@/src/stores/contexts/localStateContext'

const QuoteRefineAddonsPage = () => {

    useLocalStorage()
    useMetadata()
    
    const products = useProducts()

    const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.REFINE_QUOTE_LANDING) as QuoteScreen

    const ctxQuickQuote = useContext(QQResponseStateContext)
    const ctxLocal = useContext(LocalStateContext)

    useQuoteRetrieval({ state: ctxQuickQuote?.state ?? null, dispatch: ctxQuickQuote?.dispatch ?? null })

    const offer = ctxQuickQuote?.state && products ? currentOfferByProduct(ctxQuickQuote?.state, products) : null

    const policySelected = currentPolicy(ctxQuickQuote?.state ?? null, null)

    const textItems = [
        {
            title: 'You and people who live with you',
            text: 'Confirm information about you, and other people who live in the same home.'
        }
    ]

    if (policySelected && [PolicyType.BUILDINGS, PolicyType.BUILDINGS_CONTENTS].includes(policySelected)) {
        textItems.push({
            title: 'Your home',
            text: 'Make sure the details about the property are right.'
        })
    }

    if (policySelected && [PolicyType.CONTENTS, PolicyType.BUILDINGS_CONTENTS].includes(policySelected)) {
        textItems.push({
            title: 'Contents cover',
            text: 'Add personal possessions, bikes and everything else you want to cover.'
        })
    }

    return <div className="refine-home">
        {/* <AppHeaderComponent logoTxt="mini" /> */}
        <div className="screen-inner-container noSidebar">
            <div className="screen screen-with-price">
                <TxtTitlePage txt="Let&apos;s confirm a few things"  />
                <InfoBlockComponent
                    info="We've based your quote on data from third-party providers. So make sure the information we have is right."
                />
                <div className="block-generic">
                    <NumberedListComponent
                        textItems={textItems}
                    />
                </div>
                <div className="payoff-widget">
                    <i className="fa fa-clock-o" />
                    <TxtTitleSub txt="Ready? It won't take long." />
                </div>
                
            </div>
            <div className="screen-footer no-cancel">
                <ScreenFooterComponent
                    screenDefinition={ screenDefinition }
                    screenValid={ true }
                    onNext={ () => {void 0} }
                />
                { 
                    offer && ctxLocal?.state ? 
                        <QuotePremiumComponent 
                            offer={ offer } 
                            localState={ ctxLocal.state }
                        /> : 
                        null 
                }
            </div>
        </div>
    </div>
}

export default QuoteRefineAddonsPage


