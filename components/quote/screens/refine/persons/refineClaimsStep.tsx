'use client'

import { useEffect, useState, useContext } from "react"

import { FormOrchestrator } from "@/components/quote/orchestrators/formOrchestrator"
import { StepFooterComponent } from "@/components/quote/orchestrators/stepsOrchestrator"

import { FormDataItem, UmbrlForm } from "@/src/models/form"
import { populateOptsFromQuote } from "@/src/models/quote"

import { QuoteOpt, QuoteOptType } from "@/src/stores/staticQuoteJourneyDefinition"
import { QQResponseStateContext } from '@/src/stores/contexts/quickQuoteStateContext'

import { StepMode } from "@/src/types"
import { BtnComponent, BtnComponentB, UmbrlButton } from "@/components/libForm/btn"
import { ClaimResumeComponent, ClaimsEditorComponent, claimsTotalString } from "@/components/quote/widgets/claimsEditor"
import { Claim, ClaimDoc } from "@/src/models/claim"
import { Radio, RadioGroup } from "@nextui-org/react"
import { TxtPara, TxtTitleSection, TxtTitleSub } from "@/components/util/txt"
import { useLocalStorage } from "@/src/hooks/useLocalStorage"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
import { StepResumeComponent } from "@/components/quote/widgets/stepResume"
import { useFormApiDataSync } from "@/src/hooks/useFormApiDataSync"
import { PillComponent } from "@/components/quote/widgets/pill"

export const apisection = 'main_policy_holder'

export const stepOpts: QuoteOpt[] = [
    {
        type: QuoteOptType.CLAIMS,
        title: 'previous claims',
        apikey: 'previous_claims',
        apisubsection: 'applicant_details',
        confirmable: true,
        required: false
    },
    {
        type: QuoteOptType.HIDDEN,
        title: '',
        apikey: 'has_claims',
        apisubsection: 'applicant_details',
        confirmable: false,
        required: false,
    
    }
]

const stepactions = [
    // {
    //     type: UmbrlButton.UPDATE,
    //     text: 'add claims'
    // },
    {
        type: UmbrlButton.CONFIRM,
        text: 'Confirm'
    }
]



