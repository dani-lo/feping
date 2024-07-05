import { abbreviateCurrency } from "../util/currency";
import { pricingFormatDays } from "../util/time";
import { BoostKey, PricingKey } from "./offer";
import { PricingFormat } from "./product";

export interface BoostDoc {
    uuid: string;
    title: string;
    type: BoostType;
    model_key: BoostKey;
    pricing_key: PricingKey;
    
    features: {
        standard: BoostFeature[];
        upgraded: BoostFeature[];
    };
}

export interface BoostFeature {
    id: string;
    label: string;
    value: string;
    description: string;
    type: PricingFormat;
}

export type BoostType = 'BUILDINGS_LIMIT' | 'CONTENTS_LIMIT' | 'AWAY_FROM_THE_HOME' | 'BACKUP' | 'GARDEN' | 'SAFETY'

export const mergeBoostFeatures = (featsStandard: BoostFeature[], featsUpgraded: BoostFeature[]) => {

    return featsStandard.map((fStd, i) => {
        return {
            label: fStd.label,
            description: fStd.description,
            value: {
                standard: {
                    val: fStd.value,
                    type: fStd.type
                },
                upgraded: {
                    val: featsUpgraded[i].value,
                    type: featsUpgraded[i].type
                },
            }
        }
    })

}

export const boostPricingFormat = (featurePricingFormat: PricingFormat, featureVal: number | string): string => {

    const isCurrency = ['CURRENCY', 'UP_TO_CURRENCY', 'CURRENCY_FROM'].includes(featurePricingFormat) 
    const isDate = ['UP_TO_DATE', 'DATE', 'FROM_DATE'].includes(featurePricingFormat) 
    const isString = ['STRING'].includes(featurePricingFormat) 
                        
    if (isCurrency) {
        return abbreviateCurrency(Number(featureVal), featurePricingFormat) 
    } else if (isDate) {
        return pricingFormatDays(Number(featureVal), featurePricingFormat)
    } else if (isString) {
        return `${ featureVal }`
    }
    
    return `${ featureVal }`
}

const LocalMappingsForDecoration = [
    {
        type: "BUILDINGS_LIMIT",
        keysToAdd: {
            model_key:"buildings_limit" as BoostKey,
            pricing_key: "buildings_limit_boost_price" as PricingKey
        }
    },
    {
        type: "CONTENTS_LIMIT",
        keysToAdd: {
            model_key:"contents_limit" as BoostKey,
            pricing_key: "contents_limit_boost_price" as PricingKey
        }
    },
    {
        type: "AWAY_FROM_THE_HOME",
        keysToAdd: {
            model_key:"away_from_home" as BoostKey,
            pricing_key: "away_from_home_boost_price" as PricingKey
        }
    },
    {
        type: "BACKUP",
        keysToAdd: {
            model_key:"backup" as BoostKey,
            pricing_key: "backup_boost_price" as PricingKey
        }
    },
    {
        type: "GARDEN",
        keysToAdd: {
            model_key:"garden" as BoostKey,
            pricing_key: "garden_boost_price" as PricingKey
        }
    },
    {
        type: "SAFETY",
        keysToAdd: {
            model_key:"safety" as BoostKey,
            pricing_key: "safety_boost_price" as PricingKey
        }
    }
]

export const DecorateApiBoost = (
        apiBoost: BoostDoc, 
        type: BoostType) : BoostDoc => {

    const boostKeysDoc = LocalMappingsForDecoration.find(b => b.type === type) ?? null
    
    return boostKeysDoc ? {
        ...apiBoost,
        ...boostKeysDoc.keysToAdd
    } : {
        ...apiBoost
    }
}