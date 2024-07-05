'use client'

import { useContext, useEffect, useState } from "react"

import { TxtNoteEvidence, TxtPara, TxtTitlePage, TxtTitleSection, TxtTitleSub, TxtTitleUmbrl } from "@/components/util/txt"

import { StorableObj, UmbrlForm } from "@/src/models/form"

import { LocalStateContext } from "@/src/stores/contexts/localStateContext"

import { formatCurrency } from "@/src/util/currency"

import { useAtom } from "jotai"
import { uiStateAboutModal } from "@/src/stores/jotai/uiState"
import { AddonDescriptions, AddonDoc, AddonLevel, AddonLevelDescriptions } from "@/src/models/addon"
import { AddonKey, QuoteOffer } from "@/src/models/offer"
import { PillComponent } from "./pill"

const HardCodedAddonSectionTitles = {
    buildings_accidental_damage: 'Accidental Damage',
    home_emergency_cover: 'Home Emergencies',
    legal_expenses_cover: 'Legal Expenses'

} 

export const AddonsListComponent = ({ productAddons, selectedOffer, onValid } : {
    productAddons: AddonDoc[];
    selectedOffer: QuoteOffer;
    onValid : (d: StorableObj[]) => void;
}) => {
    
    const [_a, setAboutModal] = useAtom(uiStateAboutModal)

    const localCtx = useContext(LocalStateContext)

    const [addonsSelection, setAddonsSelection] = useState(productAddons.reduce((acc: any, addon: AddonDoc) => {

        acc[addon.model_key] = null

        return acc
    }, {}))

    useEffect(() => {
        const selectionNew = productAddons.reduce((acc: any, addon: AddonDoc) => {

            // const apiVal = selectedOffer.addons_selection[addon.model_key]
            const storageVal = UmbrlForm.manualRead('toogles', 'addons', addon.model_key)

            if (storageVal !== null && storageVal !== undefined) {
                acc[addon.model_key] = storageVal
            } else {
                acc[addon.model_key] = addon.default_level ?? null
            }
    
            return acc
        }, {})

        setAddonsSelection(selectionNew)
    }, [])

    const onSelectAddon = (addonModelKey: AddonKey, val: string | boolean) => {

        const newSelection = { ...addonsSelection, [addonModelKey]: val }

        setAddonsSelection({ ...newSelection })

        if (localCtx?.dispatch) {
            UmbrlForm.manualSave(localCtx?.dispatch,'toogles', 'addons', addonModelKey, newSelection[addonModelKey])
        }
    }


    return productAddons.map((addon: AddonDoc) => {
        // @ts-ignore
        const sectionTitle = HardCodedAddonSectionTitles[addon.model_key]
        
        return <>
        {
            sectionTitle? 
            <TxtTitleSub txt={ sectionTitle } />:
            null
        }
        <PillComponent
                title={ addon.title }
                icons={ {
                    title: null,
                    action: 'fa fa-question'
                } }
                onAction={  () => setAboutModal(null)  }
                expanded={ false }
                active={ false }
                key={ addon.model_key }
            >
            <TxtPara txt={ AddonDescriptions[addon.model_key] } />

            {
                addon.hasOwnProperty('default_level') ?
                    <div>
                        <AddonButtonComponent
                            title="No Cover"
                            // @ts-ignore
                            text={ AddonLevelDescriptions[addon.model_key][AddonLevel.NONE] }
                            price={ 0 }
                            selected={ addonsSelection[addon.model_key] ===  AddonLevel.NONE }
                            onSelectAddon={ () => onSelectAddon(addon.model_key, AddonLevel.NONE) }
                        />
                        <AddonButtonComponent
                            title="Limited Cover"
                            // @ts-ignore
                            text={ AddonLevelDescriptions[addon.model_key][AddonLevel.LIMITED] }
                            price={ selectedOffer.priceFor(addon.pricing_key_limited) }
                            selected={ addonsSelection[addon.model_key]  ===  AddonLevel.LIMITED }
                            onSelectAddon={ () => onSelectAddon(addon.model_key, AddonLevel.LIMITED) }
                        />
                        <AddonButtonComponent
                            title="Full Cover"
                            // @ts-ignore
                            text={ AddonLevelDescriptions[addon.model_key][AddonLevel.FULL] }
                            price={ selectedOffer.priceFor(addon.pricing_key_full) }
                            selected={ addonsSelection[addon.model_key]  ===  AddonLevel.FULL }
                            onSelectAddon={ () => onSelectAddon(addon.model_key, AddonLevel.FULL) }
                        />
                    </div>:
                    <div>
                        <AddonButtonComponent
                            title="Home Emergency Cover"
                            price={ selectedOffer.priceFor(addon.pricing_key) }
                            selected={ !!addonsSelection[addon.model_key] }
                            onSelectAddon={ () => onSelectAddon(addon.model_key, !addonsSelection[addon.model_key])}
                        />
                    </div>
            }

        </PillComponent>
        </>

        // return <div className="pill-widget addon-widget" >
        //     <div className="fxrow">   
        //         <TxtTitleSub txt={ addon.title } />
        //         <div onClick={ () => setAboutModal(null) } className="pill-icon">
        //             <i className="question-icon fa fa-question" />
        //         </div>
        //     </div>
        //     <TxtPara txt={ AddonDescriptions[addon.model_key] } />
        //     {
        //         addon.hasOwnProperty('default_level') ?
        //             <div>
        //                 <AddonButtonComponent
        //                     title="No Cover"
        //                     // @ts-ignore
        //                     text={ AddonLevelDescriptions[addon.model_key][AddonLevel.NONE] }
        //                     price={ 0 }
        //                     selected={ addonsSelection[addon.model_key] ===  AddonLevel.NONE }
        //                     onSelectAddon={ () => onSelectAddon(addon.model_key, AddonLevel.NONE) }
        //                 />
        //                 <AddonButtonComponent
        //                     title="Limited Cover"
        //                     // @ts-ignore
        //                     text={ AddonLevelDescriptions[addon.model_key][AddonLevel.LIMITED] }
        //                     price={ selectedOffer.priceFor(addon.pricing_key_limited) }
        //                     selected={ addonsSelection[addon.model_key]  ===  AddonLevel.LIMITED }
        //                     onSelectAddon={ () => onSelectAddon(addon.model_key, AddonLevel.LIMITED) }
        //                 />
        //                 <AddonButtonComponent
        //                     title="Full Cover"
        //                     // @ts-ignore
        //                     text={ AddonLevelDescriptions[addon.model_key][AddonLevel.FULL] }
        //                     price={ selectedOffer.priceFor(addon.pricing_key_full) }
        //                     selected={ addonsSelection[addon.model_key]  ===  AddonLevel.FULL }
        //                     onSelectAddon={ () => onSelectAddon(addon.model_key, AddonLevel.FULL) }
        //                 />
        //         </div>:
        //         <div>
        //             <AddonButtonComponent
        //                 title="Home Emergency Cover"
        //                 price={ selectedOffer.priceFor(addon.pricing_key) }
        //                 selected={ !!addonsSelection[addon.model_key] }
        //                 onSelectAddon={ () => onSelectAddon(addon.model_key, !addonsSelection[addon.model_key])}
        //             />
        //         </div>
        //     }
        // </div>
    })
}

const AddonButtonComponent = ({ price, text, title, onSelectAddon, selected }: {
    price: number;
    title: string;
    onSelectAddon: () => void;
    selected: boolean;
    text?: string;
}) => {

    return <div className={ `${ selected ? 'selected ' : ''}addon-btn-widget` } onClick={ onSelectAddon }>
        <div className="addon-price-section">
            {
                selected ?
                <i className="fa fa-check-circle" />:
                <i className="fa fa-o" />
            }
            {
                selected ?
                <TxtNoteEvidence txt="selected" /> :
                <TxtNoteEvidence txt={ formatCurrency(price) } />
                
            }
            
        </div>
        <div className="addon-desc-section">
            <TxtNoteEvidence txt={ title } />
            { text ? <TxtPara txt={ text } /> : null }
         
        </div>
        
       
    </div>
}