import jiff from "jiff"

import { config } from "@/src/config"
import { QuoteRequestType, quoteRequestPayload } from "@/src/models/quote"
import type { QuoteState } from "../stores/contexts/quickQuoteStateContext"
import type { UmbrlError } from "../types"
import { useMutation, useQuery } from "@tanstack/react-query"

export const fetchPreQuickQuote = async () : Promise<QuoteState | UmbrlError> => {

    try {

        const data = quoteRequestPayload(QuoteRequestType.QUICK, true)

        const response = await fetch(config.url.preQuickquoteRequest, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const parsedResponse: Response = await response.json()

        if (response?.ok) {
            // @ts-ignore
            return parsedResponse.data as unknown as QuoteState
        } else {

            return {
                error: true,
                // @ts-ignore
                message: parsedResponse.error?.message ?? 'An error occurred',
                // @ts-ignore
                errorCode: parsedResponse.error?.code ?? '404'
            }
        }
    } catch (err) {
        console.log(err)

        return {
            error: true,
            message: 'An error occurred'
        }
    }
}

export const fetchQuickQuote = async () : Promise<QuoteState | UmbrlError> => {

    try {

        const data = quoteRequestPayload(QuoteRequestType.QUICK, false)

        const response = await fetch(config.url.quickquoteRequest, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const parsedResponse: Response = await response.json()

        if (response?.ok) {
            // @ts-ignore
            return parsedResponse.data as unknown as QuoteState
        } else {

            return {
                error: true,
                // @ts-ignore
                message: parsedResponse.error?.message ?? 'An error occurred'
            }
        }
    } catch (err) {
        console.log(err)

        return {
            error: true,
            message: 'An error occurred'
        }
    }

}

export const fetchQuickQuoteByUid = async (uid: string) => {

    try {

        const response = await fetch(`${ config.url.quickquoteRetrieve }/${ uid }`, {
            method: "GET",
        })
        const parsedResponse = await response.json()

        if (response.ok) {

            return parsedResponse.data
        }
    } catch (error) {
        console.log(error)
    }
}

interface RefineQuickQuoteError {
    code: number;
    message: string;
    detail: any;
    error_type: string;
}

interface RefineQuickQuoteResponse {
    data: QuoteState;
    metadata: any;
    status: string;
    error: null | RefineQuickQuoteError;
}


export const refineQuickQuote = async (patchDoc: jiff.JSONPatch, quoteId: string): Promise<RefineQuickQuoteResponse | UmbrlError> => {

    try {

        const data = { operations: patchDoc }
        const url = `${ config.url.quickquoteRefine }/${quoteId}`

        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const parsedResponse = await response.json();

        if (response?.ok) {

            return parsedResponse as RefineQuickQuoteResponse
        } else {

            return {
                error: true,
                // @ts-ignore
                message: parsedResponse.error?.message ?? 'An error occurred',
                errorCode: parsedResponse.error?.code ?? '404'
            }
        }
    } catch (err) {
        console.log(err)

        return {
            error: true,
            message: 'An error occurred',
            errorCode: '404'
        }
    }
}