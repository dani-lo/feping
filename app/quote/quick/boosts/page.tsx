'use client'

import { useContext } from "react"



import { QuoteScreen, QuoteScreenId, StaticQuoteJourneyDefinition } from "@/src/stores/staticQuoteJourneyDefinition"
import { QQResponseStateContext } from '@/src/stores/contexts/quickQuoteStateContext'

import { useProducts } from "@/src/hooks/useProducts"
import { useQuoteRetrieval } from "@/src/hooks/useQuoteRetrieval"
import { useMetadata } from "@/src/hooks/useMetadata"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
import { useLocalStorage } from "@/src/hooks/useLocalStorage"
import { QuoteScreenBoostsComponent } from "@/components/quote/screens/quick/quoteScreenBoosts"
import { ScreenContainerComponent } from "@/components/quote/widgets/screenContainer"

const QuickQuoteBoostsPage = () => {

  useLocalStorage()
  useMetadata()
  useProducts()


  const ctxQuickQuote = useContext(QQResponseStateContext)
  const localCtx = useContext(LocalStateContext)

  useQuoteRetrieval({
    state: ctxQuickQuote?.state ?? null,
    dispatch: ctxQuickQuote?.dispatch ?? null
  })

  const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.QUICK_QUOTE_BOOSTS) as QuoteScreen


  if (!ctxQuickQuote?.state || !localCtx?.state) {
    return null
  }

  return <>
    <ScreenContainerComponent>
      <div className="screen-inner-container noSidebar">
        <QuoteScreenBoostsComponent screenDefinition={screenDefinition} />
      </div>
    </ScreenContainerComponent>
  </>
}

export default QuickQuoteBoostsPage
