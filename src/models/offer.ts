import { LocalState } from "../stores/contexts/localStateContext";
import { QuoteState } from "../stores/contexts/quickQuoteStateContext"
import { formatCurrency } from "../util/currency";
import { AddonLevel } from "./addon";
import { UmbrlForm } from "./form";
import { PolicyType } from "./policy";
import { boostsAndAddonsPrice } from "./pricing";
import { Product, ProductDoc, currProduct } from "./product";

export enum PricingKey {
    legal_expenses_cover_price = 'legal_expenses_cover_price',
    home_emergency_cover_price  = 'home_emergency_cover_price',
    contents_full_ad_price  = 'contents_full_ad_price',
    contents_limited_ad_price  = 'contents_limited_ad_price',
    buildings_limited_ad_price  = 'buildings_limited_ad_price',
    buildings_full_ad_price  = 'buildings_full_ad_price',
    buildings_limit_boost_price = 'buildings_limit_boost_price',
    contents_limit_boost_price = 'contents_limit_boost_price',
    away_from_home_boost_price = 'away_from_home_boost_price',
    backup_boost_price = 'backup_boost_price',
    garden_boost_price = 'garden_boost_price',
    safety_boost_price = 'safety_boost_price',
}

export enum BoostKey {
    away_from_home = 'away_from_home',
    backup = 'backup',
    buildings_limit = 'buildings_limit',
    contents_limit = 'contents_limit',
    garden = 'garden',
    safety = 'safety',
}

export enum AddonKey {
    home_emergency_cover = 'home_emergency_cover',
    buildings_accidental_damage = 'buildings_accidental_damage',
    contents_accidental_damage = 'contents_accidental_damage',
    legal_expenses_cover = 'legal_expenses_cover'
}


export interface QuoteOfferDoc {
    premium: number;
    product: ProductDoc | null;
    uuid: string;   
    boost_selection: {[k in BoostKey]: boolean};
    addons_selection: {[k in AddonKey]: boolean};
}

export type PricedQuoteOffer = QuoteOfferDoc & {[k in PricingKey]: number;}

export class QuoteOffer  {

    premium: number;
    product: Product;
    uuid: string;
    prices: {[k in PricingKey]: number};
    boost_selection: {[k in BoostKey]: boolean};
    addons_selection: {[k in AddonKey]: boolean};

    constructor (doc: PricedQuoteOffer, product: Product) {

        this.uuid = doc.uuid
        this.premium = doc.premium

        this.product = product

        this.prices = {
            legal_expenses_cover_price: doc.legal_expenses_cover_price,
            home_emergency_cover_price: doc.home_emergency_cover_price,
            contents_full_ad_price: doc.contents_full_ad_price,
            contents_limited_ad_price: doc.contents_limited_ad_price,
            buildings_limited_ad_price: doc.buildings_limited_ad_price,
            buildings_full_ad_price: doc.buildings_full_ad_price,
            buildings_limit_boost_price: doc.buildings_limit_boost_price,
            contents_limit_boost_price: doc.contents_limit_boost_price,
            away_from_home_boost_price: doc.away_from_home_boost_price,
            backup_boost_price: doc.backup_boost_price,
            garden_boost_price: doc.garden_boost_price,
            safety_boost_price: doc.safety_boost_price,
        }

        this.boost_selection = doc.boost_selection
        this.addons_selection = doc.addons_selection
    }

    private totalBoostsAndAddons (localState: LocalState) {

        //@ts-ignore
        const storedBoosts = localState.toogles?.boosts ?? {} 
        const activeBoostKeys = (Object.keys(storedBoosts).filter(k => !!storedBoosts[k]) ?? []) as BoostKey[]

        //@ts-ignore
        const storedAddons = localState.toogles?.addons ?? {}
        const activeAddonsWithLevels = Object.keys(storedAddons).reduce((acc, curr) => {

            const currAddonVal = storedAddons[curr] as AddonLevel | boolean | string

            if ([AddonLevel.FULL, AddonLevel.LIMITED, true, 'true'].includes(currAddonVal)) {

                // @ts-ignore
                acc.push({
                    addonKey: curr,
                    addonLevel: currAddonVal
                })
            }

            return acc
        }, []) as { addonKey: AddonKey, addonLevel: AddonLevel  }[]
        
        return boostsAndAddonsPrice(
            this,
            activeBoostKeys,
            activeAddonsWithLevels
        )
    }

    formattedPremium () {

        // const tot = boostedVal ?  boostedVal  : this.premium

        return `${ formatCurrency(this.premium) } per year`
    }

