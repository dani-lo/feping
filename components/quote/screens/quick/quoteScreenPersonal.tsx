'use client'

import { useContext, useEffect, useState } from "react"

import { QuoteScreen, QuoteScreenId } from "@/src/stores/staticQuoteJourneyDefinition"

import { FooterMode, ScreenFloatingFooterActionComponent, ScreenFooterComponent } from "@/components/quote/widgets/screenFooter"
import { FormOrchestrator } from "@/components/quote/orchestrators/formOrchestrator"
import { ScreenMode } from "@/src/types"

import { FormDataItem, StorableObj, UmbrlForm } from "@/src/models/form"
import { TxtTitlePage } from "@/components/util/txt"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
import { useUmbrlForm } from "@/src/hooks/useUmbrlForm"
import { InfoBlockComponent } from "../../widgets/infoBlock"


export interface PersonalData {
    [k: string]: FormDataItem
}

export const QuoteScreenPersonalComponent = ({ screenDefinition, mode }: {
    screenDefinition: QuoteScreen;
    mode: ScreenMode;
}) => {

    const localCtx = useContext(LocalStateContext)

    const [screendatavalid, setScreendataValid] = useState<StorableObj[] | null>(null)

    const formDataManager = useUmbrlForm(
        screenDefinition.opts, 
        screenDefinition.apisection, 
        localCtx, 
        null, 
        setScreendataValid
    )

    if (!localCtx?.state || !formDataManager) {
        return null
    }
    
    return <>
        <div className={`${mode === ScreenMode.NORMAL ? 'screen' : 'screen-edit'}`}>
            {
                mode === ScreenMode.NORMAL ?
                    <TxtTitlePage
                        txt="Tell us about yourself."
                    /> :
                    null
            }
            <div className={`${mode === ScreenMode.NORMAL ? 'gray-container' : ''}`}>
                <FormOrchestrator
                    opts={screenDefinition.opts || []}
                    onValid={(data: StorableObj[]) => setScreendataValid(data)}
                    formDataManager={formDataManager}
                    onUnvalid={() => {
                        setScreendataValid(null)
                    }}
                />
            </div>
            <div className="block-generic">
                <InfoBlockComponent
                    info="We’ll never send you any marketing messages unless you choose to receive them."
                />
            </div>
        </div>
        {
            mode === ScreenMode.NORMAL ?
                <div className="screen-footer no-cancel">
                    <ScreenFooterComponent
                        screenDefinition={screenDefinition}
                        screenValid={!!screendatavalid}
                        onNext={() => {
                            if (screendatavalid !== null) {
                                formDataManager.saveScreenData(screendatavalid, true)
                            }
                        }}
                    />
                </div> :
                <ScreenFloatingFooterActionComponent
                    screenDefinition={screenDefinition}
                    screenValid={screendatavalid !== null}
                    onNext={() => {
                        if (screendatavalid !== null) {
                            formDataManager.saveScreenData(screendatavalid, true)
                        }
                    }}
                    disabled={!UmbrlForm.hasFormChanged(formDataManager, screendatavalid)}
                />
        }
    </>
}