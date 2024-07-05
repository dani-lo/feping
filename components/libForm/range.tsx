import { twNoteLg, twTitleSection } from "@/src/styles/text.tailwind";
import { formatCurrency } from "@/src/util/currency";
import { Button, Checkbox, Slider, SliderValue } from "@nextui-org/react";
import { useState } from "react";
import { TxtNoteEvidence } from "../util/txt";

export interface SelectableRange {
    stopgaps: number[];
    selectedvalue: number | null;
}

export const RangeSelectorComponent = ({ range, onSelectItem, sliderLabel, type, optional }: {
    range: SelectableRange;
    onSelectItem: (gap: number) => void;
    sliderLabel: string;
    type: 'days' | 'currency';
    optional: boolean;
}) => {


    const [editmode, setEditmode] = useState(false)
    const [selected, setSelected] = useState(range.selectedvalue ? true : false)

    const [rangeval, setRangeval] = useState(range.selectedvalue ?? range.stopgaps[0])

    const formatted = (n: number) => type === 'currency' ? formatCurrency(n) : `${ n } days`

    const marks = range.stopgaps.map(sg => {
        return {
            value: sg,
            label:formatted(sg)
        }
    })

    const selectedVal = range.selectedvalue ?? range.stopgaps[0]

    return <div className="range-selector">
        
        {
            editmode ?
            <div className="range-slider">

                <Slider
                    label={ sliderLabel } 
                    color="secondary"
                    size="sm"
                    step={ marks.length } 
                    marks={ marks }
                    defaultValue={ selectedVal }
                    className="max-w"
                    onChange={ (value: SliderValue) => {
                        onSelectItem(Array.isArray(value) ? value[0] : value)
                    
                    }}
                />
                <div className="range-slider-actions">
                    <Button
                        size="sm"
                        color="secondary"
                        radius="full" 
                        // variant="bordered"
                        onClick={ () => void 0 }
                    >
                        cancel
                    </Button>
                    <Button
                        size="sm"
                        color="secondary"
                        radius="full" 
                        onClick={ () => void 0 }
                    >
                        ok
                    </Button>
                </div>
            </div>:
            <>
                {
                    optional ?
                    <div className="optional-range-title">
                        <Checkbox
                            size="sm"
                            onClick={ () => {
                                setSelected(!selected)
                                onSelectItem(rangeval)
                            }}
                            />
                            <TxtNoteEvidence txt={ sliderLabel } />
                    </div>:
                    <TxtNoteEvidence txt={ `${ sliderLabel } -  up to ${ formatted(rangeval) }` } />
                }
                
                <span>
                    {
                        !optional || selected ?
                        <i 
                            className="fa fa-pen" 
                            onClick={ () => setEditmode(true) }
                        />: null
                    }
                    
                </span>
            </>
        }
        
    </div>
}