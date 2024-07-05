'use client'

import { useEffect, useContext } from "react"

import { QuoteScreenResultLoadingComponent } from "@/components/quote/screens/quick/quoteScreenResultLoading"

import { fetchPreQuickQuote } from "@/src/api/quote"

import { QuoteScreen, QuoteScreenId, QuoteScreenIdToUrl, StaticQuoteJourneyDefinition } from "@/src/stores/staticQuoteJourneyDefinition"
import { QQResponseStateContext, QuoteState } from '@/src/stores/contexts/quickQuoteStateContext'

import { useProducts } from "@/src/hooks/useProducts"
import { useError } from "@/src/hooks/useError"
import { useRouter } from "next/navigation"
import { useLocalStorage } from "@/src/hooks/useLocalStorage"
import { useMetadata } from "@/src/hooks/useMetadata"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
import { useQuery } from "@tanstack/react-query"

const QuickQuoteLoadingPage = () => {

    useLocalStorage()
    useMetadata()
    useProducts()

    const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.QUICK_QUOTE_LOADING) as QuoteScreen

    const router = useRouter()

    const ctxQuickQuote = useContext(QQResponseStateContext)
    const localCtx = useContext(LocalStateContext)

    const [_, setErr] = useError()

    const nextScreen = screenDefinition.sidnext
    const nextUrl = QuoteScreenIdToUrl[nextScreen]

    // if (!ctxQuickQuote?.state || !localCtx?.state) {
    //     return null
    // }

    const { data: preQuickQuote, isError: isPreQuickQuoteError } = useQuery({
        queryKey: ['preQuickQuote'],
        queryFn: fetchPreQuickQuote,
    })

    useEffect(() => {

        const to = async () => {

            if (preQuickQuote && 'error' in preQuickQuote) {
                console.log('FAIL!!!')
                const umbrlError = preQuickQuote as { errorCode: string; message: string; }

                //@ts-ignore
                setErr({
                    code: umbrlError.errorCode,
                    msg: umbrlError.message
                })

                router.push(nextUrl)
            } else if (preQuickQuote){
                console.log('PASS!!!')

                const { estimated_rebuild_cost, total_contents_value } = preQuickQuote as QuoteState
                const quoteState = {
                    policy: {
                        buildings_coverage: {
                            estimated_rebuild_cost
                        },
                        contents_coverage: {
                            total_contents_value
                        }
                    }
                }
                console.log('ctxQuickQuote', ctxQuickQuote)
                console.log('quoteState', quoteState)
                ctxQuickQuote?.dispatch({ type: "SET_QQ_RESPONSE", payload: quoteState })

                setTimeout(() => {
                    router.push(nextUrl)
                    // console.log('TO FIRE!!!')
                    // console.log(JSON.stringify(ctxQuickQuote?.state))
                }, 400)

            }
        }

        to()

        // return () => to && clearTimeout(to)
    }, [preQuickQuote])


    return <>
        {/* <AppHeaderComponent logoTxt="mini" /> */}
        <QuoteScreenResultLoadingComponent screenDefinition={ screenDefinition} />
    </>
}

export default QuickQuoteLoadingPage
