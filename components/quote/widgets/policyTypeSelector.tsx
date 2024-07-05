
import { ScreenMode } from "@/src/types";
import { ExpandableSection } from "@/components/quote/widgets/expandableSection"

import { Radio, RadioGroup } from "@nextui-org/react";
import { TipComponent } from "./tip";
import { PolicyType } from "@/src/models/policy";
import Image from "next/image";
import { TxtPara } from "@/components/util/txt";
import { PillComponent } from "./pill";

const PolicyTypeIcon = ({ p, t }: { p: PolicyType, t : string | null }) => {

    if (p === PolicyType.BUILDINGS_CONTENTS) {
        return <div className="fxrow">
            <Image src="/building.svg" width={ 28 } height={ 28 } alt="Buildings and Contents Policy" />
            <Image src="/contents.svg" width={ 28 } height={ 28 } alt="Buildings and Contents Policy" />
        </div>
    } else if (p === PolicyType.BUILDINGS) {
        return  <div className="fxrow">
            <Image src="/building.svg" width={ 28} height={ 28 } alt="Buildings Policy" />
        </div>
    } else if (p === PolicyType.CONTENTS) {
        return <div className="fxrow">
            <Image src="/contents.svg" width={ 28} height={ 28 } alt="Contents Policy" />
            { t ? <TipComponent tipTxt={ t } /> : null }
        </div>
    }
}

export const PolicyTypeSelector = ({
        selectedApiVal,
        onSelectVal,
        mode,
    }: {
            selectedApiVal: string | null;
            onSelectVal: (val: string) => void;
            mode: ScreenMode;
        }) => {

    const apiVals = [
        {
            "label": "Buildings and Contents cover",
            "text":"Get all-round protection for your home and everything inside it.",
            "val": PolicyType.BUILDINGS_CONTENTS,

        },
        {
            "label": "Buildings cover",
            "text":"Protect the structure of your home, like the roof, walls and kitchen. ",
            "val": PolicyType.BUILDINGS
        },
        {
            "label": "Contents cover",
            "text":"Insure high-risk items and personal belongings, like jewellery  and furniture.",
            "val": PolicyType.CONTENTS,
            "tip": "best for tenants"
        }
    ]

    return <div>
        { mode === ScreenMode.NORMAL ?
            apiVals.map(apiVal => {

                const cleanVal = apiVal.val.toLowerCase().replace(/\s/g, '-')

                return <PillComponent
                    title={ apiVal.label ?? '' }
                    expanded={ false }
                    onAction={ null }
                    icons={ null }
                    onClick={ () => {
                        onSelectVal(apiVal.val)
                    }}
                    active={ selectedApiVal === apiVal.val }
                    testid={ apiVal.val }
                    key={ apiVal.val }
                >
                    
                    <TxtPara txt={ apiVal.text } />
                    <ExpandableSection
                        aria_label= "test"
                        title= { "More details" }
                        subtitle= { null }
                        body={[
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        "We have used the turns false. However, if the data is not a number or cannot be converted to a number, returns true"
                        ]}
                    />
                </PillComponent>
                // return <div
                //     key={ apiVal.label }
                //     className={ `pill-widget policy-selector block-generic ${ selectedApiVal === apiVal.val ? 'selected' : '' }` }
                //     data-testid={ `${ cleanVal }-container` }
                // >
                //     <PolicyTypeIcon
                //         p={ apiVal.val }
                //         t={ apiVal.tip ?? null }
                //     />
                //     <h2
                //         className={ twTitleSection }
                //         onClick={ () => {
                //             onSelectVal(apiVal.val)
                //         }}
                //         data-testid={ cleanVal }
                //     >
                //         { apiVal.label ?? '' }
                //     </h2>
                //     <TxtPara txt={ apiVal.text } />
                //     <ExpandableSection
                //         aria_label= "test"
                //         title= { "More details" }
                //         subtitle= { null }
                //         body={[
                //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                //         "We have used the turns false. However, if the data is not a number or cannot be converted to a number, returns true"
                //         ]}
                //     />
                // </div>
            }) :
            <form>
                <div className="block-field">
                    <RadioGroup
                        defaultValue={ selectedApiVal ?? undefined }
                        onChange={ (e) => onSelectVal(e.target.value)}
                        size="md"
                    >
                        {
                            apiVals.map(apiVal => {
                                return <>
                                    <Radio key={ apiVal.label } value={ apiVal.val } data-selected={ selectedApiVal === apiVal.val }>
                                        { apiVal.label ?? '' }
                                    </Radio>
                                </>
                                })
                        }
                    </RadioGroup>
                </div>
                
            </form>
        }
    </div>
}