'use client'

import { useEffect, useState, useContext } from "react"

import { FormOrchestrator } from "@/components/quote/orchestrators/formOrchestrator"
import { StepFooterComponent } from "@/components/quote/orchestrators/stepsOrchestrator"
import { TextOrchestratorComponent } from "@/components/quote/orchestrators/textOrchestrator"

import { FormDataItem, stateFromOpts, UmbrlForm } from "@/src/models/form"
import { populateOptsFromQuote } from "@/src/models/quote"

import { QuoteOpt, QuoteOptType } from "@/src/stores/staticQuoteJourneyDefinition"
import { QQResponseStateContext } from '@/src/stores/contexts/quickQuoteStateContext'

import { twNote, twNoteLg, twTitleSection, twTitleSub } from "@/src/styles/text.tailwind"

import { StepMode } from "@/src/types"
import { BtnComponentB, UmbrlButton } from "@/components/libForm/btn"
import { TxtTitleSection, TxtTitleSub } from "@/components/util/txt"
import { useLocalStorage } from "@/src/hooks/useLocalStorage"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
import { StepResumeComponent } from "@/components/quote/widgets/stepResume"
import { useFormApiDataSync } from "@/src/hooks/useFormApiDataSync"
// import { useLocalStatePopulation } from "@/src/hooks/useLocalStatePopulation"
import { useUmbrlForm } from "@/src/hooks/useUmbrlForm"
import { PillComponent } from "@/components/quote/widgets/pill"

export const apisection = 'property_details'

export const stepOpts: QuoteOpt[] = [
    {
        type: QuoteOptType.NUMERIC_INCREMENT,
        apisubsection: 'occupancy',
        title: 'additional adults',
        apikey: 'adults',
        confirmable: true,
        required: false
    },
    {
        type: QuoteOptType.NUMERIC_INCREMENT,
        apisubsection: 'occupancy',
        title: 'children',
        apikey: 'children',
        confirmable: true,
        required: false
    },
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

export const RefineResidentsStepComponent =  ({ 
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

    useEffect(() => {
        if (!expanded && editable) {
            setMode(StepMode.RESUME)
        }
    }, [expanded])

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

    if (!formDataManager) {
        return null
    }

    const hasResidents =  !!formDataManager.keyVal('adults') || formDataManager.keyVal('children')
    
    const resumeTitle = hasResidents ?
        `${ formDataManager.keyVal('adults') ?? 0 } adults, ${ formDataManager.keyVal('children') ?? 0 } children` :
        'No Residents'

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

        // return <StepResumeComponent
        //     key={ apisection }
        //     title={ resumeTitle }
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
            <div>
            </div>
            {
                hasResidents ? 
                    <TxtTitleSub
                        txt="Update Home Residents?"
                    />:
                    <TxtTitleSub
                        txt="Add children and any additional adults who live at 15 Holt Avenue."
                    />
            }  
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
                // disabledConfirm={ !hasAdults  }
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