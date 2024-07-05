'use client'

import { QuoteScreenReviewComponent } from "@/components/quote/screens/quick/quoteScreenReview"
import { AppHeaderComponent } from "@/components/quote/widgets/header"
import { ScreenContainerComponent } from "@/components/quote/widgets/screenContainer"
import { SidebarComponent } from "@/components/util/sidebar"

import { useLocalStorage } from "@/src/hooks/useLocalStorage"
import { useMetadata } from "@/src/hooks/useMetadata"
import { useProducts } from "@/src/hooks/useProducts"

import {
  QuoteScreen,
  QuoteScreenId,
  StaticQuoteJourneyDefinition
} from '@/src/stores/staticQuoteJourneyDefinition'

const QuickQuoteReviewPage = () => {

  useLocalStorage()
  useMetadata()

  const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.QUICK_QUOTE_REVIEW) as QuoteScreen

  return <>
    <ScreenContainerComponent>
      <div className="screen-inner-container noSidebar">
        <QuoteScreenReviewComponent
          screenDefinition={screenDefinition}
        />
      </div>
    </ScreenContainerComponent>
  </>
}

export default QuickQuoteReviewPage