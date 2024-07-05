import { QuoteOpt } from "@/src/stores/staticQuoteJourneyDefinition"

type ACloudResponse = {
    [key: string]: string | number | boolean
}

export const ACloudToUmbrl : any = {
    'street' : 'street',
    'premise_number' : 'building_number',
    'postcode' : 'postcode',
    'flat_number' : 'flat_number',
    'town': 'town'
}

export const populateOptsFromACloud = (opts: QuoteOpt[], section: string, acloudResponse: ACloudResponse, acloudId: string)  => {
    
    const populated = opts.map((opt: QuoteOpt)  => {

        if (opt.apikey) {
            
            const acloudKey = ACloudToUmbrl[opt.apikey]
            const optVal: string | number | boolean = opt.apikey === 'acloud_id' ? acloudId : acloudResponse[acloudKey]

            const result = {
                ...opt,
                value: optVal,
                disabled: opt.apikey === 'postcode' ? true : false
            }

            return result
        } else {
            return opt
        }
    })

    return populated
}
