
'use client'

import { useEffect, useState, useContext } from "react"

import { FormOrchestrator } from "@/components/quote/orchestrators/formOrchestrator"
import { StepFooterComponent } from "@/components/quote/orchestrators/stepsOrchestrator"
import { TextOrchestratorComponent } from "@/components/quote/orchestrators/textOrchestrator"

import { FormDataItem, stateFromOpts, UmbrlForm } from "@/src/models/form"
import { populateOptsFromEnum, populateOptsFromQuote } from "@/src/models/quote"

import { QuoteOpt, QuoteScreenId, QuoteOptType } from "@/src/stores/staticQuoteJourneyDefinition"
import { QQResponseStateContext } from '@/src/stores/contexts/quickQuoteStateContext'


import { StepMode } from "@/src/types"
import { TxtTitleSection, TxtTitleSub } from "@/components/util/txt"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
import { MetadataStateContext } from "@/src/stores/contexts/metadataStateContext"
import { StepResumeComponent } from "@/components/quote/widgets/stepResume"
import { useFormApiDataSync } from "@/src/hooks/useFormApiDataSync"
// import { useLocalStatePopulation } from "@/src/hooks/useLocalStatePopulation"
import { useUmbrlForm } from "@/src/hooks/useUmbrlForm"
import { PillComponent } from "@/components/quote/widgets/pill"
import { BtnComponentB, UmbrlButton } from "@/components/libForm/btn"

export const apisection = 'property_details'

export const stepOpts: QuoteOpt[] = [
    {
        type: QuoteOptType.SELECT,
        title: 'type',
        text: 'Select an option',
        apikey: 'type',
        optionvals: [],
        enumkey: 'property_type',
        confirmable: true,
        required: true
    },
    {
        type: QuoteOptType.NUMERIC,
        title: 'year built',
        apikey: 'year_built',
        confirmable: true,
        required: true
    },
    {
        type: QuoteOptType.NUMERIC,
        title: 'total rooms',
        apikey: 'bedrooms',
        apisubsection: 'room_info',
        confirmable: true,
        required: true
    },
    {
        type: QuoteOptType.SELECT,
        title: 'construction type',
        text: 'Select an option...',
        apikey: 'construction_type',
        optionvals: [],
        enumkey: 'construction_type',
        confirmable: true,
        required: true
    },
    {
        type: QuoteOptType.SELECT,
        title: 'You own the property',
        text: 'Select an option...',
        apikey: 'property_ownership',
        optionvals: [],
        enumkey: 'property_ownership',
        confirmable: true,
        required: true
    }
]

const stepactions = [
    {
        type:'update',
        text: 'update'
    },
    {
        type: 'confirm',
        text: 'confirm'
    }
]


export const RefineBuildingStepComponent =  ({ 
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

    const [screendatavalid, setScreendataValid] = useState<{ apikey: string; val: FormDataItem | null; }[] | null>(null)

    const localCtx = useContext(LocalStateContext)
    const qqCtx = useContext(QQResponseStateContext)

    const formDataManager = useUmbrlForm(stepOpts, apisection, localCtx, qqCtx, setScreendataValid)

    // useLocalStatePopulation(stepOpts, formDataManager, setScreendataValid, localCtx?.state ?? null)
    // useFormApiDataSync(qqCtx?.state ?? null, formDataManager, stepOpts)

    const [mode, setMode] = useState(StepMode.DISPLAY)

    useEffect(() => {
        if (!expanded && editable) {
            setMode(StepMode.RESUME)
        }
    }, [expanded, editable])


    // useEffect(() => {

    //     const fromOptsState = stateFromOpts(stepOpts, formDataManager) ?? {}

    //     const toSave = Object.keys(fromOptsState).map(apikey => {
    //         return {
    //             apikey,
    //             val: fromOptsState[apikey]
    //         }
    //     })

    //     if (fromOptsState && formDataManager.hasAllRequiredDataInStorableFormat(toSave)) {            
    //         setScreendataValid(toSave)
    //     } 

    // }, [localCtx?.state, qqCtx?.state])

    

    // const canConfirm = formDataManager.hasAllRequiredData() || (screendatavalid !== null  && !screendatavalid.some(d => !d))
    const canConfirm = formDataManager.hasAllRequiredDataInStorableFormat(screendatavalid)
    
    if (mode === StepMode.RESUME) {
        return <PillComponent
            key={ apisection }
            title={ 'Building Details' }
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
        return  <StepResumeComponent
            key={ apisection }
            title={ 'Building Details' }
            icon={ icon }
            editable={ editable }
            onClick={ () => {
                if (editable) {
                    setMode(StepMode.DISPLAY)
                    expand()
                }
            }}
        />
    }

    return <li 
            className={ `step-current` }
            key={ apisection }
        >
            {/* <PillComponent
                key={ apisection }
                title={ 'Building Details' }
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
                expanded={  mode !== StepMode.RESUME }
            >
                <span />
            </PillComponent> */}
            <div>
                <TxtTitleSub
                    txt="About the building."
                />
            </div>
            <div>
                {
                    mode === StepMode.DISPLAY ?
                    <TextOrchestratorComponent
                        question={ null }
                        opts={ stepOpts }
                        formDataManager={ formDataManager }
                    />:
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
                                formDataManager.saveScreenData(screendatavalid, true)
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
                disabledSave={ !screendatavalid }
                disabledConfirm={ !canConfirm }
                onConfirm={  () => {
                    setMode(StepMode.RESUME)
                    onConfirm()
                }}
                onUpdate={ () => {
                    setMode(StepMode.EDIT)
                }}
                onSaveEdit={ () => {
                    if (screendatavalid) {
                        formDataManager.saveScreenData(screendatavalid, true)
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