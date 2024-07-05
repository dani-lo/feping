import { AddonDoc } from "./addon";
import { BoostDoc } from "./boost";
import { PricingKey, QuoteOffer, QuoteOfferDoc } from "./offer";
import { ProductDoc } from "./product";

enum ToogleType {
    'BOOST' = 'BOOST',
    'ADDON_MONO' = 'ADDON_MONO',
    'ADDON_MULTI' = 'ADDON_MULTI'
} 

export class Toogle {

    modelKey: string;
    pricingKey: PricingKey;

    constructor (modelKey: string, pricingKey: PricingKey) {
        this.modelKey = modelKey
        this.pricingKey = pricingKey

    }

    getPrice (offer: QuoteOffer) {
        return offer.prices[this.pricingKey]
    }
}

export const toogleOpts = (toogles: Toogle[]) => {
    
    return toogles.map(() => {

    })
}