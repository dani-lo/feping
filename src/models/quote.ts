
import { MetadataEnums } from '@/src/stores/contexts/metadataStateContext'

import { 
    QuoteOpt, 
    QuoteOptType } from "@/src/stores/staticQuoteJourneyDefinition"

import { load } from '@/src/util/storage'
import { UmbrlForm } from './form'
import { frontendToBackendSectionSubSectionApikey } from './mapping'

export enum QuoteRequestType {
    QUICK = 'QUICK',
    FULL = 'FULL,'
}

const  PreQuickQuoteReqFields = {
    main_policy_holder: ['first_name', 'surname', 'email', 'date_of_birth'],
    property: {
        address: ['acloud_id', 'street', 'town', 'postcode', 'premise_number', 'building_name', 'flat_number']
    },
    policy: ['coverage_type', 'start_date']
}

const QuickQuoteReqFields = {
    main_policy_holder: ['first_name', 'surname', 'email', 'date_of_birth'],
    property: {
        address: ['acloud_id', 'street', 'town', 'postcode', 'premise_number', 'building_name', 'flat_number']
    },
    policy: ['coverage_type', 'start_date', 'contents_coverage', 'buildings_coverage']
}

export const populateOptsFromQuote = (opts: QuoteOpt[], section: string, qqresponse: any) => {

    if (!qqresponse) {
        return opts
    }

    const populated = opts.map((opt: QuoteOpt)  => {        

        if (opt.apikey) {

            let root 
            
            const mapped = frontendToBackendSectionSubSectionApikey(section, opt.apisubsection ?? null, opt.apikey)
            

            if (mapped.section === 'toogles') {

                const selectedProductId = qqresponse.selected_product_uuid
                // @ts-ignore
                const offerId = Object.values(qqresponse.offers).find(o => o.product?.uuid === selectedProductId)?.uuid ?? null

                root = offerId && qqresponse.offers && qqresponse.offers[offerId] && qqresponse.offers[offerId].toogles ? qqresponse.offers[offerId].toogles : null

                if (mapped.subsection && root) {
                    root = root[mapped.subsection]
                }
                
            } else {
                if (!mapped.section) {
                    root = qqresponse
                } else if (!qqresponse || !qqresponse[mapped.section] || (mapped.subsection && !qqresponse[mapped.section][mapped.subsection])) {
                    root = null
                } else {
                    root = mapped.subsection ? qqresponse[mapped.section][mapped.subsection] : qqresponse[mapped.section]
                }
            }

            let responseVal: any = root ? root[mapped.apikey] : null
                        
            let optVal: any = responseVal

            if (responseVal === undefined || responseVal === null) {

                optVal   = null
            } else if ([QuoteOptType.NUMERIC, QuoteOptType.NUMERIC_CURRENCY].includes(opt.type)) {

                optVal = parseInt(responseVal)
            } else if (opt.type === QuoteOptType.BOOL || opt.type === QuoteOptType.BOOL_INVERTED) {

                optVal = [true, 'true'].includes(responseVal) ? true : false
            
            } else if (typeof optVal === 'string' && (optVal ?? '').indexOf('T00:00:00') !== -1) {

                optVal = optVal.replace('T00:00:00', '')
            }
            
             const result = opt.confirmable ? {
                ...opt,
                assumed: optVal
            } : {
                ...opt,
                value: optVal
            }

            // if (opt.type === QuoteOptType.RANGE_CURRENCY || opt.type === QuoteOptType.RANGE_DAYS) {
                
            //     result.optionvals = (responseVal.rangeNums ?? []).map((o: number) => ({ label: o, val: o}))
            // }
            
            // console.log('DONE POP FROM QQ doc')
            // console.log(result)

            return result
        }
    })

    return populated
}

export const populateOptsFromEnum = (opts: QuoteOpt[], enums: MetadataEnums) => {

    if (!enums?.length) {
        return opts
    }

    const populated = opts.map((opt: QuoteOpt) => {

        if (opt.enumkey) {
        
            const values = enums[opt.enumkey]

            const mapped_values = Object.keys(values).map((key: string) => {
                return  {
                    label: values[key],
                    val: values[key]
                }
            })

            const result = {
                ...opt,
                optionvals: mapped_values
            }
            return result
            
        } else {
            return opt
        }
    })

    return populated
}

export const quoteRequestPayload = (reqType: QuoteRequestType, pre: boolean) => {
    
    if (reqType === QuoteRequestType.QUICK) {

        const reqPayload = {
            main_policy_holder: {},
            property: { address: {}},
            policy: {}
        }

        const objFields = pre ? PreQuickQuoteReqFields : QuickQuoteReqFields

        reqPayload.main_policy_holder = objFields.main_policy_holder.reduce((acc: { [k: string]: string}, reqKey: string) => {
            
            const val = UmbrlForm.manualRead('main_policy_holder', null, reqKey)

            acc[reqKey] = val

            return acc
        }, {})


        reqPayload.property.address = objFields.property.address.reduce((acc: { [k: string]: string}, reqKey: string) => {
            
            const val = UmbrlForm.manualRead('property', 'address', reqKey)

            if (reqKey === 'premise_number') {
                acc['building_number'] = val
            } else {
                acc[reqKey] = val
            }

            return acc
        }, {})

        reqPayload.policy =  objFields.policy.reduce((acc: { [k: string]: string}, reqKey: string) => {
            
            const val = UmbrlForm.manualRead('policy', null, reqKey)

            acc[reqKey] = val

            return acc
        }, {})

        return reqPayload

    } else if (reqType === QuoteRequestType.FULL) {

        const fullFields = [
            "main_policy_holder", 
            "joint_policy_holder", 
            "building",
            "risks",
            "ownership_values",
            "policy"
        
        ]   
        
        return fullFields.reduce((acc: { [k: string]: any }, field) => {

            acc[field] = load(field)

            return acc
        }, {})
    }

    return {}
}

export const refreshQuotePrice = (selectedBoosts: number, currprice: number) => {
    return (25 * selectedBoosts) + currprice
}