'use client'

import { useEffect, useState, useContext } from "react"

import { FormOrchestrator } from "@/components/quote/orchestrators/formOrchestrator"
import { StepFooterComponent } from "@/components/quote/orchestrators/stepsOrchestrator"
import { TextOrchestratorComponent } from "@/components/quote/orchestrators/textOrchestrator"

import { FormDataItem, stateFromOpts, UmbrlForm } from "@/src/models/form"
import { populateOptsFromEnum, populateOptsFromQuote } from "@/src/models/quote"

import { QuoteOpt, QuoteScreenId, QuoteOptType, QuoteOptValidationRule } from "@/src/stores/staticQuoteJourneyDefinition"
import { QQResponseStateContext } from '@/src/stores/contexts/quickQuoteStateContext'

import { StepMode } from "@/src/types"
import { BtnComponentB, UmbrlButton } from "@/components/libForm/btn"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
import { MetadataStateContext } from "@/src/stores/contexts/metadataStateContext"
import { TxtTitleSection, TxtTitleSub } from "@/components/util/txt"
import { StepResumeComponent } from "@/components/quote/widgets/stepResume"
import { TfiControlShuffle } from "react-icons/tfi"
import { useFormApiDataSync } from "@/src/hooks/useFormApiDataSync"
// import { useLocalStatePopulation } from "@/src/hooks/useLocalStatePopulation"
import { useUmbrlForm } from "@/src/hooks/useUmbrlForm"
import { PillComponent } from "@/components/quote/widgets/pill"
import { propertyDescConfirm } from "@/src/util/property"
import { TipComponent } from "@/components/quote/widgets/tip"

export const apisection = 'main_policy_holder'

export const stepOpts: QuoteOpt[] = [
        {
            type: QuoteOptType.TEXT,
            title: 'first name',
            apikey: 'first_name',
            confirmable: false,
            tip: 'Main policy holder',
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
            title: 'date of birth',
            text: 'we assume your date of birth is',
            apikey: 'date_of_birth',
            confirmable: true,
            required: true,
            validationRule: QuoteOptValidationRule.DOB
        },
        {
            type: QuoteOptType.BOOL,
            title: 'resident',
            apikey: 'is_resident_at_property',
            apisubsection: 'applicant_details',
            confirmable: true,
            required: true,
            question: 'Resident at property?'
        },
]

const stepactions = [
    {
        type: UmbrlButton.UPDATE,
        text: 'update'
    },
    {
        type: 'confirm',
        text: UmbrlButton.CONFIRM
    }
]


export const RefineMainPolicyHolderStepComponent = ({
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

    const formDataManager = useUmbrlForm(stepOpts, apisection, localCtx, qqCtx, setScreendataValid)

    if (!formDataManager) {
        return null
    }

    const resumeTitle = formDataManager.keyVal('first_name') && formDataManager.keyVal('surname') ?
        `${ formDataManager.keyVal('first_name') } ${ formDataManager.keyVal('surname') }` :
        'No Policy Holder'

    const isResident = formDataManager.keyVal('is_resident_at_property')

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

    // const canConfirm = formDataManager.hasAllRequiredDataInStorableFormat(screendatavalid)

    /*
    * Form initialisation effect
    */
    

    return <li
            className={ `step-current` }
            key={ apisection }
        >
                <TxtTitleSub
                    txt={ resumeTitle }
                    capitalize={ true }
                />
                <TipComponent
                    tipTxt="Main policy holder"
                />
            <div>

                {
                    mode === StepMode.DISPLAY ?
                    <>
                        <TextOrchestratorComponent
                            question={ null }
                            opts={ stepOpts.filter(o => !['first_name', 'surname', 'is_resident_at_property'].includes(o.apikey)) }
                            formDataManager={ formDataManager }
                            
                        />
                        <TxtTitleSection txt={ propertyDescConfirm(localCtx?.state ?? null, isResident)  } />
                    </>:
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
            <div className="step-footer">
            {
                mode === StepMode.DISPLAY ?
                    <>
                        <BtnComponentB
                            type={ UmbrlButton.CONFIRM }
                            onClick={ () => {
                                setMode(StepMode.RESUME)
                                onConfirm()
                            } }
                            label="Correct"
                            // disabled={ !canConfirm }
                        />
                        <BtnComponentB
                            type={ UmbrlButton.UPDATE }
                            onClick={  () => {
                                setMode(StepMode.EDIT)
                            } }
                            label="Update"
                        />
                    </>
                :
                <>
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
                </>
                  
            }
            </div>
            {/* <StepFooterComponent
                mode={ mode }
                disabledConfirm={ !canConfirm }
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
                disabledSave={ !screendatavalid }
            /> */}
    </li>

}