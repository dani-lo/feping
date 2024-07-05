import { LocalState } from "../stores/contexts/localStateContext"
import { QuoteState } from "../stores/contexts/quickQuoteStateContext"

export enum PolicyType {
    BUILDINGS = 'Buildings',
    CONTENTS = 'Contents',
    BUILDINGS_CONTENTS = 'Buildings and Contents',
}

export const currentPolicy = (quoteDoc: QuoteState  | null, stateDoc: LocalState | null) : PolicyType | null => {

    // @ts-ignore
    if (quoteDoc && quoteDoc.policy?.coverage_type) {
        // @ts-ignore
        return quoteDoc.policy?.coverage_type ?? null  as PolicyType | null

        // @ts-ignore
    } else if (stateDoc && stateDoc.policy?.coverage_type) {
        // @ts-ignore
        return stateDoc.policy?.coverage_type  ?? null  as PolicyType | null
    } 

    return null
}