'use client'

import { useContext, useState } from "react"
import { QuoteScreen } from "@/src/stores/staticQuoteJourneyDefinition"
import { FooterMode, ScreenFloatingFooterActionComponent, ScreenFooterComponent } from "@/components/quote/widgets/screenFooter"
import { ScreenMode } from "@/src/types"
import { TxtTitlePage } from "@/components/util/txt"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
import { StorableObj, UmbrlForm } from "@/src/models/form"
import { FormOrchestrator } from "../../orchestrators/formOrchestrator"
import { InfoBlockComponent } from "../../widgets/infoBlock"
import { useUmbrlForm } from "@/src/hooks/useUmbrlForm"


export const QuoteScreenCoverStartDateComponent = ({ screenDefinition, mode }: {
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

    if (!formDataManager) {
        return null
    }

return <>
        <div className={`${mode === ScreenMode.NORMAL ? 'screen screen-quote' : 'screen-edit'}`}>
                {
                    mode === ScreenMode.NORMAL ?
                        <TxtTitlePage
                            txt={screenDefinition.title}
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
                {
                    mode === ScreenMode.NORMAL ?
                    <div className="block-generic">
                    <InfoBlockComponent
                        info={screenDefinition.infoalert ?? ''}
                    />
                </div> : null
                }
            
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
                </div>:
                <ScreenFloatingFooterActionComponent
                    screenDefinition={screenDefinition}
                    screenValid={!!screendatavalid}
                    onNext={() => {
                        if (screendatavalid !== null) {
                            formDataManager.saveScreenData(screendatavalid, true)
                        }
                    }}
                />
        }
    </>
}
