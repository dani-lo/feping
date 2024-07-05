'use client'

import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { FooterMode, ScreenFooterComponent } from "@/components/quote/widgets/screenFooter"
import { BoostsListComponent } from "@/components/quote/widgets/boosts"
import { ExcessesIntroComponent, ExcessesEditorComponent } from "@/components/quote/widgets/excesses"
import { InfoBlockComponent } from "@/components/quote/widgets/infoBlock"

import { TxtPara, TxtTitlePage, TxtTitleSection } from "@/components/util/txt"

import { StorableObj, UmbrlForm } from "@/src/models/form"
import { currentOfferByProduct } from "@/src/models/offer"

import { QQResponseStateContext } from "@/src/stores/contexts/quickQuoteStateContext"
import { QuoteOpt, QuoteScreen, QuoteScreenIdToUrl } from "@/src/stores/staticQuoteJourneyDefinition"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"

import { useQuoteRefinement } from "@/src/hooks/useQuoteRefinement"
import { useUmbrlForm } from "@/src/hooks/useUmbrlForm"

import { refineBoostsPatchDoc } from "@/src/api/patchers/boosts"
import { currentPolicy } from "@/src/models/policy"
import { useProducts } from "@/src/hooks/useProducts"
import { QuotePremiumComponent } from "../../widgets/quotePremium"


export const QuoteScreenBoostsComponent = ({ screenDefinition }: { screenDefinition: QuoteScreen }) => {

    const products = useProducts()

    const [buildingExcess, setBuildingExcess] = useState(0)
    const [contentsExcess, setContentsExcess] = useState(0)


    const [screendatavalid, setScreendataValid] = useState<StorableObj[] | null>(null)
    const [editxcs, setEditxc] = useState(false)

    const localCtx = useContext(LocalStateContext)
    const ctxQuickQuote = useContext(QQResponseStateContext)

    const [refined, refining, setRefining] = useQuoteRefinement({
        quoteState: ctxQuickQuote?.state ?? null,
        quoteDispatch: ctxQuickQuote?.dispatch ?? null,
        localState: localCtx?.state ?? null,
        localDispatch: localCtx?.dispatch ?? null,
        patchFn: refineBoostsPatchDoc,
        testing: true
    })

    const formDataManager = useUmbrlForm(
        screenDefinition.opts,
        screenDefinition.apisection,
        localCtx,
        ctxQuickQuote,
        setScreendataValid
    )

    const router = useRouter()

    const offer = ctxQuickQuote?.state && products ?
        currentOfferByProduct(ctxQuickQuote?.state, products) :
        null

    useEffect(() => {

        const bExcess = UmbrlForm.manualRead('policy', 'buildings_coverage', 'voluntary_excess')
        const cExcess = UmbrlForm.manualRead('policy', 'contents_coverage', 'voluntary_excess')

                setBuildingExcess(bExcess ?? 250)
                setContentsExcess(cExcess ?? 250)

        }, [ctxQuickQuote])

    useEffect(() => {

        if (refined) {
            router.push(nextUrl)
        }
    }, [refined, setRefining])

    const nextScreen = screenDefinition.sidnext

    // @ts-ignore
    const nextUrl = QuoteScreenIdToUrl[nextScreen]
    const policySelected = currentPolicy(ctxQuickQuote?.state ?? null, null)

    return <>
        <div className="screen screen-with-price">
                <TxtTitlePage
                    txt="Tailor your policy"
                />
                <TxtTitleSection
                    txt="Fine tune your flex policy by boosting your cover limits."
                />
                {/* {
                    offer ?
                    <BoostsListComponent
                        productBoosts={ offer?.product.getBoosts() ?? [] }
                        selectedOffer={ offer }
                        onValid= { (d: StorableObj[]) => {

                            formDataManager?.saveScreenData(d, true)
                            
                            setScreendataValid(d)
                            // setRefresh(refresh + 1)

                        }}
                    />:
                    null
                } */}
                <div style={{ marginTop: '2rem'}}>
                    <TxtTitlePage txt="Choose your excess" />
                </div>
                <InfoBlockComponent info="Excess is the total amount you pay towards your claim before we cover the remaining cost. it’s the sum total of compulsory excess (set by us) and voluntary excess (set by you)." />
                <ExcessesIntroComponent
                    bldExc={ buildingExcess }
                    cntExc={ contentsExcess }
                    onEditExcesses={ () => setEditxc(true) }
                />
                <ExcessesEditorComponent
                    policySelected={ policySelected }
                    buildingExcess={ buildingExcess }
                    setBuildingExcess={ setBuildingExcess }
                    contentsExcess={ contentsExcess }
                    setContentsExcess={ setContentsExcess }
                    editxcs={ editxcs}
                    setEditxc={ setEditxc }
                />
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
                    console.log('START')
                    // @ts-ignore
                    setRefining()
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