import { Slider } from "@nextui-org/react"
import { PolicyType } from "@/src/models/policy"
import { FormDataItem, UmbrlForm } from "@/src/models/form"
import { useState } from "react"
import { QuoteOpt } from "@/src/stores/staticQuoteJourneyDefinition"

import { formatCurrency } from "@/src/util/currency";
import { ExpandableSection } from "./expandableSection";
import { TxtNoteEvidence, TxtTitleSection, TxtTitleList, TxtTitleSub } from "@/components/util/txt";
import { useAtom } from "jotai"
import { uiStateAboutModal } from "@/src/stores/jotai/uiState"
import { BtnComponent, BtnComponentB, UmbrlButton } from "@/components/libForm/btn"
import { DefaultCoverageExcesses } from "@/src/models/excess"

export interface ExcessOptData {
    apikey: string;
    subsection?: string;
    val: FormDataItem | null;
}

export const ExcessesComponent = ({ policySelected, onContentsExcessChange, onBuildingsExcessChange, buildingExcess, contentsExcess }: {
    policySelected: PolicyType | null;
    onContentsExcessChange: (d: ExcessOptData[]) => void;
    onBuildingsExcessChange: (d: ExcessOptData[]) => void;
    buildingExcess: number;
    contentsExcess: number;
}) => {

    const [_a, setAboutModal] = useAtom(uiStateAboutModal)


    const [changed, setChanged] = useState({
        contents: false,
        buildings: false,
    })

    return <div>{

        policySelected !== PolicyType.CONTENTS ?
        
        <div className="pill-widget  excess-widget" >
            <div className="fxrow">
                <TxtTitleSub txt="Buildings cover excess" />
                <div className="pill-icon" onClick={ () => setAboutModal('BUILDINGS_EXCESS') } >
                    <i className="question-icon fa fa-question" />
                </div>
            </div>
            <Slider
                data-testid="buildings-excess-editor"
                size="sm"
                step={25}
                color={ changed.buildings ? "primary" : 'foreground'}
                showTooltip={true}
                formatOptions={{style: 'currency', currency: 'GBP'}}
                tooltipValueFormatOptions={{style: 'currency', currency: 'GBP'}}
                label='£0'
                // defaultValue={0}
                // showSteps={true}
                renderValue={({...props}) => (`£500`)}
                maxValue={500}
                minValue={0}
                value={ buildingExcess }
                className="max-w-md"
                onChange={ (v) => {

                    setChanged({
                        ...changed,
                        buildings: true
                    })

                    const d = [
                        {
                            apikey: 'voluntary_excess',
                            subsection: 'buildings_coverage',
                            val: v as FormDataItem
                        }
                    ]

                    onBuildingsExcessChange(d)
                }}
            />
            <TxtNoteEvidence txt={`You've chosen a voluntary excess of: £${buildingExcess}`} />
            <div className="block-">
                <ExcessBreakdownComponent
                    excessCoverageDetails={ DefaultCoverageExcesses.building }
                    currentExcess={ buildingExcess }
                />
            </div>
        </div>:
        null
    }
    {
        policySelected !== PolicyType.BUILDINGS ?
        <div className="pill-widget excess-widget">
            <div className="fxrow">
                <TxtTitleSub txt="Contents cover excess" />
                <div className="pill-icon" onClick={ () => setAboutModal('CONTENTS_EXCESS') } >
                    <i className="question-icon fa fa-question" />
                </div>
            </div>
            <Slider
                data-testid="contents-excess-editor"
                size="sm"
                step={25}
                color={ changed.contents ? "primary" : 'foreground'}
                formatOptions={{style: 'currency', currency: 'GBP'}}
                tooltipValueFormatOptions={{style: 'currency', currency: 'GBP'}}
                label='£0'
                // showSteps={true}
                // defaultValue={0}
                maxValue={500}
                minValue={0}
                value={contentsExcess}
                renderValue={({...props}) => (`£500`)}
                className="max-w-md"
                onChange={ (v) => {
                    
                    setChanged({
                        ...changed,
                        contents: true
                    })

                    const d = [
                        {
                            apikey: 'voluntary_excess',
                            subsection: 'contents_coverage',
                            val: v as FormDataItem
                        }
                    ]

                    onContentsExcessChange(d)
                }}
            />
            <TxtNoteEvidence txt={`You've chosen a voluntary excess of: £${contentsExcess}`} />
            <div className="block-">
                <ExcessBreakdownComponent
                    excessCoverageDetails={ DefaultCoverageExcesses.content }
                    currentExcess={ contentsExcess }
                />
            </div>
        </div>:
        null
    } 
    </div>
}

const ExcessBreakdownComponent = ({ currentExcess, excessCoverageDetails }: {
    currentExcess: number;
    excessCoverageDetails: { [k: string] : number };
}) => {

    const list = Object.keys(excessCoverageDetails).map(d => {

        return {
            label: d,
            val: excessCoverageDetails[d]
        }
    })

    const top = list.slice(0,1)
    const expandableList = list.slice(1, list.length)

    return <div className="excess-details-widget">
        <ul>
            <li className="fxrow">
                <TxtNoteEvidence txt={ top[0].label } />
                <TxtNoteEvidence txt={ formatCurrency(top[0].val + parseInt(`${ currentExcess }`)) } />
            </li>
        </ul>
        <ExpandableSection
             aria_label= "test"
             title= "Exceptions"
             subtitle= { null }
             body={[]}
        >
        <ul>
        {
            expandableList.map(d => {
                return <li className="fxrow" key={ d.label }>
                    <TxtNoteEvidence txt={ d.label } />
                    <TxtNoteEvidence txt={ formatCurrency(d.val + parseInt(`${ currentExcess }`)) } />
                </li>
            })
        }
        </ul>
        </ExpandableSection>
    </div>
}

export const ExcessesIntroComponent = ({ bldExc, cntExc, onEditExcesses}: {
    bldExc: number;
    cntExc: number;
    onEditExcesses: () => void;
}) => {
    return <div className="pill-widget excesses-intro-widget">
        <div className="fxrow">
            <TxtNoteEvidence txt={ "Buildings policy excess" } />
            <TxtNoteEvidence txt={ formatCurrency(bldExc) } />
        </div>
        <div className="fxrow">
            <TxtNoteEvidence txt={ "Contents policy excess" } />
            <TxtNoteEvidence txt={ formatCurrency(cntExc) } />
        </div>
        <div className="block-generic-deep  fxrow">
            <BtnComponentB
                type={ UmbrlButton.CONTINUE }
                label="Adjust excess"
                onClick={ onEditExcesses }
                asSecondary={ true }
                icon="fa fa-sliders"
                grow={ true }
            />
        </div>
    </div>
}