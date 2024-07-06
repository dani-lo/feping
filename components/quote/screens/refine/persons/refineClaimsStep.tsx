'use client'

import { useEffect, useState, useContext, useReducer } from "react"

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
import { useUmbrlForm } from "@/src/hooks/useUmbrlForm"
import { ClaimsEditorActions, claimsEditorStateReducer, defaultClaimsEditorState } from "@/src/stores/reducers/claimsDataReducer"
import { uiStateSidebar } from "@/src/stores/jotai/uiState"
import { useAtom } from "jotai"
import { SidebarEditor } from "../../../../../src/stores/jotai/uiState"

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

    const [mode, setMode] = useState(StepMode.DISPLAY)
    const [addmore, setAddmore] = useState(false)

    const [sidebar, setSidebar] = useAtom(uiStateSidebar)

    const localCtx = useContext(LocalStateContext)
    const qqCtx = useContext(QQResponseStateContext)

    const [claimsReducerState, dispatchToClaimsReducer] = useReducer(claimsEditorStateReducer, defaultClaimsEditorState)

    useEffect(() => {
        if (!expanded && editable) {
            setMode(StepMode.RESUME)
        }
    }, [expanded, editable])

    const formDataManager = useUmbrlForm(stepOpts, apisection, localCtx, qqCtx)

    if (!formDataManager) {
        return null
    }

    const resumeTitle = claimsReducerState.claims.length ? 
        `${ claimsReducerState.claims.length } claim${ claimsReducerState.claims.length > 1 ? 's' : '' }, ${ claimsTotalString(claimsReducerState.claims) }` : 
        'No Past Claims'

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
            {
            claimsReducerState.claims.length ? <div className="claim-detail">
            {
                claimsReducerState.claims.map(clm => 
                    <ClaimResumeComponent
                        key={ clm.getUid() }
                        claim={ clm }
                        onDeleteClaim={ () => {
                            dispatchToClaimsReducer({
                                type: ClaimsEditorActions.REMOVE_CLAIM,
                                payload: {
                                    claim: clm
                                }
                            })
                        }}
                    />
                )
            }
            </div> : null
        }
        {
            !claimsReducerState.claims.length ? 
                <>
                <TxtTitleSub
                    txt="Have you made any home insurance claims in the last three years?"
                />
                {
                !claimsReducerState.madeClaims ?
                    <div className="step-footer">
                        <BtnComponentB
                            type={ UmbrlButton.GENERIC }
                            onClick={ () => {

                                dispatchToClaimsReducer({
                                    type: ClaimsEditorActions.MADE_CLAIMS,
                                    payload: {
                                        madeClaims: true
                                    }
                                })

                                setSidebar(SidebarEditor.CLAIMS)
                                
                            } }
                            label="Yes"
                        />
                        <BtnComponentB
                            type={ UmbrlButton.GENERIC }
                            onClick={ () => {

                                dispatchToClaimsReducer({
                                    type: ClaimsEditorActions.MADE_CLAIMS,
                                    payload: {
                                        madeClaims: false
                                    }
                                })
                                
                                setAddmore(false)

                                setMode(StepMode.RESUME)
                                onConfirm()
                            } }
                            label="No"
                        />
                    </div>: null
                }
            </> : null
        }
        {
            claimsReducerState.claims.length && !addmore ?
            <div className="step-footer">
                <BtnComponentB
                    type={ UmbrlButton.GENERIC }
                    label="Add another claim"
                    onClick={() => {
                        setAddmore(true)
                        setSidebar(SidebarEditor.CLAIMS)
                    }}
                />
                <BtnComponentB
                    type={ UmbrlButton.CONTINUE }
                    label="Save and continue"
                    onClick={() => {

                        const storableClaimDocs = claimsReducerState.claims.map(c => c.toStorable()) as FormDataItem

                        if (localCtx?.dispatch) {
                            UmbrlForm.manualSave(
                                localCtx.dispatch,
                                'main_policy_holder',
                                'applicant_details',
                                'previous_claims',
                                storableClaimDocs,
                                'SKIP_STORAGE'
                            )
                        }
                        
                        setAddmore(false)

                        setMode(StepMode.RESUME)
                        onConfirm()
                    }}
                />
            </div>
            : null
        }
        {
            // addmore || (claimsReducerState.madeClaims && !claimsReducerState.claims.length) ?
                <ClaimsEditorComponent
                    claimsDispatch={ dispatchToClaimsReducer }
                    onSaveClaim={ () => {
                        setAddmore(false)
                        setSidebar(null)
                    } }
                />
                //: null
        }
    </li>

}