'use client'

import { useContext, useState } from "react"

import { QuoteOpt, QuoteScreen } from "@/src/stores/staticQuoteJourneyDefinition"

import { ScreenMode } from "@/src/types"

import { UmbrlForm } from "@/src/models/form"
import { populateOptsFromQuote } from "@/src/models/quote"
import { QQResponseStateContext } from "@/src/stores/contexts/quickQuoteStateContext"
import { ExpandableSection } from "@/components/quote/widgets/expandableSection"
import { BtnComponent, UmbrlButton } from "@/components/libForm/btn"
import { ComparePoliciesComponent } from "@/components/quote/widgets/comparePolicies"
import { TxtListItem, TxtNoteEvidence, TxtPara, TxtTitlePage, TxtTitleSection, TxtTitleSub, TxtTitleUmbrl } from "@/components/util/txt"
import { useQuoteRetrieval } from "@/src/hooks/useQuoteRetrieval"
// import { useQuotePremiumBoost } from "@/src/hooks/useQuotePremiumBoost"
import { currentOfferByProduct } from "@/src/models/offer"
import { formatCurrency } from "@/src/util/currency"
import { MetadataStateContext } from "@/src/stores/contexts/metadataStateContext"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
import { useProducts } from "@/src/hooks/useProducts"

export const PolicyFeaturesComponent = ({ screenDefinition, mode }: { 
            screenDefinition: QuoteScreen;
            mode: ScreenMode;
        }) => {
    
    // const metadataCtx = useContext(MetadataStateContext)
    const localCtx = useContext(LocalStateContext)
    const qqCtx = useContext(QQResponseStateContext)
    
    const products = useProducts()
    useQuoteRetrieval({ state: qqCtx?.state ?? null, dispatch: qqCtx?.dispatch ?? null })

    // const products = metadataCtx?.state?.products
    
    const offer = qqCtx?.state && products ? currentOfferByProduct(qqCtx?.state, products) : null
    // const boostedVal = useQuotePremiumBoost(offer?.premium ?? 0)

    const [compare, setCompare] = useState(false)
    
    const formDataManager = new UmbrlForm(
        screenDefinition.opts, 
        screenDefinition.apisection, 
        localCtx?.state ?? null, 
        localCtx?.dispatch  ?? null
    )

    // let populatedOpts = populateOptsFromQuote(screenDefinition.opts, formDataManager.storageKey ?? '', qqCtx?.state) as QuoteOpt[]
    
    // formDataManager.syncQuoteDataOpts(populatedOpts)

    return <>
        <TxtTitlePage
                txt={ "You're all set." }
                icon="/party.svg"
            />
            <div className="choose-features">
            
            <div className="block-generic block-bg">
                <TxtTitleUmbrl
                    txt="UMBRL FLEX"
                />
                <TxtNoteEvidence txt="Buildings and Contents" />
                <TxtTitleSub
                    txt={ offer?.premium ? offer.formattedPremium() :  '' }
                    isCentered={ true }
                />
                <TxtPara txt="Your cover includes:" />
                <ul className="list-check">
                    <TxtListItem txt="Unlimited building cover;" icon="fa fa-check-circle" />
                    <TxtListItem txt="Contents ver up to &pound;75.000" icon="fa fa-check-circle" />
                    <TxtListItem txt="24/7 Claims emergency support" icon="fa fa-check-circle" />
                </ul>
                <ExpandableSection
                    aria_label= "test"
                    title= "View all features"
                    subtitle= { null }
                    body={[]}
                >
                    <ul className="list-check">
                        <TxtListItem txt="Unlimited building cover;" icon="fa fa-check-circle" />
                        <TxtListItem txt="Contents cover up to &pound;75.000" icon="fa fa-check-circle" />
                        <TxtListItem txt="24/7 Claims emergency support" icon="fa fa-check-circle" />
                    </ul>
                </ExpandableSection>
            </div>       
            <TxtTitleSub
                txt="Before you pay:"
            />
            <div className="block-generic block-bg">
                <TxtTitleUmbrl
                    txt="UMBRL MAX"
                />
                <TxtNoteEvidence
                    txt="For only &pound;25.75 more, you can get our maximum and all-round protection."
                />
                <TxtPara
                    txt="Get everything in FLEX, plus:"
                />
                <ul className="list-check">
                    <TxtListItem txt="Unlimited building cover;" icon="fa fa-check-circle" />
                    <TxtListItem txt="Contents ver up to &pound;75.000" icon="fa fa-check-circle" />
                    <TxtListItem txt="24/7 Claims emergency support" icon="fa fa-check-circle" />
                </ul>
                <div className="step-footer">
                    <BtnComponent
                        onClick={ () => setCompare(true) }
                        type={ UmbrlButton.GENERIC }
                        label="Compare FLEX to MAX"
                    />
                    <BtnComponent
                        onClick={ () => void 0 }
                        type={ UmbrlButton.GENERIC }
                        label="Switch to Max"
                    />
                </div>
                
            </div>  
            <div className="block-generic">
                <TxtPara
                    txt="Don’t want to upgrade? No problem. Just hit the button to pay for Flex."
                />
            </div>
            {
                compare ?
                <ComparePoliciesComponent 
                    isOpen={ compare }
                    setIsOpen={ setCompare }
                />:
                null
            }
    </div>
    </>
}