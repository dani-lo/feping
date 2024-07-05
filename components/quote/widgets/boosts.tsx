import { useContext, useEffect, useState } from "react"
import { Switch } from "@nextui-org/react"
import { motion } from "framer-motion"

import { StorableObj, UmbrlForm } from "@/src/models/form"

import { QuoteOpt, QuoteOptType } from "@/src/stores/staticQuoteJourneyDefinition"

import { abbreviateCurrency, formatCurrency } from "@/src/util/currency"
import { pricingFormatDays } from "@/src/util/time"

import { ExpandableSection } from "@/components/quote/widgets/expandableSection"

import { PricingFormat } from "@/src/models/product"
import { TxtNoteEvidence, TxtPara, TxtTitleSection, TxtTitleSub } from "@/components/util/txt"
import { BtnToggleComponent } from "@/components/libForm/btnToggle"
import { useAtom } from "jotai"
import { uiStateAboutModal, uiStateRefreshAtom } from "@/src/stores/jotai/uiState"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
import { QuoteOffer } from "@/src/models/offer"
import { BoostDoc, boostPricingFormat, mergeBoostFeatures } from "@/src/models/boost"
import { PillComponent } from "./pill"

export type ApiBoostsToggles = {
    [k: string] : boolean;
}

export const BoostsListComponent = ({ productBoosts, onValid, selectedOffer }: {
    productBoosts: BoostDoc[];
    selectedOffer: QuoteOffer;
    onValid : (d: StorableObj[]) => void;
}) => {


    const [_a, setAboutModal] = useAtom(uiStateAboutModal)
    const localCtx = useContext(LocalStateContext)

    const [boostsSelection, setBoostsSelection] = useState(productBoosts.reduce((acc: any, boost: BoostDoc) => {

        acc[boost.model_key] = null

        return acc
    }, {}))

    useEffect(() => {

        const selectionNew = productBoosts.reduce((acc: any, boost: BoostDoc) => {

            const apiVal = selectedOffer.boost_selection[boost.model_key]
            const storageVal = UmbrlForm.manualRead('toogles', 'boosts', boost.model_key)

            acc[boost.model_key] = apiVal ?? storageVal ?? false
    
            return acc
        }, {})

        setBoostsSelection(selectionNew)
    }, [])

    return productBoosts.map((boost: BoostDoc) => {

        const price = selectedOffer.tooglePrice(boost.pricing_key)

        const isBoosted = !!boostsSelection[boost.model_key]

        let toggleValues = !isBoosted ? [
            {
                label: 'Included',
                val: 'included'
            },
            {
                label: `Flex it up for ${ formatCurrency(price) }`,
                val: boost.model_key
            }
        ] :  [
            {
                label: `Remove (-${ formatCurrency(price) })`,
                val: 'included'
            },
            {
                label: 'Included',
                val: boost.model_key
            }
        ]

        const mergedFeatures = mergeBoostFeatures(boost.features.standard, boost.features.upgraded)

        return <PillComponent
            title={ boost.title + ' boost'}
            icons={ {
                title: null,
                action: 'fa fa-question'
            } }
            onAction={  () => setAboutModal(null)  }
            expanded={ false }
            active={ false }
            key={ boost.model_key }
        >
            <div  className={ `pricing-toggle-widget${ isBoosted ? ' selected' : '' }` }>
                <BtnToggleComponent
                    values={ toggleValues }
                    selected={ isBoosted ? boost.model_key : 'included'  }
                    onSelect={ (v) => {

                        const newSelection = { ...boostsSelection, [boost.model_key]: v === boost.model_key }

                        setBoostsSelection({ ...newSelection })

                        if (localCtx?.dispatch) {
                            UmbrlForm.manualSave(localCtx?.dispatch,'toogles', 'boosts', boost.model_key, newSelection[boost.model_key])
                        }
                    }}
                />
                {
                    mergedFeatures.map((feature, i) => {
                        return <BoostFeaturesDetailComponent
                            key={ i }
                            feature={ feature }
                            single={ mergedFeatures.length === 1 }
                        />
                    })
                }
                {
                    mergedFeatures.length > 3 ?
                        <ExpandableSection
                            aria_label="view all features"
                            title="view all fatures"
                            subtitle={ null }
                            body={ [] }
                        >
                            {
                                mergedFeatures.slice(3, mergedFeatures.length).map((feature, i) => {
                                    return <BoostFeaturesDetailComponent
                                        key={ feature.label }
                                        feature={ feature }
                                    />
                                })
                            }
                        </ExpandableSection>:
                        null
                }
            </div>
           
        </PillComponent>

        // return <div  className={ `pill-widget pricing-toggle-widget${ isBoosted ? ' selected' : '' }` }  key={ boost.model_key }>
        //     <div className="pricing-title-section fxrow">
        //         <TxtTitleSub txt={ boost.title } />
        //         <div className="pill-icon" onClick={ () => setAboutModal(null) } >
        //             <i className="question-icon fa fa-question" />
        //         </div>
        //     </div>
        //     <BtnToggleComponent
        //         values={ toggleValues }
        //         selected={ isBoosted ? boost.model_key : 'included'  }
        //         onSelect={ (v) => {

        //             const newSelection = { ...boostsSelection, [boost.model_key]: v === boost.model_key }

        //             setBoostsSelection({ ...newSelection })

        //             if (localCtx?.dispatch) {
        //                 UmbrlForm.manualSave(localCtx?.dispatch,'toogles', 'boosts', boost.model_key, newSelection[boost.model_key])
        //             }
        //         }}
        //     />
        //     {
        //         mergedFeatures.map((feature, i) => {
        //             return <BoostFeaturesDetailComponent
        //                 key={ i }
        //                 feature={ feature }
        //                 single={ mergedFeatures.length === 1 }
        //             />
        //         })
        //     }
        //     {
        //         mergedFeatures.length > 3 ?
        //             <ExpandableSection
        //                 aria_label="view all features"
        //                 title="view all fatures"
        //                 subtitle={ null }
        //                 body={ [] }
        //             >
        //                 {
        //                     mergedFeatures.slice(3, mergedFeatures.length).map((feature, i) => {
        //                         return <BoostFeaturesDetailComponent
        //                             key={ feature.label }
        //                             feature={ feature }
        //                         />
        //                     })
        //                 }
        //             </ExpandableSection>:
        //             null
        //     }
        // </div>
    })
}


