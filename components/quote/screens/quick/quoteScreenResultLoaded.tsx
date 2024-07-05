'use client'

import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { FooterMode, ScreenFooterComponent } from "@/components/quote/widgets/screenFooter"

import { TxtTitleSub } from "@/components/util/txt"

import { StorableObj, UmbrlForm } from "@/src/models/form"
import { PricedQuoteOffer, QuoteOffer, QuoteOfferDoc, productUIdForProductName } from "@/src/models/offer"

import { QQResponseStateContext } from "@/src/stores/contexts/quickQuoteStateContext"
import { QuoteScreen, QuoteScreenId, QuoteScreenIdToUrl } from "@/src/stores/staticQuoteJourneyDefinition"

import { useQuoteRefinement } from "@/src/hooks/useQuoteRefinement"

import { refineOfferPatchDoc } from "@/src/api/patchers/offer"

import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
import { OfferDetailFlexComponent, OfferDetailMaxComponent } from "../../widgets/offerDetail"
import { useUmbrlForm } from "@/src/hooks/useUmbrlForm"
import { useProducts } from "@/src/hooks/useProducts"
import { currentPolicy } from "@/src/models/policy"

export const QuoteScreenResultLoadedComponent = ({ screenDefinition }: { screenDefinition: QuoteScreen }) => {

    const [screendatavalid, setScreendataValid] = useState<StorableObj[] | null>(null)
    const [selectedOffer, setSelectedOffer] = useState<string | null>(null)

    const localCtx = useContext(LocalStateContext)
    const ctxQuickQuote = useContext(QQResponseStateContext)

    const products = useProducts()
   
    const [refined, setRefining] = useQuoteRefinement({
        quoteState: ctxQuickQuote?.state ?? null,
        quoteDispatch: ctxQuickQuote?.dispatch ?? null,
        localState: localCtx?.state ?? null,
        localDispatch: localCtx?.dispatch ?? null,
        patchFn: refineOfferPatchDoc,
        testing: true
    })

    const formDataManager = useUmbrlForm(
        screenDefinition.opts,
        screenDefinition.apisection,
        localCtx,
        ctxQuickQuote,
        setScreendataValid
    )

    const quoteDoc = ctxQuickQuote?.state
    const router = useRouter()

    const nextScreen = screenDefinition.sidnext

    // @ts-ignore
    const nextUrl = QuoteScreenIdToUrl[nextScreen]

    const offers = quoteDoc?.offers as unknown as { [k: string ] : QuoteOfferDoc}
    const policySelected = currentPolicy(ctxQuickQuote?.state ?? null, null)

    useEffect(() => {

        if (refined) {
            const isMax = selectedOffer === maxOffer?.uuid

            router.push(isMax ? QuoteScreenIdToUrl[QuoteScreenId.CHOOSE_POLICY] : nextUrl)
        }
    }, [refined, setRefining])

    useEffect(() => {

        const prodSelectedOpt = (screendatavalid ?? []).find(sd => sd.apikey === 'selected_product_uuid') ?? null
        
        if (prodSelectedOpt && !!prodSelectedOpt.val) {
        
            const prodSelectedUuid = prodSelectedOpt.val
            
            if ([flexProduct?.uuid, maxProduct?.uuid].includes(prodSelectedUuid + '')) {
                setSelectedOffer(prodSelectedUuid + '')
            }
            
            
        }
    }, [screendatavalid])

    if (!quoteDoc) {
        return null
    }

    const flexOffer = offers ? Object.values(offers).find(offer => offer.product?.name === 'flex') as PricedQuoteOffer : null // TODO c'mon BE!!! .find(o => o.product_name.toLowerCase() === 'flex') : null
    const maxOffer = offers ? Object.values(offers).find(offer => offer.product?.name === 'max') as PricedQuoteOffer : null // TODO c'mon BE!!! .find(o => o.product_name.toLowerCase() === 'max') : null

    const flexProduct = products?.find(p => p.name === 'flex') ?? null
    const maxProduct = products?.find(p => p.name === 'max') ?? null

    const onSelectOffer = (productUid: string | null) => {

        setSelectedOffer(productUid)

        if (productUid === null) {
            setScreendataValid(null)
        } else {

            const validData = [{
                apikey: 'selected_product_uuid',
                val: productUid
            }]
            
            setScreendataValid(validData)
                    }
    }

    const flexProductUid = offers ? productUIdForProductName('flex' , offers) : null
    const maxProductUid = offers ? productUIdForProductName('max', offers) : null

    if (!flexProduct || !maxProduct || !flexOffer || !maxOffer || !policySelected) {
        throw('We can not display details for your offer, sorry.')
    }

    return <>
        <div className="screen">
             <TxtTitleSub
                txt="Flex or Max. You choose."
            />
            <div className="result-grid">
                {
                    flexOffer && policySelected ?
                    <OfferDetailFlexComponent
                        offer={ new QuoteOffer(flexOffer, flexProduct) }
                        onSelectOffer={ onSelectOffer }
                        selectedPolicy={ policySelected }
                        isSelected={ selectedOffer === flexProductUid }
                        productUid={ flexProductUid }
                    />:
                    null
                }
                {
                    maxOffer && policySelected ?
                    <OfferDetailMaxComponent
                        offer={ new QuoteOffer(maxOffer, maxProduct) }
                        onSelectOffer={ onSelectOffer }
                        selectedPolicy={ policySelected }
                        isSelected={ selectedOffer === maxProductUid }
                        productUid={ maxProductUid }
                    />:
                    null
                }
            </div>
        </div>
        <div className="screen-footer no-cancel">
            <ScreenFooterComponent
                screenDefinition={ screenDefinition }
                screenValid={ !!screendatavalid }
                noRouting={ true }
                onNext={ () =>  {
                    if (screendatavalid !== null) {

                        formDataManager.saveScreenData(screendatavalid, true)
                        // @ts-ignore
                        setRefining()
                    }
                }}
            />
        </div>
    </>
}