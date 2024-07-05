'use client'

import { ProgressBarComponent } from "@/components/quote/widgets/progress"
import { QuoteScreen, QuoteScreenId, StaticQuoteJourneyDefinition } from "@/src/stores/staticQuoteJourneyDefinition"
import { ScreenMode } from "@/src/types"
import { useLocalStorage } from "@/src/hooks/useLocalStorage"
import { useMetadata } from "@/src/hooks/useMetadata"
import { QuoteScreenCoverStartDateComponent } from "@/components/quote/screens/quick/quoteScreenStartDate"
import { ScreenContainerComponent } from "@/components/quote/widgets/screenContainer"

const QuotePageStartDateComponent = () => {

  useLocalStorage()
  useMetadata()

  const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.QUICK_QUOTE_STARTDATE) as QuoteScreen

  return <>
    <ScreenContainerComponent>
    <ProgressBarComponent
      label="3/3"
      val={100}
    />
      <div className="screen-inner-container">
        <QuoteScreenCoverStartDateComponent
          screenDefinition={screenDefinition}
          mode={ScreenMode.NORMAL}
        />
      </div>
    </ScreenContainerComponent>
  </>
}

export default QuotePageStartDateComponent