const BoostFeaturesDetailComponent = ({ feature, single }: { single?: boolean, feature: {
    value: {
        standard: { val: number | string, type: PricingFormat };
        upgraded: { val: number  | string, type: PricingFormat };
    };
    label: string;
    description: string | null;
}}) => {

    if (feature.value.upgraded === null || feature.value.standard === null) {
        return null
    }

    return <div className="pricing-detail-item">
        { !single ?
        <TxtNoteEvidence
            txt={ feature.label }
        />: null}
        { feature.description ? <TxtPara txt={ feature.description } /> : null }
        <div>
            <TxtNoteEvidence
                txt={ boostPricingFormat(feature.value.standard.type, feature.value.standard.val) }
            />
            <TxtNoteEvidence
                txt={ boostPricingFormat(feature.value.upgraded.type, feature.value.upgraded.val) }
            />
        </div>
    </div>
}

// export const BoostsComponent = ({ boosts, formDataManager, opts, selectedPolicy, disableAnimation, onValid}: {
//     boosts: BoostDoc[];
//     formDataManager: UmbrlForm;
//     opts: QuoteOpt[];
//     selectedPolicy: PolicyType | null;
//     disableAnimation ?: boolean;
//     onValid : (d: StorableObj[]) => void;
// }) => {

//     const [_a, setAboutModal] = useAtom(uiStateAboutModal)
//     const [boosts, setBoosts] = useState<ApiBoostsToggles | null>(null)

//     const [refresh, _r] = useAtom(uiStateRefreshAtom)

//     const udata = useUat(refresh)

//     useEffect(() => {

//         if (boosts === null) {

//             const newBoosts = opts.reduce((acc: ApiBoostsToggles, curr) => {

