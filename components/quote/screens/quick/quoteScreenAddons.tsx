'use client'

import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { FooterMode, ScreenFooterComponent } from "@/components/quote/widgets/screenFooter"
import { AddonsListComponent } from "@/components/quote/widgets/addons"
import { TxtPara, TxtTitlePage, TxtTitleSub } from "@/components/util/txt"

import { StorableObj } from "@/src/models/form"
import { currentOfferByProduct } from "@/src/models/offer"

import { QQResponseStateContext } from "@/src/stores/contexts/quickQuoteStateContext"
import { QuoteScreen, QuoteScreenIdToUrl } from "@/src/stores/staticQuoteJourneyDefinition"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"

import { useQuoteRefinement } from "@/src/hooks/useQuoteRefinement"
import { useUmbrlForm } from "@/src/hooks/useUmbrlForm"

import { refineAddonsPatchDoc } from "@/src/api/patchers/addons"
import { useProducts } from "@/src/hooks/useProducts"
import { QuotePremiumComponent } from "@/components/quote/widgets/quotePremium"

export enum AddonLevels  {
    NONE='No ad cover',
    LIMITED='Limited ad cover',
    FULL='Full ad cover',
}

export const QuoteScreenAddonsComponent = ({ screenDefinition }: { screenDefinition: QuoteScreen }) => {

    const products = useProducts()

    const [screendatavalid, setScreendataValid] = useState<StorableObj[] | null>(null)
    
    const localCtx = useContext(LocalStateContext)
    const ctxQuickQuote = useContext(QQResponseStateContext)

    const router = useRouter()

    const offer = ctxQuickQuote?.state && products ? 
        currentOfferByProduct(ctxQuickQuote?.state, products) : 
        null

    const formDataManager = useUmbrlForm(
        screenDefinition.opts, 
        screenDefinition.apisection, 
        localCtx, 
        ctxQuickQuote, 
        setScreendataValid
    )

    const [refined, refining, setRefining] = useQuoteRefinement({
        quoteState: ctxQuickQuote?.state ?? null,
        quoteDispatch: ctxQuickQuote?.dispatch ?? null,
        localState: localCtx?.state ?? null,
        localDispatch: localCtx?.dispatch ?? null,
        patchFn: refineAddonsPatchDoc,
        testing: true
    })

    const nextScreen = screenDefinition.sidnext
    // @ts-ignore
    const nextUrl = QuoteScreenIdToUrl[nextScreen]

    useEffect(() => {

        if (refined) {
            router.push(nextUrl)
        }

    }, [refined, setRefining])

    return <>
        <div className="screen screen-with-price">
            <TxtTitlePage
                txt="Choose your Addons"
    
            />
            {/* <TxtPara
                txt="Fine tune your policy by adding accidental damage protection."
            /> */}
            {
                offer ? 
                <AddonsListComponent
                    productAddons={ offer?.product.getAddons() ?? [] }
                    selectedOffer={ offer }
                    onValid= { (d: StorableObj[]) => {

                        formDataManager?.saveScreenData(d, true)
                        
                        setScreendataValid(d)
                       
                    }}
                />: null
            }
                     
            <TxtPara
                txt="Your quote is valid for 24hrs"
            />
        </div>
        <div className="screen-footer no-cancel">
            <ScreenFooterComponent
                screenDefinition={ screenDefinition }
                screenValid={ true }
                noRouting={ true }
                onNext={ () =>  {

                    // if (screendatavalid !== null) {

                        // formDataManager.saveScreenData(screendatavalid, true)

                        // @ts-ignore
                        setRefining()
                    // } else {
                    //     router.push(nextUrl)
                    // }
                }}
            />
            { 
                offer && localCtx?.state ? 
                    <QuotePremiumComponent 
                        offer={ offer } 
                        localState={ localCtx.state }
                    /> : 
                    null 
            }
        </div>
    </>
}