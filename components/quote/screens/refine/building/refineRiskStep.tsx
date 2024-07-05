

'use client'

import { useEffect, useState, useContext } from "react"

import { FormOrchestrator } from "@/components/quote/orchestrators/formOrchestrator"
import { StepFooterComponent } from "@/components/quote/orchestrators/stepsOrchestrator"
import { TextOrchestratorComponent } from "@/components/quote/orchestrators/textOrchestrator"

import { FormDataItem, stateFromOpts, UmbrlForm } from "@/src/models/form"
import { populateOptsFromQuote } from "@/src/models/quote"

import { QuoteOpt, QuoteOptType } from "@/src/stores/staticQuoteJourneyDefinition"
import { QQResponseStateContext } from '@/src/stores/contexts/quickQuoteStateContext'

import { StepMode } from "@/src/types"
import { BtnComponentB, UmbrlButton } from "@/components/libForm/btn"
import { TxtPara, TxtTitleSection, TxtTitleSub } from "@/components/util/txt"
import { useLocalStorage } from "@/src/hooks/useLocalStorage"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
import { StepResumeComponent } from "@/components/quote/widgets/stepResume"
import { useFormApiDataSync } from "@/src/hooks/useFormApiDataSync"
// import { useLocalStatePopulation } from "@/src/hooks/useLocalStatePopulation"
import { useUmbrlForm } from "@/src/hooks/useUmbrlForm"
import { PillComponent } from "@/components/quote/widgets/pill"
import { propertyString } from "@/src/util/property"

export const apisection = 'risk_factors'

export const stepOpts: QuoteOpt[] = [
    {
        type: QuoteOptType.BOOL_INVERTED,
        title: 'Doesn\'t have tall trees',                
        apikey: 'has_tall_trees',
        confirmable: true,
        required: false
    },
    {
        type: QuoteOptType.BOOL,
        title: 'Is 400m or closer to a body of water',                
        apikey: 'is_over_400m_from_water',
        confirmable: true,
        required: false
    },
    {
        type: QuoteOptType.BOOL_INVERTED,
        title: 'Wasn\'t flooded',
        apikey: 'suffered_from_flooding',
        confirmable: true,
        required: false
    },
    {
        type: QuoteOptType.BOOL_INVERTED,
        title: 'Hasn\'t suffered from ground movement',
        apikey: 'suffered_from_ground_movement',
        confirmable: true,
        required: false
    },
    {
        type: QuoteOptType.BOOL_INVERTED,
        title: 'Hasn\'t been underpinned',
        apikey: 'has_been_underpinned',
        confirmable: true,
        required: false
    },
    {
        type: QuoteOptType.BOOL_INVERTED,
        title: 'Hasn\'t got any significant cracks on external walls',
        apikey: 'has_cracked_walls',
        confirmable: true,
        required: false
    },
    {
        type: QuoteOptType.BOOL_INVERTED,
        title: 'Isn\'t undergoing building work',
        apikey: 'is_undergoing_build_work',
        confirmable: true,
        required: false
    },
    {
        type: QuoteOptType.BOOL_INVERTED,
        title: 'Isn\'t used for business',
        apikey: 'is_used_for_business',
        confirmable: true,
        required: false
    }
]

const stepactions = [
    {
        type: UmbrlButton.UPDATE,
        text: 'update'
    },
    {
        type: UmbrlButton.CONFIRM,
        text: 'confirm'
    }
]


export const RefineRisksStepComponent = ({ 
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

    const [mode, setMode] = useState(StepMode.DISPLAY)

    const localCtx = useContext(LocalStateContext)
    const qqCtx = useContext(QQResponseStateContext)

    // const formDataManager = new UmbrlForm(
    //     stepOpts, 
    //     apisection, 
    //     localCtx?.state ?? null, 
    //     localCtx?.dispatch  ?? null
    // )

    // useLocalStatePopulation(stepOpts, formDataManager, setScreendataValid, localCtx?.state ?? null)
    // useFormApiDataSync(qqCtx?.state ?? null, formDataManager, stepOpts)
    
    const formDataManager = useUmbrlForm(stepOpts, apisection, localCtx, qqCtx, setScreendataValid)

    useEffect(() => {
        if (!expanded && editable) {
            setMode(StepMode.RESUME)
        }
    }, [expanded, editable])

    if (mode === StepMode.RESUME) {
        // return <StepResumeComponent
        //     key={ apisection }
        //     title={ 'Risks' }
        //     icon={ icon }
        //     editable={ editable }
        //     onClick={ () => {
        //         if (editable) {
        //             setMode(StepMode.DISPLAY)
        //             expand()
        //         }
        //     }}
        // />
        return <PillComponent
            key={ apisection }
            title="Risks"
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
            <div className="pb-4">
                <TxtTitleSub
                    txt="Risks"
                />
                <TxtPara
                    txt="Please tell us if these statements are true regarding your property."
                    />
                <TxtPara 
                    txt={ `Your property, ${ propertyString(localCtx?.state ?? null) }` }
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
            {/* <StepFooterComponent
                mode={ mode }
                disabledSave={ false }
                onConfirm={ () => {
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
                            label="All is correct"
                            // disabled={ !canConfirm }
                        />
                        <BtnComponentB
                            type={ UmbrlButton.UPDATE }
                            onClick={  () => {
                                setMode(StepMode.EDIT)
                            } }
                            label="Edit"
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
    </li>

}