'use client'

import { QuoteScreen } from "@/src/stores/staticQuoteJourneyDefinition"
import { useContext, useReducer, useState } from "react"
import { FooterMode, ScreenFloatingFooterActionComponent, ScreenFooterComponent } from "@/components/quote/widgets/screenFooter"
import { ScreenMode } from "@/src/types"
import { FormDataItem, StorableObj, UmbrlForm } from "@/src/models/form"
import { AddressEditor } from "@/components/quote/widgets/addressEditor"
import { InfoBlockComponent } from "@/components/quote/widgets/infoBlock"
import { TxtTitlePage } from "@/components/util/txt"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
import { PolicyType, currentPolicy } from "@/src/models/policy"
import { addressEditorStateReducer, defaultAddressEditorState } from "@/src/stores/reducers/addressEditorReducer"
import { useUmbrlForm } from "@/src/hooks/useUmbrlForm"


export interface PropertyData {
    address: {
        acloud_id: string,
        street: string,
        postcode: string,
        premise_number: string,
        flat_number?: string,
        building_name?: string,
        town: string
    }
}

export const QuoteScreenPropertyComponent = ({ screenDefinition, mode }: {
            screenDefinition: QuoteScreen;
            mode: ScreenMode;
        }) => {

    // const [addressEditorFormDataManager, setAddressEditorFormDataManager] = useState<UmbrlForm | null>(null)
    const [addressEditorFormChanged, setAddressEditorFormChanged] = useState<boolean>(false)

    const [screendatavalid, setScreendataValid] = useState<StorableObj[] | null>(null)

    const [state, dispatch] = useReducer(addressEditorStateReducer, defaultAddressEditorState)

    const localCtx = useContext(LocalStateContext)

    const formDataManager = useUmbrlForm(
        screenDefinition.opts, 
        screenDefinition.apisection, 
        localCtx, 
        null, 
        setScreendataValid
    )

    const policySelected = currentPolicy(null, localCtx?.state ?? null)

    return <>
        <div className={`${mode === ScreenMode.NORMAL ? 'screen' : 'screen-edit'}`}>
            {
                mode === ScreenMode.NORMAL ?
                    <TxtTitlePage
                        txt="Where is your home?"
                    /> :
                    null
            }
            <div className={`${mode === ScreenMode.NORMAL ? 'gray-container' : ''}`}>
                <AddressEditor
                    onValid={ (data: { apikey: string; val: FormDataItem | null; }[]) => setScreendataValid(data)}
                    onUnvalid={ () => setScreendataValid(null)}
                    formChanged={(hasFormChanged: boolean) => setAddressEditorFormChanged(hasFormChanged)}
                    screendatavalid={screendatavalid}
                />
            </div>
            {
                policySelected !== PolicyType.BUILDINGS ?
                <div className="block-generic">
                    <InfoBlockComponent
                        info="If you’re buying contents cover, we need to know where your home is, so we can give you the right quote."
                    />
                </div> :null
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
                    disabled={!addressEditorFormChanged}
                />
        }
    </>
}