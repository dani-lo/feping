import { useEffect, useState } from "react";

import {
    QuoteScreenStepId,
    StepAction
 } from "@/src/stores/staticQuoteJourneyDefinition"

import { StepMode } from "@/src/types"
import { twBtnIcon } from "@/src/styles/text.tailwind"

import { RefineMainPolicyHolderStepComponent } from "@/components/quote/screens/refine/persons/refineMainPolicyHolderStep"
import { RefineJointPolicyHolderStepComponent } from "@/components/quote/screens/refine/persons/refineJointPolicyHolderStep"
import { RefineResidentsStepComponent } from "@/components/quote/screens/refine/persons/refineResidentsStep"
import { RefineBuildingStepComponent } from "@/components/quote/screens/refine/building/refineBuildingStep"
// import { RefineOwnershipAndValuesStepComponent } from "@/components/quote/screens/refine/building/refineOwnershipAndValuesStep"
import { RefineRisksStepComponent } from "@/components/quote/screens/refine/building/refineRiskStep"
import { RefineHighRiskItemsStepComponent } from "@/components/quote/screens/refine/contents/refineHighRiskItems"

import { BtnComponent, UmbrlButton } from "@/components/libForm/btn";
import { RefineClaimsStepComponent } from "../screens/refine/persons/refineClaimsStep";
import CheckmarkFeature from "../widgets/checkmarkFeature";

type StepsValidHash = { [s: string]: boolean }

export const StepsOrchestratorComponent = ({ steps, onScreenUnvalid, onScreenValid, txtNext } : {
    steps: QuoteScreenStepId[];
    onScreenUnvalid: () => void;
    onScreenValid: () => void;
    txtNext: string;
}) => {

    

    const [laststep, setLaststep] = useState(0)
    const [expanded, setExpanded] = useState<number | null>(null)

    const [validSteps, setValidSteps] = useState<StepsValidHash>(steps.reduce((acc: StepsValidHash, stepId: QuoteScreenStepId) => {

        acc[stepId] = false

        return acc
    }, {} as const))

    useEffect(() => {

       const valid = Object.values(validSteps).filter(v => !!v)

       if (valid.length === steps.length && laststep >= steps.length) {
            onScreenValid()
       } else {
            onScreenUnvalid()
       }

    }, [validSteps])

    const editable = steps.length === laststep
    const icon = editable ? ` ${ twBtnIcon }  fa fa-pen` : ` ${ twBtnIcon }  fa fa-check`

    return <div>
        <ul className="steps-orchestrator">
        {
            steps.map((stepId, i) => {
                if (i > laststep) {
                    return null
                } else {
                    return <StepComponent
                        stepId={ stepId }
                        icon={ icon }
                        editable={ editable }
                        expanded={ expanded === i }
                        key={ stepId }
                        expand={ () => setExpanded(i) }
                        onConfirm={ () => {

                            if (!editable) {
                                setLaststep(i + 1)
                            }
                            setValidSteps({
                                ...validSteps,
                                [stepId]: true
                            })
                            setExpanded(null)
                        }}
                        setStepValid={ (stepId: string) => {
                            setValidSteps({
                                ...validSteps,
                                [stepId]: true
                            })
                        }}
                        setStepUnvalid={ (stepId: string) => {
                            setValidSteps({
                                ...validSteps,
                                [stepId]: false
                            })
                        }}
                    />
                }
            })
        }
        </ul>
        {
            Object.keys(validSteps).length === laststep && !expanded  ?
            <CheckmarkFeature
                text={ txtNext }
                icon='bld'
            />: null
        }

    </div>
}

