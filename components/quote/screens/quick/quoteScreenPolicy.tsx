'use client'

import { useContext, useEffect, useState } from "react"

import { QuoteScreen } from "@/src/stores/staticQuoteJourneyDefinition"

import { PolicyTypeSelector } from "@/components/quote/widgets/policyTypeSelector"
import { FooterMode, ScreenFloatingFooterActionComponent, ScreenFooterComponent } from "@/components/quote/widgets/screenFooter"
import { ScreenMode } from "@/src/types"
import { useAtom } from "jotai"
import { uiStateRefreshAtom } from "@/src/stores/jotai/uiState"
import { TxtNoteEvidence, TxtTitlePage, TxtTitleSub } from "@/components/util/txt"
import { LocalStateContext } from "@/src/stores/contexts/localStateContext"
import { UmbrlForm } from "@/src/models/form"
import { useUmbrlForm } from "@/src/hooks/useUmbrlForm"

export interface PolicyData {
    coverage_type: string
}

export const QuoteScreenStartComponent = ({ screenDefinition, mode }: {
    screenDefinition: QuoteScreen;
    mode: ScreenMode;
}) => {

    const localCtx = useContext(LocalStateContext)

    const formDataManager = useUmbrlForm(
        screenDefinition.opts, 
        screenDefinition.apisection, 
        localCtx, 
        null, 
        () => void 0
    )
    
    const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null)
    const [refresh, setRefresh] = useAtom(uiStateRefreshAtom)

    const nextScreen = screenDefinition.sidnext

    const selected = formDataManager.keyVal(screenDefinition.opts[0].apikey ?? '')

    useEffect(() => {

        if (selected) {
            setSelectedPolicy(selected)
        }
    }, [selected])

    if (!nextScreen) {
        return null
    }

    return <>
        <div className={`${mode === ScreenMode.NORMAL ? 'screen screen-quote' : 'screen-edit'}`}>
            {/* {
                mode === ScreenMode.NORMAL ?
                    <TxtTitlePage txt="Get a quote in three easy steps." isCentered={ true } /> :
                    null
            } */}
            <div className="screen-form">
                {
                    mode === ScreenMode.NORMAL ?
                        <TxtTitlePage
                            txt="What type of cover do you need?"
                        /> :
                        null
                }
                <PolicyTypeSelector
                    selectedApiVal={selectedPolicy}
                    onSelectVal={(val: string) => {
                        if (val === selectedPolicy) {

                        }
                        setSelectedPolicy(val === selectedPolicy ? null : val)
                    }}
                    mode={mode}
                />
            </div>
        </div>
        {
            mode === ScreenMode.NORMAL ?
                <div className="screen-footer no-cancel">
                    <ScreenFooterComponent
                        screenDefinition={screenDefinition}
                        screenValid={!!selectedPolicy}
                        onNext={() => {
                            const toSave = [
                                {
                                    apikey: 'coverage_type',
                                    val: selectedPolicy
                                }
                            ]
                            formDataManager.saveScreenData(toSave, true)
                        }}
                    />
                </div> :
                <ScreenFloatingFooterActionComponent
                    screenDefinition={screenDefinition}
                    screenValid={!!selectedPolicy}
                    disabled={ selectedPolicy === selected }
                    onNext={() => {

                        const toSave = [
                            {
                                apikey: 'coverage_type',
                                val: selectedPolicy
                            }
                        ]

                        formDataManager.saveScreenData(toSave, false)

                        setRefresh(refresh + 1)
                    }}
                />
        }
    </>
}
