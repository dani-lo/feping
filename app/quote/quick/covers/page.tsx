'use client'

import { AppHeaderComponent } from "@/components/quote/widgets/header"

import { QuoteScreen, QuoteScreenId, StaticQuoteJourneyDefinition } from "@/src/stores/staticQuoteJourneyDefinition"

import { ScreenMode } from "@/src/types"

import { QuoteScreenCoversComponent } from "@/components/quote/screens/quick/quoteScreenCovers"

import { useLocalStorage } from "@/src/hooks/useLocalStorage"
import { useMetadata } from "@/src/hooks/useMetadata"
import { useProducts } from "@/src/hooks/useProducts"
import { ScreenContainerComponent } from "@/components/quote/widgets/screenContainer"
import { useQuoteRetrieval } from "@/src/hooks/useQuoteRetrieval"
import { useContext } from "react"
import { QQResponseStateContext } from "@/src/stores/contexts/quickQuoteStateContext"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"

const QuptePagePersonalComponent = () => {

  useLocalStorage()
  useMetadata()
  useProducts()

  const ctxQuickQuote = useContext(QQResponseStateContext)
  const localCtx = useContext(LocalStateContext)

  const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.QUICK_QUOTE_COVERS) as QuoteScreen

  useQuoteRetrieval({ state: ctxQuickQuote?.state ?? null, dispatch: ctxQuickQuote?.dispatch ?? null })


  if (!ctxQuickQuote?.state || !localCtx?.state) {
    return null
  }

  return <>
    <ScreenContainerComponent>
      <div className="screen-inner-container">
        <QuoteScreenCoversComponent
          screenDefinition={screenDefinition}
          mode={ScreenMode.NORMAL}
        />
      </div>
    </ScreenContainerComponent>

  </>
}

export default QuptePagePersonalComponent