//                 acc[curr.apikey] = formDataManager.keyVal(curr.apikey)

//                 return acc
//             }, {} as ApiBoostsToggles)

//             setBoosts(newBoosts)

//             const toSave : StorableObj[] = Object.keys(newBoosts).map(apikey => {
//                 return {
//                     apikey,
//                     val: newBoosts[apikey]
//                 }
//             })

//             onValid(toSave)

//         }
//     }, [formDataManager.ready(true)])

//     return DefsTmp(udata).map((def, i) => {

//         if (def.id === 'EMERGENCY_BUILDINGS_BOOST') {
//             return null
//         }

//         if (selectedPolicy === PolicyType.BUILDINGS && def.id === 'CONTENTS_LIMIT_BOOST') {
//             return null
//         }

//         if (selectedPolicy === PolicyType.CONTENTS && def.id === 'BUILDINGS_LIMIT_BOOST') {
//             return null
//         }

//         const isBoosted = boosts && boosts[def.id]

//         let toggleValues = !isBoosted ? [
//             {
//                 label: 'Included',
//                 val: 'included'
//             },
//             {
//                 label: 'Flex it up for £25',
//                 val: def.id
//             }
//         ] :  [
//             {
//                 label: 'Remove (-£25)',
//                 val: 'included'
//             },
//             {
//                 label: 'Included',
//                 val: def.id
//             }
//         ]

//         return  <div 
//                 className={ `pill-widget pricing-toggle-widget${ isBoosted ? ' selected' : '' }` } 
//                 key={ def.id }
//             >
//             <div className="pricing-title-section fxrow">
//                 <TxtTitleSub txt={ def.title } />
//                 <div className="pill-icon" onClick={ () => setAboutModal(def.id) } >
//                     <i className="question-icon fa fa-question" />
//                 </div>
//             </div>
            
//             <BtnToggleComponent
//                 values={ toggleValues }
//                 selected={ isBoosted ? def.id : 'included'  }
//                 onSelect={ (v) => {

//                     const newBoosts = { ...boosts, [def.id]: v === def.id }

//                     setBoosts({ ...newBoosts })

//                     const toSave : StorableObj[] = Object.keys(newBoosts).map(apikey => {
//                         return {
//                             apikey,
//                             val: newBoosts[apikey]
//                         }
//                     })  

//                     // console.log(toSave)

//                     onValid(toSave)
//                 }}
//             />
           
//             {
//                 def.features.slice(0, 3).map((feature, i) => {
//                     return <BoostFeaturesDetailCOmponent
//                         key={ feature.id }
//                         feature={ feature }
//                         single={ def.features.length === 1 }
//                     />
//                 })
//             }
//             {
//                 def.features.length > 3 ?
//                     <ExpandableSection
//                         aria_label="view all features"
//                         title="view all fatures"
//                         subtitle={ null }
//                         body={ [] }
//                     >
//                         {
//                             def.features.slice(3, def.features.length).map((feature, i) => {
//                                 return <BoostFeaturesDetailCOmponent
//                                     key={ feature.id }
//                                     feature={ feature }
//                                 />
//                             })
//                         }
//                     </ExpandableSection>:
//                     null
//             }
//         </div>
//     })
// }

// const DefsTmp = (udata: UatData) => [
//     {
//         "id": "BUILDINGS_LIMIT",
//         "title": "Buildings limit boost",
        
//         "about": [
//             'Lorem ipso dolor sit amet etiam non adepiscit suam det nostram sali cum laudis, etiam suam non sapet rubiconis dado tractus es, et veni vidi vici', 
//             'When insuring something for this section we shuld explan what each boost means to users - in the veent it might not be evident',
//         ],
//         "features": [
//             {
//                 "id": "7f0a5d8b-0320-4347-a9ae-eb394f2c54fb",
//                 "label": "Your house insured",
//                 "text": "Increase the limit of your buildings cover.",
//                 "value": {
//                     "std": udata.rebuildCost,
//                     'bst': 1000000
//                 },
//                 "type": "UP_TO_CURRENCY" as PricingFormat
//             },

