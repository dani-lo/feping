import { createContext, useReducer, useEffect, Dispatch } from "react";
import { UmbrlForm } from "../../models/form";

export interface QuoteState {
    [key: string]: string | number| boolean | QuoteState | null
}

export type QuoteDispatch = Dispatch<{ type: string; payload: QuoteState }>

const defaultQQResponseState: QuoteState | null = null

const QQResponseStateActions = {
    SET_QQ_RESPONSE: "SET_QQ_RESPONSE"
}

type QQResponseStateActionKey = keyof typeof QQResponseStateActions
type QQResponseStateActionType = typeof QQResponseStateActions[QQResponseStateActionKey]

interface QQResponseStatePayload{}

interface QQResponseStateAction {
    type: QQResponseStateActionType;
    payload: QQResponseStatePayload;
}

const QQResponseStateContext = createContext<{ state: QuoteState | null, dispatch: QuoteDispatch } | null>(null);

const qqResponseStateReducer = (state: QuoteState | null, action: QQResponseStateAction): {} | null => {
    
    switch (action.type) {
        case "SET_QQ_RESPONSE":

            const quoteDoc = action.payload

            // @ts-ignore
            const estimatedRebuild = quoteDoc?.policy?.buildings_coverage?.estimated_rebuild_cost

            // @ts-ignore
            const actualRebuild = quoteDoc?.policy?.buildings_coverage?.rebuild_cost

            if (!actualRebuild && estimatedRebuild) {

                const newDoc = {
                    ...quoteDoc,
                    policy: {

                        // @ts-ignore
                        ...quoteDoc.policy,
                        buildings_coverage: {

                            // @ts-ignore
                            ...quoteDoc.policy.buildings_coverage,
                            rebuild_cost: estimatedRebuild
                        }
                    }
                }
                
               return newDoc
            }

            return quoteDoc
        default:
            return state;
    }
}

const QQResponseContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, dispatch] = useReducer(qqResponseStateReducer, defaultQQResponseState)

    return (
        // @ts-ignore
        <QQResponseStateContext.Provider value={{ state: state, dispatch }}>
            {children}
        </QQResponseStateContext.Provider>
    );
};

export { QQResponseContextProvider, QQResponseStateContext, qqResponseStateReducer }