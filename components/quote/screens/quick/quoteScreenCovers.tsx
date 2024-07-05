'use client'

import { useContext, useEffect, useState } from "react"

import { QuoteOpt, QuoteScreen, QuoteScreenIdToUrl } from "@/src/stores/staticQuoteJourneyDefinition"

import { FooterMode, ScreenFooterComponent } from "@/components/quote/widgets/screenFooter"
import { FormOrchestrator } from "@/components/quote/orchestrators/formOrchestrator"
import { ScreenMode } from "@/src/types"

import { FormDataItem } from "@/src/models/form"
import { TxtTitlePage, TxtTitleSub } from "@/components/util/txt"
import { QQResponseStateContext } from "@/src/stores/contexts/quickQuoteStateContext"

import { useQuoteRefinement } from "@/src/hooks/useQuoteRefinement"
import { refineContentsPatchDoc } from "@/src/api/patchers/contents"
import { useRouter } from "next/navigation"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
import { PolicyType, currentPolicy } from "@/src/models/policy"
import { InfoBlockComponent } from "../../widgets/infoBlock"
import { useUmbrlForm } from "@/src/hooks/useUmbrlForm"
import { useProducts } from "@/src/hooks/useProducts"

export const QuoteScreenCoversComponent = ({ screenDefinition, mode }: {
            screenDefinition: QuoteScreen;
            mode: ScreenMode;
        }) => {

    const localCtx = useContext(LocalStateContext)
    const ctxQuickQuote = useContext(QQResponseStateContext)

    const [screendatavalid, setScreendataValid] = useState<{ apikey: string; val: FormDataItem | null; }[] | null>(null)

    const router = useRouter()

    const [refined, setRefining] = useQuoteRefinement({
        quoteState: ctxQuickQuote?.state ?? null,
        quoteDispatch: ctxQuickQuote?.dispatch ?? null,
        localState: localCtx?.state ?? null,
        localDispatch: localCtx?.dispatch ?? null,
        patchFn: refineContentsPatchDoc
    })

    useEffect(() => {

        if (refined) {
            router.push(nextUrl)
        }
    }, [refined])

    // @ts-ignore
    const policySelected = currentPolicy(localCtx?.state ?? null, ctxQuickQuote?.state ?? null)

    const filterPolicyFunc = (opt: QuoteOpt) => {

        if (policySelected === PolicyType.BUILDINGS_CONTENTS) {
            return true
        } else if (policySelected === PolicyType.BUILDINGS){
            return ['estimated_rebuild_cost', 'rebuild_cost'].includes(opt.apikey)
        } else if (policySelected === PolicyType.CONTENTS) {
            return ['total_contents_value'].includes(opt.apikey)
        }
        return false
    }

    const optsForPolicy =  screenDefinition.opts.filter(filterPolicyFunc)

    const formDataManager = useUmbrlForm(
        optsForPolicy,
        screenDefinition.apisection,
        localCtx,
        ctxQuickQuote,
        setScreendataValid
    )

    const nextScreen = screenDefinition.sidnext
    const nextUrl = QuoteScreenIdToUrl[nextScreen]

    let infoTxt = "The home rebuild cost and contents value are  our estimates. If you think we’re wrong, update the values now."

    if (policySelected === PolicyType.BUILDINGS) {
        infoTxt = "The home rebuild cost is our estimate. If you think we're wrong, update the value now."
    }
    if (policySelected === PolicyType.CONTENTS) {
        infoTxt = "The contents value is our estimate. If you think we're wrong, update the value now."
    }

    return <>
        <div className="screen">
            <TxtTitlePage txt="Nearly there." />
            <TxtTitleSub txt="Before we get your quote, let’s double check two things:" />
            <div className="gray-container">
                <FormOrchestrator
                    opts={ optsForPolicy || [] }
                    onValid={ (data: { apikey: string; val: FormDataItem | null; }[]) => {
                        setScreendataValid(data)
                    }}
                    formDataManager={ formDataManager }
                    onUnvalid={ () => {
                        setScreendataValid(null)
                    }}
                />
            </div>
            <InfoBlockComponent
                info={ infoTxt }
            />
        </div>
        <div className="screen-footer no-cancel">
            <ScreenFooterComponent
                screenDefinition={ screenDefinition }
                screenValid={ !!screendatavalid }
                onNext={ () => {
                    if (screendatavalid !== null) {
                        formDataManager.saveScreenData(screendatavalid, true)
                    }
                    typeof setRefining !== 'boolean' && setRefining()
                }}
            />
        </div>
    </>
}