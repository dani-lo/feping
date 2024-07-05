import { useEffect } from "react";
import { UmbrlForm } from "../models/form";
import { QuoteDispatch, QuoteState } from "../stores/contexts/quickQuoteStateContext";
import { fetchQuickQuoteByUid } from "@/src/api/quote";

export const useQuoteRetrieval = ({ state, dispatch }: { state: QuoteState | null; dispatch: QuoteDispatch | null; }) => {
    
    useEffect(() => {
        
        const refreshQuote = async (qid: string) => {

            const res = await fetchQuickQuoteByUid(qid)
            
            dispatch && dispatch({ type: "SET_QQ_RESPONSE", payload: res})
        }

        if (!state && dispatch) {

            const quoteId = UmbrlForm.manualRead('quote', null, 'uuid')
            
            if (quoteId) {

                refreshQuote(quoteId)
            } else {
                // TODO 
                // there is no data to continue from here (no quote docs in context, and the stored uuid does not exist)
                // check with UX what we should be doing here
            }
        }

    }, [state, dispatch])
}