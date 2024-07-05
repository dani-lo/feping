'use client'
import { QuoteScreen } from "@/src/stores/staticQuoteJourneyDefinition"

import { ScreenFooterComponent } from "@/components/quote/widgets/screenFooter"
import { ReviewAccordionComponent } from "@/components/quote/widgets/reviewAccordion"
import { InfoBlockComponent } from "@/components/quote/widgets/infoBlock"
import { TxtTitlePage, TxtTitleSub } from "@/components/util/txt"

export const QuoteScreenReviewComponent = ({ screenDefinition }: { screenDefinition: QuoteScreen }) => {

    const nextScreen = screenDefinition.sidnext

    if (!nextScreen || !screenDefinition.screensresume) {
        return null
    }

    return <>
        <div className="screen screen-review">
            <TxtTitlePage
                txt="Check your details."
            />
            <TxtTitleSub
                txt="Let's make sure we've got it right."
            />
            <div className="gray-container">
                <ReviewAccordionComponent
                    reviewscreens={ screenDefinition.screensresume }
                />
            </div>
             <InfoBlockComponent
                info="By sharing your details, you give us permission to get information about your property and claims history from third party providers. We'll use this data for your quote only."
            />
        </div>
        <div className="screen-footer no-cancel">
            <ScreenFooterComponent
                screenDefinition={ screenDefinition }
                screenValid={ true }
                onNext={ () => void 0 }
            />
        </div>
    </>
}