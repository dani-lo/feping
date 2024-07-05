'use client'

import { useEffect, useState, useContext } from "react"

import { FormOrchestrator } from "@/components/quote/orchestrators/formOrchestrator"
import { StepFooterComponent } from "@/components/quote/orchestrators/stepsOrchestrator"
import { TextOrchestratorComponent } from "@/components/quote/orchestrators/textOrchestrator"

import { FormDataItem, stateFromOpts, UmbrlForm } from "@/src/models/form"
import { populateOptsFromQuote } from "@/src/models/quote"

import { OptionsGender } from "@/src/stores/optionVals"
import { QuoteOpt, QuoteOptType, QuoteOptValidationRule } from "@/src/stores/staticQuoteJourneyDefinition"
import { QQResponseStateContext } from '@/src/stores/contexts/quickQuoteStateContext'

import { twNote, twNoteLg, twParagraph, twTitleSection, twTitleSub } from "@/src/styles/text.tailwind"

import { StepMode } from "@/src/types"
import { BtnComponentB, UmbrlButton } from "@/components/libForm/btn"
import { TxtNoteEvidence, TxtTitleSection, TxtTitleSub } from "@/components/util/txt"
import { useLocalStorage } from "@/src/hooks/useLocalStorage"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
import { StepResumeComponent } from "@/components/quote/widgets/stepResume"
import { useFormApiDataSync } from "@/src/hooks/useFormApiDataSync"
// import { useLocalStatePopulation } from "@/src/hooks/useLocalStatePopulation"
import { useUmbrlForm } from "@/src/hooks/useUmbrlForm"
import { InfoBlockComponent } from "@/components/quote/widgets/infoBlock"
import { PillComponent } from "@/components/quote/widgets/pill"

export const apisection = 'joint_policy_holder'

export const stepOpts: QuoteOpt[] = [
    {
        type: QuoteOptType.TEXT,
        title: 'first_name',
        
        apikey: 'first_name',
        confirmable: false,
        required: true
    },

    {
        type: QuoteOptType.TEXT,
        title: 'surname',
        
        apikey: 'surname',
        confirmable: false,
        required: true
    },
    {
        type: QuoteOptType.EMAIL,
        title: 'email',
        apikey: 'email',
        confirmable: false,
        required: true
    },
    {
        type: QuoteOptType.DOB,
        title: 'Date of Birth',
        apikey: 'date_of_birth',
        confirmable: false,
        required: true,
        validationRule: QuoteOptValidationRule.DOB
    }
]

const stepactions = [
    {
        type: UmbrlButton.UPDATE,
        text: 'yes'
    },
    {
        type: UmbrlButton.CONFIRM,
        text: 'no'
    }
]


export const RefineJointPolicyHolderStepComponent = ({ 
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

    const localCtx = useContext(LocalStateContext)
    const qqCtx = useContext(QQResponseStateContext)
    
    const [screendatavalid, setScreendataValid] = useState<{ apikey: string; val: FormDataItem | null; }[] | null>(null)

    const [mode, setMode] = useState(StepMode.DISPLAY)

    useEffect(() => {
        if (!expanded && editable) {
            setMode(StepMode.RESUME)
        }
    }, [expanded])

    // const formDataManager = new UmbrlForm(
    //     stepOpts, 
    //     apisection, 
    //     localCtx?.state ?? null, 
    //     localCtx?.dispatch  ?? null
    // )
    
    // useLocalStatePopulation(stepOpts, formDataManager, setScreendataValid, localCtx?.state ?? null)
    // useFormApiDataSync(qqCtx?.state ?? null, formDataManager, stepOpts)

    const formDataManager = useUmbrlForm(stepOpts, apisection, localCtx, qqCtx, setScreendataValid)

    if (!formDataManager) {
        return null
    }

    const hasJointHolder =  formDataManager.keyVal('first_name') && formDataManager.keyVal('surname')

    const stepTitle = hasJointHolder ?
        `${ formDataManager.keyVal('first_name') } ${ formDataManager.keyVal('surname') }` :
        'No Joint Holder'

    if (mode === StepMode.RESUME) {

        return <PillComponent
            key={ apisection }
            title={ stepTitle }
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

        // return <StepResumeComponent
        //     key={ apisection }
        //     title={ stepTitle }
        //     icon={ icon }
        //     editable={ editable }
        //     onClick={ () => {
        //         if (editable) {
        //             setMode(StepMode.DISPLAY)
        //             expand()
        //         }
        //     }}
        // />
    }

    return <li 
            className={ `step-current` }
            key={ apisection }
        >
            {
                hasJointHolder ? 
                <>
                    <TxtTitleSub
                        txt="Update Joint Policy Holder?"
                    />
                   
                </>:
                <TxtTitleSub
                    txt="Do you want to add a second policyholder?"
                />
            }  
            <InfoBlockComponent
                info="Second policyholders, typically partners, can submit claims and make changes to your policy."
            />
            <div>
                {
                    mode === StepMode.DISPLAY ?
                        hasJointHolder ?
                        <TextOrchestratorComponent
                            question={ null }
                            opts={ stepOpts }
                            formDataManager={ formDataManager }
                        /> : 
                        // <TxtNoteEvidence
                        //         txt={ stepTitle }
                        //     /> :
                        null:
                            <FormOrchestrator
                                opts={ stepOpts }
                                formDataManager={ formDataManager }
                                onValid={ (data) => {
                                    setScreendataValid(data) 
                                    setStepValid(stepId)
                                    
                                }}
                                onUnvalid={ () => {
                                    setScreendataValid(null) 
                                    setStepUnvalid(stepId)
                                }}
                                withFade={ true }
                            />
                }
            </div>
            {
                mode === StepMode.DISPLAY ?
                <div className="step-footer">
                    <BtnComponentB
                        type={ UmbrlButton.GENERIC }
                        onClick={ () => {

                            setMode(StepMode.EDIT)
                        } }
                        label="Yes"
                        // grow={ true }
                        // disabled={ !canConfirm }
                    />
                    <BtnComponentB
                        type={ UmbrlButton.GENERIC }
                        onClick={ () => {

                            setMode(StepMode.RESUME)
                            onConfirm()
                        } }
                        label="No"
                        // grow={ true }
                        // disabled={ !canConfirm }
                    />
                </div>:
                <div className="step-footer">
                    <BtnComponentB
                        type={ UmbrlButton.SAVE }
                        onClick={ () => {
                            if (screendatavalid) {
                                formDataManager.saveScreenData(screendatavalid, true, 'SKIP_STORAGE')
                            }
                            setMode(StepMode.RESUME)
                            onConfirm()
        
                        } }
                        label="Save"
                        // disabled={ !canConfirm }
                    />
                    <BtnComponentB
                        type={ UmbrlButton.CANCEL }
                        onClick={ () => {
                            setMode(StepMode.DISPLAY)
                        }}
                        label="Cancel"
                    />
                </div>
            }
            
            {/* <StepFooterComponent
                mode={ mode }
                disabledSave={ !screendatavalid }
                onConfirm={ () => {
                    setMode(StepMode.RESUME)
                    onConfirm()
                }}
                onUpdate={ () => {
                    setMode(StepMode.EDIT)
                }}
                onSaveEdit={ () => {
                    if (screendatavalid) {
                        formDataManager.saveScreenData(screendatavalid, true, 'SKIP_STORAGE')
                    }
                    setMode(StepMode.RESUME)
                    onConfirm()
                } }
                onCancelEdit={ () => {
                    setMode(StepMode.DISPLAY)
                }}
                stepactions={ stepactions }
            /> */}
    </li>

}