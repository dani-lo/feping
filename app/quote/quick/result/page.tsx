'use client'

import { useEffect, useState, useContext } from "react"
import { useAtom } from "jotai"

import { QuoteScreenResultLoadingComponent } from "@/components/quote/screens/quick/quoteScreenResultLoading"
import { QuoteScreenResultLoadedComponent } from "@/components/quote/screens/quick/quoteScreenResultLoaded"

import { AppHeaderComponent } from "@/components/quote/widgets/header"

import { fetchQuickQuote } from "@/src/api/quote"

import { QuoteScreen, QuoteScreenId, StaticQuoteJourneyDefinition } from "@/src/stores/staticQuoteJourneyDefinition"
import { QQResponseStateContext, QuoteState } from '@/src/stores/contexts/quickQuoteStateContext'

import { UmbrlError } from "@/src/types"
import { useProducts } from "@/src/hooks/useProducts"
import { useError } from "@/src/hooks/useError"
import { LoadingSection } from "@/components/quote/widgets/loadingSection"
import { useQuoteRetrieval } from "@/src/hooks/useQuoteRetrieval"
import { useMetadata } from "@/src/hooks/useMetadata"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
import { UmbrlForm } from "@/src/models/form"
import { useLocalStorage } from "@/src/hooks/useLocalStorage"

const QuickQuoteResultPage = () => {

    useLocalStorage()
    useMetadata()
    useProducts()

    const [loaded, setLoadaed] = useState(false)

    const ctxQuickQuote = useContext(QQResponseStateContext)
    const localCtx = useContext(LocalStateContext)

    useQuoteRetrieval({ state: ctxQuickQuote?.state ?? null, dispatch: ctxQuickQuote?.dispatch ?? null })

    const [err, setErr] = useError()

    useEffect(() => {

        const to = setTimeout(async () => {

            const d = await fetchQuickQuote()

            if (d.error) {

                const umbrlError = d as UmbrlError

                //@ts-ignore
                setErr(umbrlError.message)
            } else {

                const quoteState = d as QuoteState

                ctxQuickQuote?.dispatch({ type: "SET_QQ_RESPONSE", payload: quoteState })

                const quoteUid = quoteState.uuid

                if (typeof quoteUid === 'string' && localCtx?.dispatch) {
                    UmbrlForm.manualSave(localCtx?.dispatch, 'quote', null, 'uuid', quoteUid)
                }

                setLoadaed(true)
            }
        }, 100)

        return () => to && clearTimeout(to)
    }, [])

    const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.QUICK_QUOTE_RESULT) as QuoteScreen

    return <>
        {/* <AppHeaderComponent logoTxt="mini" /> */}
        <div className="screen-inner-container noSidebar">
            {
                loaded ?
                    <QuoteScreenResultLoadedComponent screenDefinition={screenDefinition} /> :
                    <LoadingSection notitle={true} />

            }
        </div>
    </>
}

export default QuickQuoteResultPage