    formattedPremiumWithFlexSelections(localState: LocalState) {

        const runningTotal = this.totalBoostsAndAddons(localState)

        return `${ formatCurrency(this.premium + runningTotal) } per year`
    }

    features (selectedPolicy: PolicyType) {

        const feats = []

        if ([PolicyType.BUILDINGS, PolicyType.BUILDINGS_CONTENTS].includes(selectedPolicy)) {

            feats.push(`Buildings over up to ${ formatCurrency(this.product.getBuildingsSumInsured() ?? 0) }`)
        }  
        
        if ([PolicyType.CONTENTS, PolicyType.BUILDINGS_CONTENTS].includes(selectedPolicy)) {

            feats.push(`Contents over up to ${ formatCurrency(this.product.getContentsSumInsured() ?? 0) }`)
            feats.push(`Personal possessions up to ${ formatCurrency(this.product.getHighRiskItemsSumInsured() ?? 0) }`)
        }

        return feats
    }

    title () {
        return this.product.name
    }

    tooglePrice (k: PricingKey) {
        return this.prices[k]
    }

    priceFor (k ?: PricingKey) {
        return k ? this.prices[k] : 0
    }
}

// export const currentOffer = (doc: QuoteState, products: ProductDoc[]) => {

//     if (!doc?.offers) {
//         return null
//     }

//     const product = currProduct(products)

//     const selectedOffer = Object.values(doc.offers).find(o => o.product.name === 'flex')

//     if (!product) {
//         return null
//     }

//     return new QuoteOffer(selectedOffer, product)
// }


export const currentOfferByProduct = (doc: QuoteState, products: Product[]) : QuoteOffer | null=> {

    if (!doc?.offers || !doc.selected_product_uuid) {
        return null
    }

    const selectedProductId = doc.selected_product_uuid 
    const product = products.find(p => p.uuid === selectedProductId)

    if (product) {
        //@ts-ignore
        const selectedOffer = Object.values(doc.offers).find(o => o.product.uuid === selectedProductId)

        return new QuoteOffer(selectedOffer, product)
    }

    return null
}

export const productUIdForProductName = (productName: string, offers: { [k: string ]: QuoteOfferDoc}) => {
        
    return Object.keys(offers).reduce((acc: string, curr: string) => {

        if (acc === '') {
            const innerOffer = offers[curr] as QuoteOfferDoc

            if (innerOffer.product?.name === productName) {
                return offers[curr].product?.uuid ?? ''
            }
        }

        return acc
    }, '')
}



// export const recalculatePremiumUat = (
//     currPrice: number,
//     numBoosts: number | null,
//     voluntaryExcessInside: number,
//     voluntaryExcessOutside: number,
//     insurances: {
//         ACCIDENTAL_DAMAGE_LIMITED: boolean,
//         ACCIDENTAL_DAMAGE_FULL: boolean,
//         HOME_EMERGENCY:boolean,
//         LEGAL_EXPENSES:boolean
//     }
// ) => {

//     let newPremium 

//     newPremium = numBoosts ? (currPrice + (numBoosts * 25)) : currPrice

//     const excessValInsideMultiplier = !voluntaryExcessInside ? 1.21 :
//         1.21 - 
//         (0.00113 * voluntaryExcessInside) + 
//         (0.0000021 * (voluntaryExcessInside * voluntaryExcessInside)) - 
//         (0.0000000023 * (voluntaryExcessInside * voluntaryExcessInside * voluntaryExcessInside)) 
    
//     const excessValOutsideMultiplier = !voluntaryExcessOutside ? 1.1 :
//         1.1 - 
//         (0.0008 * voluntaryExcessOutside ) + 
//         (0.0000021 * (voluntaryExcessOutside * voluntaryExcessOutside )) - 
//         (0.0000000023 * (voluntaryExcessOutside * voluntaryExcessOutside * voluntaryExcessOutside )) 

//     newPremium = newPremium * excessValInsideMultiplier * excessValOutsideMultiplier

//     if (insurances.ACCIDENTAL_DAMAGE_FULL) {

//         newPremium = newPremium + (newPremium * 0.08)
//     } else if (insurances.ACCIDENTAL_DAMAGE_LIMITED) {
      
//         newPremium = newPremium + (newPremium * 0.15)
//     }

//     if (insurances.HOME_EMERGENCY) {
//         newPremium = newPremium + 28
//     }

//     if (insurances.LEGAL_EXPENSES) {
//         newPremium = newPremium + 15
//     }

//     return newPremium
// }