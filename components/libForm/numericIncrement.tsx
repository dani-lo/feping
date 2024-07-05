import { twNote, twNoteLg, twParagraph } from "@/src/styles/text.tailwind";
import { Button, Input } from "@nextui-org/react";
import { TxtPara } from "../util/txt";

export const NumericIncrementComponent = (({ val, onNumChanged, allowNegative, label }: { 
    val: number | null; 
    label: string;
    onNumChanged: (num: number) => void;
    allowNegative ?: boolean;
}) => {
    
    const disableDecrease = !val && allowNegative !== true

    const displayVal = val === null ? 0 : val

    return <div className="numeric-input-widget">
        <TxtPara txt={ label } />
        <div className="fxrow">

        
            <Button
                radius="sm" 
                size="md"
                color="primary"
                // variant="bordered"
                isIconOnly
                isDisabled={ disableDecrease }
                onClick={ () => onNumChanged(displayVal - 1)}
            >
                <i aria-hidden className="fa-solid fa-minus" />
            </Button>
            <Input
                type="number"
                onChange={(e) => onNumChanged(Number(e.target.value)) }
                value={!isNaN(Number(val)) ? `${val}` : undefined}
                // isRequired={opt.required}
                size="lg"
                // classNames={inputStyle(!!errors?.[opt.apikey])}
                // startContent={
                //     opt.type === QuoteOptType.NUMERIC_CURRENCY ?
                //         <div className="pointer-events-none flex items-center">
                //             <span className="text-default-400 text-small">&pound;</span>
                //         </div> :
                //         null
                // }
                // variant="bordered"
            />
            <Button
                radius="sm" 
                size="md"
                color="primary"
                // variant="bordered"
                isIconOnly
                onClick={ () => onNumChanged(displayVal + 1) }        
            >
                <i aria-hidden className="fa-solid fa-plus"></i>
            </Button>
        </div>
    </div>
})