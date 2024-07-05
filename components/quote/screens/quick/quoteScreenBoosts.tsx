'use client'

import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    CircularProgress } from "@nextui-org/react"

import { FooterMode, ScreenFooterComponent } from "@/components/quote/widgets/screenFooter"
import { BoostsListComponent } from "@/components/quote/widgets/boosts"
import { ExcessesIntroComponent, ExcessOptData, ExcessesComponent } from "@/components/quote/widgets/excesses"
import { InfoBlockComponent } from "@/components/quote/widgets/infoBlock"

import { BtnComponent, BtnComponentB, UmbrlButton } from "@/components/libForm/btn"

import { TxtPara, TxtTitlePage, TxtTitleSection } from "@/components/util/txt"

import { StorableObj, UmbrlForm } from "@/src/models/form"
import { currentOfferByProduct } from "@/src/models/offer"

import { QQResponseStateContext } from "@/src/stores/contexts/quickQuoteStateContext"
import { QuoteOpt, QuoteScreen, QuoteScreenIdToUrl } from "@/src/stores/staticQuoteJourneyDefinition"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"

import { useQuoteRefinement } from "@/src/hooks/useQuoteRefinement"
import { useUmbrlForm } from "@/src/hooks/useUmbrlForm"

import { refineExcesssPatchDoc } from "@/src/api/patchers/excess"
import { refineQuickQuote } from "@/src/api/quote"
import { refineBoostsPatchDoc } from "@/src/api/patchers/boosts"
import { PolicyType, currentPolicy } from "@/src/models/policy"
import { useProducts } from "@/src/hooks/useProducts"
import { QuotePremiumComponent } from "../../widgets/quotePremium"
import { Product } from "@/src/models/product"


export const QuoteScreenBoostsComponent = ({ screenDefinition }: { screenDefinition: QuoteScreen }) => {

    const products = useProducts()

    const [screendatavalid, setScreendataValid] = useState<StorableObj[] | null>(null)
    const [editxcs, setEditxc] = useState(false)
    
    const [buildingExcess, setBuildingExcess] = useState(0)
    const [contentsExcess, setContentsExcess] = useState(0)

    const [loading, setLoading] = useState(false)

    const localCtx = useContext(LocalStateContext)
    const ctxQuickQuote = useContext(QQResponseStateContext)

    const [refined, setRefining] = useQuoteRefinement({
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
                {
                    offer ?
                    <BoostsListComponent
                        productBoosts={ offer?.product.getBoosts() ?? [] }
                        selectedOffer={ offer }
                        onValid= { (d: StorableObj[]) => {

                            formDataManager.saveScreenData(d, true)
                            
                            setScreendataValid(d)
                            // setRefresh(refresh + 1)
                            
                        }}
                    />:
                    null
                }
                
                <div style={{ marginTop: '2rem'}}>
                    <TxtTitlePage txt="Choose your excess" />
                </div>
                <InfoBlockComponent info="Excess is the total amount you pay towards your claim before we cover the remaining cost. it’s the sum total of compulsory excess (set by us) and voluntary excess (set by you)." />
                <ExcessesIntroComponent
                    bldExc={ buildingExcess }
                    cntExc={ contentsExcess }
                    onEditExcesses={ () => setEditxc(true) }
                />
                <Modal 
                    isOpen={!!editxcs} 
                    placement="center"
                    onOpenChange={ () => setEditxc(!editxcs)} 
                    isDismissable={ false }
                >
                    <ModalContent>
                        <ModalHeader className="flex flex-col gap-1">Edit excess</ModalHeader>
                        <ModalBody>
                        <ExcessesComponent
                            policySelected={ policySelected }
                            onBuildingsExcessChange={ (d: ExcessOptData[]) => {

                                const building = d.find(item => item.subsection === 'buildings_coverage') ?? null
                                const buildingEcxcess = Number(building?.val) ?? 0

                                setBuildingExcess(buildingEcxcess)

                                if (localCtx?.dispatch && buildingEcxcess) {
                                    UmbrlForm.manualSave(localCtx.dispatch, 'policy', 'buildings_coverage', 'voluntary_excess', buildingEcxcess)
                                }
                            }}
                            onContentsExcessChange={ (d: ExcessOptData[]) => {

                                const contents = d.find(item => item.subsection === 'contents_coverage') ?? null
                                const contentsExcess = Number(contents?.val) ?? 0

                                setContentsExcess(contentsExcess)
                                
                                if (localCtx?.dispatch && contentsExcess) {
                                    UmbrlForm.manualSave(localCtx.dispatch, 'policy', 'contents_coverage', 'voluntary_excess', contentsExcess)
                                }
                            }}
                            buildingExcess={ buildingExcess }
                            contentsExcess={ contentsExcess }
                        />
                        </ModalBody>
                        <ModalFooter>
                            {
                                loading? 
                                <div className="fxrow fxrow-center"><CircularProgress /></div>:
                                <BtnComponentB
                                    label="Update quote price"
                                    type={ UmbrlButton.UPDATE }
                                    onClick={ async () => {

                                        setLoading(true)
                                        // @ts-ignore
                                        if (localCtx?.state && localCtx.state.quote?.uuid && ctxQuickQuote?.state) {

                                            try {

                                                const patchDoc = refineExcesssPatchDoc(ctxQuickQuote?.state, localCtx?.state)

                                                // @ts-ignore
                                                const quoteId = localCtx.state.quote.uuid
                                                const res = await refineQuickQuote(patchDoc, quoteId)

                                                // @ts-ignore
                                                const quoteUidNew = res.uuid

                                                if (!res.error) {

                                                    const localDispatch  = localCtx?.dispatch
                                                    const quoteDispatch = ctxQuickQuote?.dispatch

                                                    UmbrlForm.manualSave(localCtx.dispatch, 'policy', 'contents_coverage', 'voluntary_excess', contentsExcess)
                                                    
                                                    setTimeout(() => {
                                                        UmbrlForm.manualSave(localCtx.dispatch, 'policy', 'buildings_coverage', 'voluntary_excess', buildingExcess)
                                                    }, 10)
                                                    if (typeof quoteUidNew === 'string' && quoteId !== quoteUidNew) {
                                                        UmbrlForm.manualSave(localDispatch, 'quote', null, 'uuid', quoteUidNew)
                                                    }
                                        
                                                    quoteDispatch({ type: "SET_QQ_RESPONSE", payload: res})
                                                    setTimeout(() => {
                                                        setLoading(false)
                                                        setEditxc(false)
                                                    }, 1000)
                                                }
                                            } catch (err) {
                                                console.log(err)
                                            }
                                        }
                                    }}
                                    grow={ true }
                                />
                            }
                        </ModalFooter>
                    </ModalContent>
                </Modal>
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