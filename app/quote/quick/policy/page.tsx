'use client'


import { AppHeaderComponent } from "@/components/quote/widgets/header"

import { QuoteScreenStartComponent } from "@/components/quote/screens/quick/quoteScreenPolicy"

import { QuoteScreen, QuoteScreenId, StaticQuoteJourneyDefinition } from "@/src/stores/staticQuoteJourneyDefinition"

import { ScreenMode } from "@/src/types"

import { useProducts } from "@/src/hooks/useProducts"
import { useMetadata } from "@/src/hooks/useMetadata"
import { useLocalStorage } from "@/src/hooks/useLocalStorage"
import { ScreenContainerComponent } from "@/components/quote/widgets/screenContainer"
import Image from "next/image"
import { useContext } from "react"
import { QQResponseStateContext } from "@/src/stores/contexts/quickQuoteStateContext"
import { useQuoteRetrieval } from "@/src/hooks/useQuoteRetrieval"
import { DesktopSidebar } from "@/components/quote/widgets/desktopSidebar"

const QuickQuotePolicyPage = () => {

  useLocalStorage()
  useMetadata()
  useProducts()

  const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.QUICK_QUOTE_POLICY) as QuoteScreen


  const qqCtx = useContext(QQResponseStateContext)

  useQuoteRetrieval({ state: qqCtx?.state ?? null, dispatch: qqCtx?.dispatch ?? null })


  return <>
    <ScreenContainerComponent>
      <div className="screen-inner-container">
        <QuoteScreenStartComponent
          screenDefinition={screenDefinition}
          mode={ScreenMode.NORMAL}
        />
      </div>

    </ScreenContainerComponent>
  </>
}

export default QuickQuotePolicyPage