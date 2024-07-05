import { formatCurrency } from "@/src/util/currency";
import { ExpandableSection } from "./expandableSection";
import { TxtListItem, TxtNoteEvidence, TxtPara, TxtTitleList } from "@/components/util/txt";
import { QuoteOpt } from "@/src/stores/staticQuoteJourneyDefinition";

export const ExcessDetailsComponent = ({ currentExcess, excessCoverageDetails, populatedOpts }: {
    currentExcess: number;
    excessCoverageDetails: { [k: string] : number };
    populatedOpts: QuoteOpt;
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
        <TxtTitleList txt={populatedOpts.title} isBorder={ true }/>
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

