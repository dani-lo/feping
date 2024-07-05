import { UmbrlForm } from "@/src/models/form";
import { QuoteOpt, QuoteOptType } from "@/src/stores/staticQuoteJourneyDefinition";
import { twNoteLg, twTitleSection, twTitleSub } from "@/src/styles/text.tailwind";
import { ScreenMode, StepMode } from "@/src/types";
import { isMissing, isSameArray, isTruthy } from "@/src/util/is";
import { useState } from "react";
import { SelectedThingsComponent } from "../widgets/thingsPicker";
import { formatCurrency } from "@/src/util/currency";
import { jsDateToUmbrlString } from "@/src/util/time";
import { TxtLabel, TxtLinePara, TxtListItem, TxtNoteEvidence, TxtPara, TxtTitleSection } from "@/components/util/txt";
import { ThingDoc } from "@/src/models/thing";
import { useAtom } from "jotai";
import { uiStateRefreshAtom } from "@/src/stores/jotai/uiState";
import { safeType } from "@/src/util/safe";

export const TextOrchestratorComponent = ({ opts, formDataManager, question, ignoreConfirmation } : {
    opts: QuoteOpt[];
    formDataManager: UmbrlForm;
    question: string | null;
    ignoreConfirmation ?: boolean;
}) => {


    if (!formDataManager.storageKey) {

        return null
    }

    if (question) {
        return <TxtLinePara 
            txt={ question }
        />
    }
    
    return <div className="text-orchestrator">
    {   
        opts.map((opt) => {

            if (!opt?.apikey) {// || (!opt?.confirmable && !ignoreConfirmation)) {
                return null
            }

            const value = safeType(formDataManager.keyVal(opt.apikey) ?? opt.assumed ?? 'Unknown')
            const hasValue = value && value !== 'Unknown'
            const title = opt.title 
            
            if (opt.type === QuoteOptType.BOOL) {
                
                const icon = hasValue && isTruthy(value) ? 'fa fa-check mr-2' : 'fa-solid fa-xmark mr-2'

                return <div key={ opt.apikey } className="fxrox-back pb-2">
                    <TxtListItem 
                        txt={ opt.question ?? title ?? '' }
                        icon={ icon }
                    />
                </div>
            } else if (opt.type === QuoteOptType.BOOL_INVERTED) {

                return <div key={ opt.apikey } className="fxrox-back pb-2">
                    <TxtListItem 
                        txt={ hasValue && value  ? title : title }
                        icon={ hasValue && value ? 'fa-solid fa-xmark mr-2' : 'fa fa-check mr-2' }
                    />
                </div>
            } else if (opt.type === QuoteOptType.SELECT) {

                const optionVal = (opt?.optionvals ?? []).find(ov => {
                    return ov.val === value || ov.label === value
                })

                return <div key={ opt.apikey } className="fxrox-back">
                    <TxtTitleSection
                        txt={ title }
                    />
                    <TxtPara
                        txt={ optionVal?.label ?? value}
                    />
                </div>
            } else if (opt.type === QuoteOptType.NUMERIC_CURRENCY) {

                return <div key={ opt.apikey } className="fxrox-back">
                    <TxtTitleSection 
                        txt={ title }
                    />
                    <TxtPara
                        txt={ formatCurrency(parseInt(value)) }
                    />
                </div>
            } else if (opt.type === QuoteOptType.DOB) {

                return <div key={ opt.apikey } className="fxrox-back">
                    <TxtTitleSection 
                        txt={ title }
                    />
                    <TxtPara 
                        txt={ jsDateToUmbrlString(new Date(value)) }
                    />
                </div>
            } else if (opt.type === QuoteOptType.EMAIL) {
                return <div key={ opt.apikey } className="fxrox-back">
                    <TxtTitleSection 
                        txt={ title }
                    />
                    <div className="email-field">
                        <TxtPara 
                            txt={ value }
                        />
                    </div>
                </div>
            } else {
                return <div key={ opt.apikey } className="fxrox-back ">
                    <TxtTitleSection 
                        txt={ title }
                    />
                    <TxtPara
                        txt={ value }
                    />
                </div>
            }
        })

    }
    </div>

}
