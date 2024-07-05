import { QuoteState } from "../stores/contexts/quickQuoteStateContext"
import { isObject } from "../util/is"

const FrontendToBackendMapping = {
    '/offer/selected_product_uuid': '/selected_product_uuid',
    '/ownership_values/ownership_type':'/property_details/property_ownership'
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
