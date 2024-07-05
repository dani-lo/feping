import { QuoteState } from "../stores/contexts/quickQuoteStateContext"
import { isObject } from "../util/is"

const FrontendToBackendMapping = {
    // '/property_details/building_type':'/property_details/type',
    // '/property_details/building_age':'/property_details/year_built',
    '/ownership_values/ownership_type':'/property_details/property_ownership',
    // '/ownership_values/rebuild_cost':'/policy/buildings_coverage/rebuild_cost',
    // '/ownership_values/market_value':'/policy/buildings_coverage/market_value',
    '/offer/selected_product_uuid': '/selected_product_uuid',
    // '/toogles/BUILDINGS_LIMIT_BOOST': '/OFFER_TOOGLES/BUILDINGS_LIMIT_BOOST'
}


const pathToTuple = (path: string) => path.split('/').filter(d => !!d)

const pathSection = (p: string): string | null  => {

    const tup = pathToTuple(p)

    if (tup.length === 1) {
        return null
    }

    return tup[0]
}

const pathSubSection = (p: string): string | null => {

    const tup = pathToTuple(p)

    return tup.length === 3 ? tup[1] : null
}

const pathValueKey = (p: string): string => {

    const tup = pathToTuple(p)
    
    return tup[tup.length - 1]
}

export const frontendToBackendSectionSubSectionApikey = (feSection: string, feSubsection: string | null, feApikey: string) => {

    const path =  `/${ feSection }${ feSubsection ? ('/' + feSubsection ) : '' }/${ feApikey }`

    // @ts-ignore
    const backendPath = FrontendToBackendMapping[path]

    return {
        section: backendPath ? pathSection(backendPath): feSection,
        subsection: backendPath ? pathSubSection(backendPath) : feSubsection,
        apikey:  backendPath ? pathValueKey(backendPath) : feApikey
    }
}
