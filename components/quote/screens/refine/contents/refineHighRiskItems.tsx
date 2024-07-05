'use client'

import { useEffect, useState, useContext, useReducer } from "react"

import { StepFooterComponent } from "@/components/quote/orchestrators/stepsOrchestrator"

import { UmbrlForm } from "@/src/models/form"
import { populateOptsFromQuote } from "@/src/models/quote"

import { QuoteOpt, QuoteOptType, QuoteScreenStepId } from "@/src/stores/staticQuoteJourneyDefinition"
import { QQResponseStateContext } from '@/src/stores/contexts/quickQuoteStateContext'

import { StepMode } from "@/src/types"
import { InfoBlockComponent } from "@/components/quote/widgets/infoBlock"
import { Thing, ThingDoc, sameThing, thingId } from "@/src/models/thing"
import { formatCurrency } from "@/src/util/currency"
import { TxtNoteEvidence, TxtPara, TxtTitleSection } from "@/components/util/txt"
import { ProductId } from "@/src/models/product"
import { uiStateRefreshAtom } from "@/src/stores/jotai/uiState"
import { useAtom } from "jotai"
import { SelectedThingsComponent, ThingsPickerComponent } from "@/components/quote/widgets/thingsPicker"
import { BtnComponent, UmbrlButton } from "@/components/libForm/btn"
import { useUat } from "@/src/hooks/useUat"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
import { StepResumeComponent } from "@/components/quote/widgets/stepResume"
import { PillComponent } from "@/components/quote/widgets/pill"
import { useUmbrlForm } from "@/src/hooks/useUmbrlForm"
import { HrisEditorActions, defaultHrisEditorState, hrisEditorStateReducer } from "@/src/stores/reducers/hrisDataReducer"

export const apisection = 'policy'

export const stepOpts: QuoteOpt[] = [
    {
        apikey: 'specified_high_risk_items',
        apisubsection: 'contents_coverage',
        title: 'All your valuables over £2000',
        type: QuoteOptType.THINGS,
        confirmable: true,
        required: true
    }
]

const stepactions = (hasValue: boolean) => hasValue  ?[
    // {
    //     type:'update',
    //     text: 'edit items'
    // },
    {
        type: 'confirm',
        text:  'ok'
    }
]:[

    {
        type: 'confirm',
        text: 'Continue without high risk items'
    }
]

export const RefineHighRiskItemsStepComponent = ({
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



    // const [things, setThings] = useState<ThingDoc[]>([])
    const [mode, setMode] = useState(StepMode.DISPLAY)

    const [hrisReducerState, dispatchToHrisReducer] = useReducer(hrisEditorStateReducer, defaultHrisEditorState)

    const localCtx = useContext(LocalStateContext)
    const qqCtx = useContext(QQResponseStateContext)

    const formDataManager = useUmbrlForm(stepOpts, apisection, localCtx, qqCtx)

    useEffect(() => {
        if (!expanded && editable) {
            setMode(StepMode.RESUME)
        }
    }, [expanded, editable])

    if (!formDataManager) {
        return null
    }

    if (mode === StepMode.RESUME) {

        return  <PillComponent
            key={ apisection }
            title={ 'High Risk Items' }
            icons={ {
                title: 'fa fa-check-circle',
                action: icon
            } }
            expanded={ false }
            onAction={ () => {
                if (editable) {
                    setMode(StepMode.DISPLAY)
                    expand()
                }
            }}
        >
        {
           (hrisReducerState.hris ?? []).map(thing => {
                return <div 
                    className="fxrow" 
                    key={ thingId(thing) } 
                    data-testid={ `step-resume-thing-${ thingId(thing) }`}>
                <TxtTitleSection
                    txt={ `${ thing.description }` }
                    capitalize={ true }
                    
                />
                <TxtPara
                    txt={ `${ formatCurrency(thing.value ?? 0) }` }
                />
                </div>
            })
        }
        </PillComponent>
    }

    const saveThings = () => formDataManager.saveScreenData([{
        apikey: 'specified_high_risk_items',
        val: hrisReducerState.hris
    }], true, 'SKIP_STORAGE')

    return <li
            className={ `step  step-current-single` }
            key={ apisection }
        >
            
            <div>
                <SelectedThingsComponent
                    selectedThings={ hrisReducerState.hris }
                    onDeleteThing={ (th: Thing) => {
                        dispatchToHrisReducer({
                            type: HrisEditorActions.REMOVE_HRI,
                            payload: {
                                hri: th
                            }
                        })

                    } }
                    onSetOutside={ (th: Thing) => {

                        dispatchToHrisReducer({
                            type: HrisEditorActions.SET_HRI_OUTSIDE,
                            payload: {
                                hri: th,
                                insideAndOutside: !th.insideAndOutside
                            }
                        })

                    }}
                    mode={ StepMode.RESUME }
                />
              
                        <ThingsPickerComponent
                            onSaveThing={ (thing: Thing) => {
                                dispatchToHrisReducer({
                                    type: HrisEditorActions.ADD_HRI,
                                    payload: {
                                        hri: thing
                                    }
                                })
                            }}
                        />
            </div>
            
            {
                // (done) && !coverageInspector.isOverCurrInside() ?
                
                    <StepFooterComponent
                        mode={ mode }
                        disabledSave={ false }
                        onConfirm={ () => {
                            setMode(StepMode.RESUME)
                            onConfirm()
                            setStepValid(QuoteScreenStepId.REFINE_VALUABLES_INSIDE)
                        }}
                        onUpdate={ () => {
                            setMode(StepMode.EDIT)
                        }}
                        onSaveEdit={ () => {
                            // if (screendatavalid) {
                            saveThings()
                            // }
                            setMode(StepMode.RESUME)
                            onConfirm()
                        } }
                        onCancelEdit={  null }
                        stepactions={ stepactions(hrisReducerState.hris.length > 0) }
                    />
            }

    </li>

}