//         ]
//     },
//     {
//         "id": "CONTENTS_LIMIT",
//         "title": "Contents limit boost",
//         "about": [
//             'Lorem ipso dolor sit amet etiam non adepiscit suam det nostram sali cum laudis, etiam suam non sapet rubiconis dado tractus es, et veni vidi vici', 
//             'When insuring something for this section we shuld explan what each boost means to users - in the veent it might not be evident',
//         ],
//         "features": [
//             {
//                 "id": "25bc34ae-6cff-459b-bd2e-55c6923496cb",
//                 "label": "Contents insurance",
//                 "text": "Increase the limit of your contents cover.",
//                 "value": {
//                     "std": udata.contentValue,
//                     'bst': 100000
//                 },
//                 "type": "UP_TO_CURRENCY" as PricingFormat
//             },
//             {
//                 "id": "dbd01863-0308-448b-b8eb-d9c3fe7d475f",
//                 "label": "High-risk items",
//                 "text": "Protection of high value items that can be stolen   or damaged.",
//                 "value": {
//                     "std": 12000,
//                     "bst": 20000
//                 },
//                 "type": "UP_TO_CURRENCY" as PricingFormat
//             },
//             // {
//             //     "id": "eee8bfec-b4d4-4874-ad9c-8b7da7e57e6f",
//             //     "label": "Money at home",
//             //     "value": {
//             //         "std": 500,
//             //         "bst": 5000
//             //     },
//             //     "type": "UP_TO_CURRENCY" as PricingFormat
//             // }
//         ]
//     },
//     {
//         "id": "AWAY_FROM_THE_HOME", 
//         "title": "Away from home boost",
//         "about": [
//             'Lorem ipso dolor sit amet etiam non adepiscit suam det nostram sali cum laudis, etiam suam non sapet rubiconis dado tractus es, et veni vidi vici', 
//             'When insuring something for this section we shuld explan what each boost means to users - in the veent it might not be evident',
//         ],
//         "features": [
//             {
//                 "label": "Personal Possessions",
//                 "text": "Increase cover limit for valuables when you take them away from home.",
//                 "value": {
//                     "standard": 2000,
//                     "upgraded": 5000
//                 },
//                 "type": "UP_TO_CURRENCY" as PricingFormat
//             },
//             {
//                 "id": "0d1740a9-27d9-4697-98fd-18de855b9dab",
//                 "label": "Unoccupancy period",
//                 "text": "For when you spend extended time away from the property.",
//                 "value": {
//                     "std": 30,
//                     "bst": 40
//                 },
//                 "type": "UP_TO_DAYS" as PricingFormat
//             },
//             // {
//             //     "id": "70c519bd-cecb-4a2f-acf8-1e618720024d",
//             //     "label": "Loss or theft of keys",
//             //     "value": {
//             //         "std": 500,
//             //         "bst": 5000
//             //     },
//             //     "type": "UP_TO_CURRENCY" as PricingFormat
//             // }
//         ]
//     },
//     {
//         "id": "EMERGENCY", 
//         "title": "Emergency  boost",
//         "about": [
//             'Lorem ipso dolor sit amet etiam non adepiscit suam det nostram sali cum laudis, etiam suam non sapet rubiconis dado tractus es, et veni vidi vici', 
//             'When insuring something for this section we shuld explan what each boost means to users - in the veent it might not be evident',
//         ],
//         "features": [
//             {
//                 "id": "f309e3db-cea9-46b4-8be8-428c0b23f062",
//                 "label": "Alternative accomodation",
//                 "text": "The cost of alternative accommodation if you can’t stay in your home.",
//                 "value": {
//                     "std": 30000,
//                     "bst": 100000
//                 },
//                 "type": "UP_TO_CURRENCY" as PricingFormat
//             },
//             // {
//             //     "id": "0d1740a9-27d9-4697-98fd-18de855b9dab",
//             //     "label": "Unoccupancy period",
//             //     "value": {
//             //         "std": 45,
//             //         "bst": 450
//             //     },
//             //     "type": "UP_TO_DAYS" as PricingFormat
//             // },
//             {
//                 "id": "70c519bd-cecb-4a2f-acf8-1e618720024d",
//                 "label": "Stolen keys",
//                 "text": "The cost of replacing keys and locks when stolen.",
//                 "value": {
//                     "std": 300,
//                     "bst": 500
//                 },
//                 "type": "UP_TO_CURRENCY" as PricingFormat
//             }
//         ]
//     },
//     {
//         "id": "GARDEN", 
//         "title": "Garden boost",
//         "about": [
//             'Lorem ipso dolor sit amet etiam non adepiscit suam det nostram sali cum laudis, etiam suam non sapet rubiconis dado tractus es, et veni vidi vici', 
//             'When insuring something for this section we shuld explan what each boost means to users - in the veent it might not be evident',
//         ],
//         "features": [
//             {
//                 "id": "29f83d03-c48b-4475-bcf5-fb37032dd1b7",
//                 "label": "Outdoor items",
//                 "text": "Cover for items in your garden.",
//                 "value": {
//                     "std": 0,
//                     "bst": 1000
//                 },
//                 "type": "UP_TO_CURRENCY" as PricingFormat
//             },
//             {
//                 "id": "57ef5ecb-e189-41dc-b285-a188e217ea6f",
//                 "label": "Theft from outbuildings",
//                 "text": "When items get stolen from buildings outside of your main property.",
//                 "value": {
//                     "std": 0,
//                     "bst": 2000
//                 },
//                 "type": "UP_TO_CURRENCY" as PricingFormat
//             },
//             // {
//             //     "id": "b2e2c456-12ab-43af-aa71-1e117d94e2fe",
//             //     "label": "Business equipment",
//             //     "value": {
//             //         "std": 3000,
//             //         "bst": 30000
//             //     },
//             //     "type": "UP_TO_CURRENCY" as PricingFormat
//             // }
//         ]
//     },
//     {
//         "id": "SAFETY", 
//         "title": "Safety boost",
//         "about": [
//             'Lorem ipso dolor sit amet etiam non adepiscit suam det nostram sali cum laudis, etiam suam non sapet rubiconis dado tractus es, et veni vidi vici', 
//             'When insuring something for this section we shuld explan what each boost means to users - in the veent it might not be evident',
//         ],
//         "features": [

