import { TxtNoteEvidence, TxtTitleSection, TxtTitleSub } from "@/components/util/txt";
import { ThingDoc, thingId } from "@/src/models/thing";
import { formatCurrency } from "@/src/util/currency";

export const StepResumeComponent = ({ editable, title, icon, onClick, things }: {
    editable: boolean;
    title: string;
    icon: string;
    onClick: () => void;
    things ?: ThingDoc[];
}) => {
    
    return <li 
            className={ `step-ready pill-widget ${ editable ? 'editable' : '' }` }
        >   
        <div className="resume-title fxrow">

            <TxtTitleSub
                txt={ title }
                icon="fa fa-check-circle"
            />
            {
                editable ?
                <div className="action-icon">
                    <i 
                        className={ icon } 
                        aria-hidden
                        onClick={  onClick }
                    />
                </div>: 
                null
            }
            
        </div>
        {
           (things ?? []).map(thing => {
                return <div className="fxrow" key={ thingId(thing) } data-testid={ `step-resume-thing-${ thingId(thing) }`}>
                    <TxtNoteEvidence
                        txt={ thing.description }
                    />
                    <TxtNoteEvidence
                        txt={ `${ formatCurrency(thing.value ?? 0) }` }
                    />
                </div>
            })
        }
    </li>
}