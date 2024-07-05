'use client'

import { useEffect, useState, useContext } from "react"

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

    const [things, setThings] = useState<ThingDoc[]>([])
    const [mode, setMode] = useState(StepMode.DISPLAY)

    const [done, setDone] = useState(true)

    const localCtx = useContext(LocalStateContext)
   
    const formDataManager = new UmbrlForm(
        stepOpts, 
        apisection, 
        localCtx?.state ?? null, 
        localCtx?.dispatch  ?? null
    )

    // const currCoverages = CurrUserCover_UAT(udata)

    // const coverageInspector = new CoverageInspector(currCoverages.highRiskItems, currCoverages.personalPossessions)

    // coverageInspector.setThings(things.map(t => new Thing(t)) ?? [])

    useEffect(() => {
        if (!expanded && editable) {
            setMode(StepMode.RESUME)
        }
    }, [expanded, editable])

    useEffect(() => {

        const allThings = (formDataManager.keyVal('specified_high_risk_items') ?? []) as ThingDoc[]
        
        // console.log(allThings)

        setThings(allThings)
    }, [formDataManager.ready()])

    // useEffect(() => {
    //     if (coverageInspector.isOverCurrInside()) {
    //         setStepUnvalid(stepId)
    //     } else {
    //         setStepValid(stepId)
    //     }
    // }, [coverageInspector.isOverCurrInside()])


    // if (!populatedOpts) {
    //     return null
    // }

    // formDataManager.syncQuoteDataOpts(populatedOpts)

    // const insideTotalCurrent = coverageInspector.thingsTotal(false)

    // const hasUnsavedThings = () => {

    //     const fromStorage = formDataManager.keyVal('specified_high_risk_items')

    //     const sameThingsStored = fromStorage && things?.length &&  fromStorage.length === things.length && things.reduce((acc, curr) => {

    //         if (acc) {

    //             const storedEqual = fromStorage.find((st: ThingDoc) => thingId(st) === thingId(curr))

    //             if (storedEqual) {
    //                 return acc
    //             }
    //         }
    //         return false
    //     }, true)

    //     return things?.length && !sameThingsStored
    // }

    if (mode === StepMode.RESUME) {

        return  <PillComponent
            key={ apisection }
            title={ 'High Risk Items' }
            icons={ {
                title: 'fa fa-check-circle',
                action: null
            } }
            expanded={ false }
            onAction={ () => void 0}
        >
        {
           (things ?? []).map(thing => {
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
        val: things
    }], true)

    return <li
            className={ `step  step-current-single` }
            key={ apisection }
        >
            
            <div>
                <SelectedThingsComponent
                    selectedThings={ things }
                    onDeleteThing={ (th: ThingDoc) => {
                        const newThings = things.filter((t: ThingDoc) => {
                            if (sameThing(t, th)) {
                                return false
                            }
                            return true
                        })

                        if (localCtx?.dispatch) {
                            UmbrlForm.manualSave(localCtx.dispatch, 'policy', 'contents_coverage', 'specified_high_risk_items', newThings)
                        }
                        
                        setThings(newThings)

                    } }
                    onSetOutside={ (th: ThingDoc) => {

                        const newThings = things.map((t: ThingDoc) => {
                            if (sameThing(t, th)) {
                                return {
                                    ...t,
                                    insideAndOutside: !t.insideAndOutside
                                }
                            }
                            return t
                        })

                        if (localCtx?.dispatch) {
                            UmbrlForm.manualSave(localCtx.dispatch, 'policy', 'contents_coverage', 'specified_high_risk_items', newThings)
                        }
                        
                        setThings(newThings)

                    } }
                    mode={ StepMode.RESUME }
                />
              
                        <ThingsPickerComponent
                            // categories={ Categories }
                            onSaveThing={ (thing: ThingDoc) => {

                                const newThings = [...things]
                                newThings.push(thing)

                                setThings(newThings)
                            }}
                        />
                        
                        {/* {
                            hasUnsavedThings() ?
                            <div className="block-generic">
                                <BtnComponent
                                    type={ UmbrlButton.SAVE }
                                    onClick={ () => {
                                        // setDone(true)
                                        saveThings()
                                    }}
                                    label="save high-risk items"
                                    disabled={ !hasUnsavedThings }
                                />
                            </div> : null
                        } */}
                  
                {/* {
                             !things?.length ?
                            <div className="block-generic">
                                <BtnComponent
                                    type={ UmbrlButton.CANCEL }
                                    onClick={ () => {
                                        setDone(true)
                                        saveThings()
                                    }}
                                    label="Continue without high-risk items"
                                />
                            </div> : 
                            <div className="resume-items">
                                <TxtNoteEvidence
                                    txt={ `Total amount specified` }
                                />
                                <TxtNoteEvidence
                                    txt={ `${ formatCurrency(insideTotalCurrent) }` }
                                />
                            </div>
                } */}
{/*                 
                {
                    done && coverageInspector.isOverCurrInside() && coverageInspector.upgradeInsideTo() === ProductId.FLEX ?
                        <UpgradeToFlexComponentInside udata={ udata } /> :
                        null
                }
                {
                    done && coverageInspector.isOverCurrInside() && coverageInspector.upgradeInsideTo() === ProductId.MAX ?
                        <UpgradeToMaxComponentInside udata={ udata } /> :
                        null
                }
                {
                    done && coverageInspector.isOverCurrInside() && coverageInspector.upgradeInsideTo() === null ?
                        <UpgradeRefusalComponent forValuables="inside" /> :
                        null
                } */}
            </div>
            {/* <div className="step-footer">
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
            </div> */}
            {
                // (done) && !coverageInspector.isOverCurrInside() ?
                done ?
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
                        stepactions={ stepactions(things?.length > 0) }
                    />: null
            }

    </li>

}