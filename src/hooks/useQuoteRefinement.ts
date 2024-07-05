import { useEffect, useState } from "react"
import jiff from "jiff"

import { QuoteDispatch, QuoteState } from "../stores/contexts/quickQuoteStateContext";
import { refineQuickQuote } from "@/src/api/quote"
import { LocalState, LocalStateDispatch } from "../stores/contexts/localStateContext";
import { useAtom } from "jotai";
import { uiLoading } from "../stores/jotai/uiState";
import { UmbrlForm } from "../models/form";
import { useMutation } from "@tanstack/react-query";
import { useError } from "./useError";

export const useQuoteRefinement = ({
        quoteState,
        quoteDispatch,
        localState,
        localDispatch,
        patchFn,
        testing
    }: {
        quoteState: QuoteState | null;
        quoteDispatch: QuoteDispatch | null;
        localState: LocalState | null;
        localDispatch: LocalStateDispatch | null;
        patchFn:  (apiQuoteDoc: any, locState: LocalState) => jiff.JSONPatch;
        testing ?: boolean;
    }): [boolean, boolean, () => void] => {

    const [refined, setRefined] = useState(false)
    const [refining, setRefining] = useState(false)

    const [_, setUiloading] = useAtom(uiLoading)

    const [err, setErr] = useError()


    const { data: response, mutateAsync: refineQuickQuoteMutation } = useMutation({
        mutationFn: ({patchDoc, quoteId}: {patchDoc: any, quoteId: string}) => refineQuickQuote(patchDoc, quoteId),
        // mutationKey: ['refineQuickQuote', patchDoc],
        onSuccess: (data) => {
            if(typeof data.error === 'boolean') {
                // @ts-ignore
                setErr(data.message)
            } else if (data.error) {
                throw new Error(data.error.message)
            }
        }
    })

    useEffect(() => {

        let to: any

        if (refining && quoteState && quoteDispatch && localState) {

            const patchDoc = patchFn(quoteState, localState)

            const refineQuote = async () => {

                // @ts-ignore
                const quoteId = localState.quote.uuid

                await refineQuickQuoteMutation({patchDoc, quoteId})
                // const res = await refineQuickQuote(patchDoc, quoteId)

                //  @ts-ignore
                const res = response ? response.data as QuoteState : null

                if (res) {

                    console.log('res', res)

                    // @ts-ignore
                    const quoteUidNew = res.uuid;

                    if (!res.error) {

                        if (typeof quoteUidNew === 'string' && localDispatch && quoteId !== quoteUidNew) {
                            UmbrlForm.manualSave(localDispatch, 'quote', null, 'uuid', quoteUidNew)
                        }

                        quoteDispatch({ type: "SET_QQ_RESPONSE", payload: res})
                    }

                    setRefined(true)

                    setTimeout(() => {
                        setUiloading(false)
                    }, 1000)
                }
            }

            console.log('----------------- PATCHDOC ------------------')
            console.log(patchDoc)

            if (patchDoc && patchDoc.length) {

                if (testing) {

                    refineQuote()

                } else {

                    // TODO this is tmp, remove when we uncomment "refineQuote()"
                    setRefined(true)

                    setTimeout(() => {
                        setUiloading(false)
                    }, 2000)
                }
            } else {
                setRefined(true)

                setTimeout(() => {
                    setUiloading(false)
                }, 2000)
            }

            setUiloading(true)
        }

        // return () => to && clearTimeout(to)

    }, [refining, response])

    return [refined, refining,  () => setRefining(true) ]
}