const StepComponent = ({ editable, onConfirm, stepId, icon, expanded, expand, setStepValid, setStepUnvalid }: {
    stepId: QuoteScreenStepId;
    editable: boolean;
    onConfirm: () => void;
    icon: string;
    expanded: boolean;
    expand: () => void;
    setStepValid: (s: string) => void;
    setStepUnvalid: (s: string) => void;
}) => {

    switch (stepId) {

        case QuoteScreenStepId.REFINE_MAIN_POLICY_HOLDER:

            return <RefineMainPolicyHolderStepComponent
                stepId={ stepId }
                editable={ editable }
                onConfirm={ onConfirm }
                icon={ icon }
                expanded={ expanded }
                expand={ expand }
                setStepValid={ setStepValid }
                setStepUnvalid={ setStepUnvalid }
            />

        case QuoteScreenStepId.REFINE_SECONDARY_POLICY_HOLDER:

            return <RefineJointPolicyHolderStepComponent
                stepId={ stepId }
                editable={ editable }
                onConfirm={ onConfirm }
                icon={ icon }
                expanded={ expanded }
                expand={ expand }
                setStepValid={ setStepValid }
                setStepUnvalid={ setStepUnvalid }
            />

        case QuoteScreenStepId.REFINE_HOME_RESIDENTS:
            return <RefineResidentsStepComponent
                stepId={ stepId }
                editable={ editable }
                onConfirm={ onConfirm }
                icon={ icon }
                expanded={ expanded }
                expand={ expand }
                setStepValid={ setStepValid }
                setStepUnvalid={ setStepUnvalid }
            />

        case QuoteScreenStepId.REFINE_BUILDING:
            return <RefineBuildingStepComponent
                stepId={ stepId }
                editable={ editable }
                onConfirm={ onConfirm }
                icon={ icon }
                expanded={ expanded }
                expand={ expand }
                setStepValid={ setStepValid }
                setStepUnvalid={ setStepUnvalid }
            />

        // case QuoteScreenStepId.REFINE_OWNERSHIP_VALUES:
        //     return <RefineOwnershipAndValuesStepComponent
        //         stepId={ stepId }
        //         editable={ editable }
        //         onConfirm={ onConfirm }
        //         icon={ icon }
        //         expanded={ expanded }
        //         expand={ expand }
        //         setStepValid={ setStepValid }
        //         setStepUnvalid={ setStepUnvalid }
        //     />
        case QuoteScreenStepId.REFINE_RISKS:
            return <RefineRisksStepComponent
            stepId={ stepId }
                editable={ editable }
                onConfirm={ onConfirm }
                icon={ icon }
                expanded={ expanded }
                expand={ expand }
                setStepValid={ setStepValid }
                setStepUnvalid={ setStepUnvalid }
            />

        case QuoteScreenStepId.REFINE_VALUABLES_INSIDE:
            return <RefineHighRiskItemsStepComponent
                stepId={ stepId }
                editable={ editable }
                onConfirm={ onConfirm }
                icon={ icon }
                expanded={ expanded }
                expand={ expand }
                setStepValid={ setStepValid }
                setStepUnvalid={ setStepUnvalid }
            />

        case QuoteScreenStepId.REFINE_CLAIMS:
            return <RefineClaimsStepComponent
            stepId={ stepId }
            editable={ editable }
            onConfirm={ onConfirm }
            icon={ icon }
            expanded={ expanded }
            expand={ expand }
            setStepValid={ setStepValid }
            setStepUnvalid={ setStepUnvalid }
        />

    }

    return null
}

export const StepFooterComponent = ({
    stepactions,
    disabledSave,
    disabledConfirm,
    onConfirm,
    onUpdate,
    onSaveEdit,
    onCancelEdit,
    mode }: {
        stepactions: StepAction[];
        disabledSave: boolean;
        onConfirm: () => void;
        onUpdate: () => void;
        onSaveEdit: () => void;
        onCancelEdit: null | (() => void);
        mode: StepMode;
        disabledConfirm ?: boolean;
    }) => {

    return <div className="step-footer">
        {
            mode === StepMode.DISPLAY ?
                (stepactions).map(stepAction => {

                    return <BtnComponent
                        type={ stepAction.type as UmbrlButton }
                        onClick={ stepAction.type === UmbrlButton.CONFIRM ? onConfirm  : onUpdate }
                        label={ stepAction.text }
                        key={ stepAction.type }
                        disabled={ stepAction.type === UmbrlButton.CONFIRM && disabledConfirm }
                    />
                }):
                <>
                    { onCancelEdit !== null ?
                        <BtnComponent
                            type={ UmbrlButton.CANCEL }
                            onClick={ onCancelEdit }
                            label="cancel"
                        />:
                        null
                    }
                    <BtnComponent
                        type={ UmbrlButton.SAVE }
                        onClick={ onSaveEdit }
                        label="save"
                        disabled={ disabledSave }
                    />
                </>
        }
    </div>
}


