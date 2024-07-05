import { QuoteState } from "../stores/contexts/quickQuoteStateContext";
import { AddonDoc, DecorateApiAddon } from "./addon";
import { BoostDoc, DecorateApiBoost } from "./boost";

export enum ProductId {
    'FLEX' = 'FLEX',
    'MAX' = 'MAX'
}

export type PricingFormat = 'UP_TO_CURRENCY'| 'CURRENCY' | 'FROM_CURRENCY' | 'UP_TO_DATE'| 'DATE' | 'FROM_DATE' | 'STRING'

export type BoostOrAddonModelKey = string;

export interface BuildingsOrContentsCoverage {
    uuid: string;
    sum_insured: number;
    voluntary_excess_min: number,
    voluntary_excess_max: number,
    personal_possessions_cover_limit?: number;
    addons: {
        [k: BoostOrAddonModelKey]: AddonDoc
    }
}

export interface ProductDoc {
    uuid: string;
    name: 'flex' | 'max';
    description: string;
    buildings_coverage: BuildingsOrContentsCoverage;
    contents_coverage: BuildingsOrContentsCoverage;
    addons: {
        [k: BoostOrAddonModelKey]: AddonDoc;
    };
    boosts: BoostDoc[];
}

export class Product {

    uuid: string;
    name: string;
    description: string;

    private buildingsCoverage: BuildingsOrContentsCoverage;
    private contentsCoverage: BuildingsOrContentsCoverage;
    private addons: AddonDoc[]
    private boosts: BoostDoc[]

    constructor (doc: ProductDoc) {
        
        this.uuid = doc.uuid
        this.name = doc.name
        this.description = doc.description
       
        this.buildingsCoverage =   doc.buildings_coverage
        this.contentsCoverage =  doc.contents_coverage

        const contentsAddons = Object.values(doc.contents_coverage.addons).map(addon => {
            return DecorateApiAddon(addon, 'contents_coverage')
        })

        const buildingsAddons = Object.values(doc.contents_coverage.addons).map(addon => {
            return DecorateApiAddon(addon, 'buildings_coverage')
        })

        const rootAddons = Object.values(doc.addons).map(addon => {
            return DecorateApiAddon(addon, 'root')
        })
        
        this.addons = [
            ...contentsAddons,
            ...buildingsAddons,
            ...rootAddons,
        ]

        this.boosts = doc.boosts.map(b => {
            return DecorateApiBoost(b, b.type)
        })

    }

    getBoosts() {
        return this.boosts ?? []
    }

    getAddons () {
        return this.addons
    }

    getContentsSumInsured () {
        return this.buildingsCoverage.sum_insured
    }

    getBuildingsSumInsured () {
        return this.contentsCoverage.sum_insured
    }

    getHighRiskItemsSumInsured () {
        return this.contentsCoverage.personal_possessions_cover_limit
    }
}

export const currProduct = (products : ProductDoc[]) => {
    return products.find(p => p.name === 'flex')
}