//             {
//                     "id": "b2e2c456-12ab-43af-aa71-1e117d94e2fe",
//                     "label": "Business equipment",
//                     "text": "When items get stolen from buildings outside of your main property.",
//                     "value": {
//                         "std": 500,
//                         "bst": 3000
//                     },
//                     "type": "UP_TO_CURRENCY" as PricingFormat
//                 },
//                 {
//                     "id": "91686a21-bd88-4e20-9d5c-ca680fd76f2b",
//                     "label": "Deeds and documents",
//                     "text":"When items get stolen from buildings outside of your main property.",
//                     "value": {
//                         "std": 0,
//                         "bst": 1000
//                     },
//                     "type": "UP_TO_CURRENCY" as PricingFormat
//                 },
//         ]
//     },
//     // {
//     //     "id": "CONTENTS_AD",
//     //     "title": "Contents accidental damage",
//     //     "features": [
//     //         {
//     //             "id": "8e6c6cc1-c615-4e8a-9e41-beda03aea1cb",
//     //             "label": "Accidental protection",
//     //             "value": {
//     //                 "std": 100000,
//     //                 "bst": 1000000
//     //             },
//     //             "type": "UP_TO_CURRENCY" as PricingFormat
//     //         }
//     //     ]
//     // },
//     // {
//     //     "id": "LEGAL_FEES_PROTECTION",
//     //     "title": "Legal fees protection",
//     //     "features": [
//     //         {
//     //             "id": "544011c5-de82-4f3f-8302-211dc59d72ba",
//     //             "label": "Accidental protection",
//     //             "value": {
//     //                 "std": 500000000,
//     //                 "bst": 5000000000
//     //             },
//     //             "type": "UP_TO_CURRENCY" as PricingFormat
//     //         }
//     //     ]
//     // }
// ]