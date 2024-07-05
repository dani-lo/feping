'use client'

import { ScreenContainerComponent } from "@/components/quote/widgets/screenContainer"
import { FooterMode, ScreenFooterComponent } from "@/components/quote/widgets/screenFooter"
import { useLocalStorage } from "@/src/hooks/useLocalStorage"
import { useMetadata } from "@/src/hooks/useMetadata"
import { useProducts } from "@/src/hooks/useProducts"
import { QuoteScreen, QuoteScreenId, StaticQuoteJourneyDefinition } from "@/src/stores/staticQuoteJourneyDefinition"
import { ScreenMode } from "@/src/types"
import { PolicyFeaturesComponent } from "@/components/quote/screens/policyFeatures"


const QuoteChoosePolicyPage = () => {

    const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.REFINE_QUOTE_BUILDING) as QuoteScreen

    useLocalStorage()
    useMetadata()
    useProducts()

    return <>
        <ScreenContainerComponent>
            <div className="screen">
                <div className="screen-inner-container">
                    <PolicyFeaturesComponent
                        screenDefinition={screenDefinition}
                        mode={ScreenMode.NORMAL}
                    />
                </div>
                <div className="screen-footer no-cancel">
                    <ScreenFooterComponent
                        screenDefinition={ screenDefinition }
                        screenValid={ true }
                        onNext={ () => void 0 }
                    />
                </div>
            </div>
        </ScreenContainerComponent>

    </>
}

export default QuoteChoosePolicyPage