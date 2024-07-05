'use client'

import { ProgressBarComponent } from "@/components/quote/widgets/progress"
import { QuoteScreenPersonalComponent } from "@/components/quote/screens/quick/quoteScreenPersonal"
import { QuoteScreen, QuoteScreenId, StaticQuoteJourneyDefinition } from "@/src/stores/staticQuoteJourneyDefinition"
import { ScreenMode } from "@/src/types"
import { useLocalStorage } from "@/src/hooks/useLocalStorage"
import { useMetadata } from "@/src/hooks/useMetadata"
import { useProducts } from "@/src/hooks/useProducts"
import { ScreenContainerComponent } from "@/components/quote/widgets/screenContainer"

const QuptePagePersonalComponent = () => {

  useLocalStorage()
  useMetadata()
  useProducts()

  // const ctxLocal = useContext(LocalStateContext)

  const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.QUICK_QUOTE_PERSONAL) as QuoteScreen

  // if (!ctxLocal?.state) {
  //   return null
  // }

  return <>
    <ScreenContainerComponent>
    <ProgressBarComponent
      label="1/3"
      val={33}
    />
      <div className="screen-inner-container">

        <QuoteScreenPersonalComponent
          screenDefinition={screenDefinition}
          mode={ScreenMode.NORMAL}
        />
      </div>
    </ScreenContainerComponent>
  </>
}

export default QuptePagePersonalComponent