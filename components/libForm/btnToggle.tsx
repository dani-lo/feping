import { TxtNoteEvidence } from "../util/txt";

export const BtnToggleComponent = ({ values, selected, onSelect } : {
    values: {val: string; label: string}[],
    selected: string;
    onSelect: (d: string) => void;
}) => {

    const isDefault =  selected === values[0].val

    return <div className={ `btn-toggle-widget  ${ isDefault ? '' : ' toggled' }` }>
        <div onClick={ () => onSelect(values[0].val )} className={ isDefault ? 'selected' : '' }>
            {/* <span>{ values[0].label }</span> */}
            { isDefault ? <i className="fa fa-check-circle" /> : null }
            <TxtNoteEvidence txt={ values[0].label } />
        </div>
        <div onClick={ () => onSelect(values[1].val )} className={ !isDefault ? 'selected' : '' }>
            {/* <span>{ values[1].label }</span> */}
            { !isDefault ? <i className="fa fa-check-circle" /> : null }
            <TxtNoteEvidence txt={ values[1].label } />
        </div>
    </div>

}