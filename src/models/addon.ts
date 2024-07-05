import { AddonKey, PricingKey } from "./offer";

export enum AddonLevel  {
    NONE='No ad cover',
    LIMITED='Limited ad cover',
    FULL='Full ad cover',
}

export interface AddonDoc {
    uuid: string;
    id: string;
    title: string;
    model_key: AddonKey;
    pricing_key ?: PricingKey;
    pricing_key_full ?: PricingKey;
    pricing_key_limited ?: PricingKey;
    default_level: AddonLevel;
    optional_levels: AddonLevel[];
}

export const AddonDescriptions : { [k: string]: string } = {
    buildings_accidental_damage : 'Protect yourself against accidents. Not included as standard.',
    contents_accidental_damage : 'Protect yourself against accidents. Not included as standard.',
    legal_expenses_cover : 'Get insured for up to £50,000 to cover legal fees and expenses.',
    home_emergency_cover : 'Get insured for up to £1,000 if there’s a home emergency.',
}

export const AddonLevelDescriptions  = {
    buildings_accidental_damage : {
        [AddonLevel.NONE]: 'UMBRL Flex doesn\'t provide this cover as standard.',
        [AddonLevel.LIMITED]: 'Damage to fixed glass items and non-portable electronics.',
        [AddonLevel.FULL]: 'Replace or fix contents if accidentally damaged.'
    },
    contents_accidental_damage : {
        [AddonLevel.NONE]: 'UMBRL Flex doesn\'t provide this cover as standard.',
        [AddonLevel.LIMITED]: 'Damage to fixed glass items and non-portable electronics.',
        [AddonLevel.FULL]: 'Replace or fix contents if accidentally damaged.'
    }
}

const LocalMappingsForDecoration = {
    'root': [
        {
            id: "home_emergency_cover",
            keysToAdd: {
                model_key:"home_emergency_cover" as AddonKey,
                pricing_key: "home_emergency_cover_price" as PricingKey
            }
        },
        {
            id: "legal_expenses",
            keysToAdd: {
                model_key:"legal_expenses_cover" as AddonKey,
                pricing_key: "legal_expenses_cover_price" as PricingKey
            }
        }
    ],
    'buildings_coverage': [
        {
            id: 'accidental_damage',
            
            keysToAdd: {
                model_key: "buildings_accidental_damage" as AddonKey,
                pricing_key_full: "buildings_full_ad_price" as PricingKey,
                pricing_key_limited: "buildings_limited_ad_price" as PricingKey
            }
        }
    ],
    'contents_coverage': [
        {
            id: 'accidental_damage',
            
            keysToAdd: {
                model_key: "contents_accidental_damage" as AddonKey,
                pricing_key_full: "contents_full_ad_price" as PricingKey,
                pricing_key_limited: "contents_limited_ad_price" as PricingKey
            }
        }
    ]
}

export const DecorateApiAddon = (
        apiAddon: AddonDoc, 
        logicalRoot: 'root' | 'buildings_coverage' | 'contents_coverage') : AddonDoc => {

    const addonsArr = LocalMappingsForDecoration[logicalRoot] 
    const addonDocKeysToAdd = addonsArr.find(a => a.id === apiAddon.id)?.keysToAdd ?? null

    return addonDocKeysToAdd ? {
        ...apiAddon,
        ...addonDocKeysToAdd
    } : {
        ...apiAddon
    }
}


