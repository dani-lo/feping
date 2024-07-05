'use client'


import { ProgressBarComponent } from "@/components/quote/widgets/progress"
import { QuoteScreenPropertyComponent } from "@/components/quote/screens/quick/quoteScreenProperty"
import { QuoteScreen, QuoteScreenId, StaticQuoteJourneyDefinition } from "@/src/stores/staticQuoteJourneyDefinition"
import { ScreenMode } from "@/src/types"
import { useProducts } from "@/src/hooks/useProducts"
import { useMetadata } from "@/src/hooks/useMetadata"
import { useLocalStorage } from "@/src/hooks/useLocalStorage"
import { ScreenContainerComponent } from "@/components/quote/widgets/screenContainer"


const QuickQuotePropertyPage = () => {

  useLocalStorage()
  useMetadata()
  useProducts()

  const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.QUICK_QUOTE_PROPERTY) as QuoteScreen

  return <>
    <ScreenContainerComponent>
    <ProgressBarComponent
      label="2/3"
      val={66}
    />
      <div className="screen-inner-container">
        <QuoteScreenPropertyComponent
          screenDefinition={screenDefinition}
          mode={ScreenMode.NORMAL}
        />
      </div>
    </ScreenContainerComponent>
  </>
}

export default QuickQuotePropertyPage