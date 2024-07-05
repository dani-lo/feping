import { AddonLevel } from "./addon";
import { AddonKey, BoostKey, PricingKey, QuoteOffer } from "./offer";

export const boostsAndAddonsPrice = (
    offer: QuoteOffer, 
    selectedBoosts: BoostKey[], 
    selectedAddons: {
        addonKey: AddonKey;
        addonLevel: AddonLevel | boolean;

    }[]) : number => {

        let extraPremium = 0
 
        if (selectedBoosts.length) {

            const boostsDefinition = offer.product.getBoosts()

            selectedBoosts.forEach(boostKey => {
                const boostDef = boostsDefinition.find(b => b.model_key === boostKey)
                const boostPriceKey = boostDef?.pricing_key ?? null 
                
                if (boostPriceKey) {
                    extraPremium = extraPremium + offer.priceFor(boostPriceKey)
                }
            })
        }

        if (selectedAddons.length) {

            const addonsDefinition = offer.product.getAddons()

            selectedAddons.forEach(addonObj => {

                const addonDef = addonsDefinition.find(b => b.model_key === addonObj.addonKey)
                
                if (addonDef) {
                    if (addonObj.addonLevel === AddonLevel.LIMITED && addonDef.pricing_key_limited) {
                        extraPremium = extraPremium + offer.priceFor(addonDef.pricing_key_limited)
                    } else if (addonObj.addonLevel === AddonLevel.FULL && addonDef.pricing_key_full) {
                        extraPremium = extraPremium + offer.priceFor(addonDef.pricing_key_full)
                    } else if (addonObj.addonLevel === true && addonDef.pricing_key) {
                        extraPremium = extraPremium + offer.priceFor(addonDef.pricing_key)
                    }
                }
            })
        }
        return extraPremium
    }