export const RefineClaimsStepComponent =  ({
    stepId,
    editable,
    expanded,
    onConfirm,
    icon,
    expand,
    setStepValid,
    setStepUnvalid }: {
        stepId: string;
        editable: boolean;
        onConfirm: () => void;
        icon: string;
        expanded: boolean;
        expand: () => void;
        setStepValid: (s: string) => void;
        setStepUnvalid: (s: string) => void;
}) => {

    const [madeclaims, setMadeclaims] = useState<boolean | null>(null)
    const [mode, setMode] = useState(StepMode.DISPLAY)
    const [claims, setClaims] = useState<Claim[]>([])
    const [addmore, setAddmore] = useState(false)

    const localCtx = useContext(LocalStateContext)
    const qqCtx = useContext(QQResponseStateContext)

    const formDataManager = new UmbrlForm(
        stepOpts, 
        apisection, 
        localCtx?.state ?? null, 
        localCtx?.dispatch  ?? null
    )

    useFormApiDataSync(qqCtx?.state ?? null, formDataManager, stepOpts)

    // const ready = formDataManager.ready() && qqCtx?.state && Object.keys(qqCtx.state).length

    useEffect(() => {
        if (!expanded && editable) {
            setMode(StepMode.RESUME)
        }
    }, [expanded, editable])

    useEffect(() => {

        const existingClaims = formDataManager.keyVal('previous_claims') as ClaimDoc[]
        const madeClaims = formDataManager.keyVal('has_claims') as ClaimDoc[]

        setClaims(existingClaims?.map(d => new Claim(d)) ?? [])
        setMadeclaims(!!madeClaims)

    }, [])

    // useEffect(() => {

    //     const confirmedClaims = UmbrlForm.manualRead('main_policy_holder', null, 'claims')

    //     if (![undefined, null].includes(confirmedClaims) ) {
    //         setMadeclaims(confirmedClaims)
    //     }
    // }, [])


    const resumeTitle = claims.length ? `${ claims.length } claim${ claims.length > 1 ? 's' : '' }, ${ claimsTotalString(claims) }` : 'No Past Claims'

    if (mode === StepMode.RESUME) {
        return <PillComponent
            key={ apisection }
            title={ resumeTitle }
            icons={{
                title: 'fa fa-check-circle',
                action: icon
            }}
            onAction={ () => {
                if (editable) {
                    setMode(StepMode.DISPLAY)
                    expand()
                }
            }}
            expanded={  false }
        >
            <span />
        </PillComponent>
    }

    return <li
            className={ `step-current` }
            key={ apisection }
        >
            {/* <TxtTitleSub
                txt="Your Past Claims"
            /> */}
            {
            claims.length ? <div className="claim-detail">
                {
                     claims.map(clm => <ClaimResumeComponent
                        key={ clm.getUid() }
                        claim={ clm }
                        onDeleteClaim={ (claimUid: string) => {

                            const newClaims = claims.filter(c => c.getUid() !== claimUid)
                            const storableClaimDocs = newClaims.map(c => c.toStorable()) as FormDataItem

                            setClaims(newClaims)

                            formDataManager.saveScreenData([
                                {
                                    apikey: 'previous_claims',
                                    val: storableClaimDocs
                                }
                            ], true)
                        } }
                    />)
                }

            </div> : null
        }
            {
                !claims?.length ? 
                    <>
                    <TxtTitleSub
                        txt="Have you made any home insurance claims in the last three years?"
                    />
                    {/* <RadioGroup
                        className="pt-2"
                        defaultValue={ madeclaims ? 'yes' : 'no' }
                        size="sm"
                    >
                        <Radio
                            value="yes"
                            data-selected={ madeclaims === true }
                            onClick={ () => {

                                setMadeclaims(true)

                                if (localCtx?.dispatch) {
                                    UmbrlForm.manualSave(localCtx.dispatch, 'main_policy_holder', null, 'claims', true)
                                }
                            }}
                        >yes</Radio>
                        <Radio
                            value="no"
                            data-selected={ madeclaims === false }
                            onClick={ () => {

                                setMadeclaims(false)

                                if (localCtx?.dispatch) {
                                    UmbrlForm.manualSave(localCtx.dispatch, 'main_policy_holder', null, 'claims', false)
                                }
                            }}
                        >no</Radio>
                    </RadioGroup> */}
                    {
                    !madeclaims ?
                        <div className="step-footer">
                            <BtnComponentB
                                type={ UmbrlButton.GENERIC }
                                onClick={ () => {

                                    setMadeclaims(true)

                                    if (localCtx?.dispatch) {
                                        UmbrlForm.manualSave(localCtx.dispatch, 'main_policy_holder', null, 'claims', true)
                                    }
                                } }
                                label="Yes"
                                // grow={ true }
                                // disabled={ !canConfirm }
                            />
                            <BtnComponentB
                                type={ UmbrlButton.GENERIC }
                                onClick={ () => {

                                    setMadeclaims(false)

                                    if (localCtx?.dispatch) {
                                        UmbrlForm.manualSave(localCtx.dispatch, 'main_policy_holder', null, 'claims', false)
                                    }

                                    setAddmore(false)
                                    setMode(StepMode.RESUME)
                                    onConfirm()
                                } }
                                label="No"
                                // grow={ true }
                                // disabled={ !canConfirm }
                            />
                        </div>: null
                    }
                    
                </> : null
            }
            {
                claims?.length && !addmore ?
                <div className="pb-4">
                    <BtnComponentB
                        type={ UmbrlButton.GENERIC }
                        label="Add another claim"
                        onClick={() => setAddmore(true)}
                    />
                </div>
                : null
            }
            {
                addmore || (madeclaims && !claims.length) ?
                    <ClaimsEditorComponent
                        claims={ claims }
                        onAddClaim={ (claim: Claim) => {

                            const newClaims = [...claims, claim]
                            const storableClaimDocs = newClaims.map(c => c.toStorable()) as FormDataItem

                            setClaims(newClaims)

                            formDataManager.saveScreenData([
                                {
                                    apikey: 'previous_claims',
                                    val: storableClaimDocs
                                }
                            ], true)

                            setAddmore(false)
                        }}
                        onDeleteClaim={ (claimUid: string) => {

                            const newClaims = claims.filter(c => c.getUid() !== claimUid)
                            const storableClaimDocs = newClaims.map(c => c.toStorable()) as FormDataItem

                            setClaims(newClaims)

                            formDataManager.saveScreenData([
                                {
                                    apikey: 'previous_claims',
                                    val: storableClaimDocs
                                }
                            ], true)
                        } }
                        onCancel={() => {
                            setAddmore(false)
                            setMode(StepMode.RESUME)
                            onConfirm()
                        }}
                    />: null
            }
            {/* <StepFooterComponent
                mode={ mode }
                disabledConfirm={ madeclaims === null ||  (madeclaims === true  && !claims.length) }
                disabledSave={ false }
                onConfirm={ () => {
                    setMode(StepMode.RESUME)
                    onConfirm()
                }}
                onUpdate={ () => {
                    setMode(StepMode.EDIT)
                }}
                onSaveEdit={ () => {
                    if (claims?.length) {
                    formDataManager.saveScreenData([{
                        apikey: 'previous_claims',
                        val: claims.map(c => c.toStorable())
                    }], true)
                    }
                    setMode(StepMode.RESUME)
                    onConfirm()
                } }
                // onCancelEdit={ () => {
                //     setMode(StepMode.DISPLAY)
                // }}
                onCancelEdit={ null }
                stepactions={ stepactions }
            /> */}
    </li>

}