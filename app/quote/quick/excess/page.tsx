'use client'

import { AppHeaderComponent } from "@/components/quote/widgets/header"
import { QuoteScreen, QuoteScreenId, StaticQuoteJourneyDefinition } from "@/src/stores/staticQuoteJourneyDefinition"
import { ScreenMode } from "@/src/types"
// import { QuoteScreenExcessComponent } from "@/components/quote/screens/quick/quoteScreenExcess"

import { useProducts } from "@/src/hooks/useProducts"
import { useMetadata } from "@/src/hooks/useMetadata"
import { useLocalStorage } from "@/src/hooks/useLocalStorage"
import { ScreenContainerComponent } from "@/components/quote/widgets/screenContainer"

const QuptePagePersonalComponent = () => {

  useLocalStorage()
  useMetadata()
  useProducts()

  const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.QUOTE_CHOOSE_EXCESS) as QuoteScreen

  return <>
    <AppHeaderComponent logoTxt="mini" />

    <ScreenContainerComponent>
      {/* <QuoteScreenExcessComponent
        screenDefinition={ screenDefinition }
        mode={ ScreenMode.NORMAL }
      /> */}
      <p>child me</p>
    </ScreenContainerComponent>
  </>
}

export default QuptePagePersonalComponent