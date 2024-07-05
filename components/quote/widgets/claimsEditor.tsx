import { Input, Checkbox, Select, SelectItem } from "@nextui-org/react"

import { useContext, useState } from "react"

import { Claim, ClaimDoc } from "@/src/models/claim";
import { jsDateToUmbrlString } from "@/src/util/time";
import { useForm } from "react-hook-form";
import { DateInputComponent } from '@/components/libForm/dateInputComponent';
import { BtnComponent, BtnComponentB, UmbrlButton } from "@/components/libForm/btn";
import { formatCurrency } from "@/src/util/currency";
import { TxtLabel, TxtNoteEvidence, TxtPara } from "@/components/util/txt"
import { MetadataStateContext } from "@/src/stores/contexts/metadataStateContext";
import { QuoteOptValidationRule } from "@/src/stores/staticQuoteJourneyDefinition";
import { ScreenContainerComponent } from "./screenContainer";
import { ClaimsDataState, ClaimsEditorActions, ClaimsEditorDispatch } from "@/src/stores/reducers/claimsDataReducer";
import { SidebarComponent } from "@/components/util/sidebar";
import { useMetadata } from "@/src/hooks/useMetadata";
import { useAtom } from "jotai";
import { uiStateSidebar } from "@/src/stores/jotai/uiState";

// export const ClaimsEditorComponent = ({ claims, onAddClaim, onDeleteClaim, onCancel }: {
//     claims: Claim[];
//     onAddClaim: (c: Claim) => void;
//     onDeleteClaim: (uid: string) => void;
//     onCancel: () => void;
// }) => {

//     return <div className="claims-editor">

//         <ClaimFormComponent
//             onSave={(c: Claim) => {
//                 onAddClaim(c)
//             }}
//             onCancel={onCancel}
//         />
//     </div>

// }

export const ClaimResumeComponent = ({ claim, onDeleteClaim }: {
    claim: Claim;
    onDeleteClaim: () => void;
}) => {

    if (!claim.valid()) {
        return null
    }

    return <div className="claim-detail-item">
        <div>
            <TxtNoteEvidence txt={jsDateToUmbrlString(claim.date as Date)} />
        </div>
        <div>
            <TxtNoteEvidence txt={formatCurrency(claim.amount ?? 0)} />
        </div>
        <div>
            <TxtNoteEvidence txt={claim.status ?? ''} />
        </div>
        <div 
            className="action-icon" 
            onClick={() => onDeleteClaim()}
        >
                <i aria-hidden className="fa fa-times" />
        </div>
    </div>
}

export const ClaimsEditorComponent = ({ claimsDispatch, onSaveClaim }: { 
        claimsDispatch: ClaimsEditorDispatch;
        onSaveClaim: () => void;
    }) => {

    const [claimdata, setClaimdata] = useState({
        date: null,
        amount: null,
        peril: null,
        coverage_type: null,
        status: null,
    })

    // const [sidebar, setSidebar] = useAtom(uiStateSidebar)

    const {
        register,
        formState: { errors }
    } = useForm({
        mode: "onBlur"
    })

    // const metadataCtx = useContext(MetadataStateContext)

    // console.log(metadataCtx)

    // if (!metadataCtx?.state?.enums) {
    //     return null
    // }

    const enums = useMetadata() //metadataCtx.state.enums

    const optionsPeril = Object.keys(enums.peril_type).map(k => {
        return {
            label: k.toLowerCase().replace(/_/g, ' '),
            val: enums.peril_type[k]
        }
    })
    const optionsStatus = Object.keys(enums.status).map(k => {
        return {
            label: k.toLowerCase().replace(/_/g, ' '),
            val: enums.status[k]
        }
    })
    const optionsCoverageType = Object.keys(enums.coverage_type).map(k => {
        return {
            label: k.toLowerCase().replace(/_/g, ' '),
            val: enums.coverage_type[k]
        }
    })

    const onChange = (k: string, v: any) => {
        setClaimdata({ ...claimdata, [k]: v })
    }

    const inputStyles = {
        label: 'bold',
        inputWrapper: "border bg-white",
        selectWrapper: "border bg-white",
    }

    return <SidebarComponent> 
        <ScreenContainerComponent to={ 100 }>
            <div className="claims-editor">

                <form className="pb-5">
                    <div className="block-field">
                        <TxtLabel txt="When did the incident happen?" />
                        <DateInputComponent
                            validationRule={QuoteOptValidationRule.DOB}
                            selectedDate={claimdata.date ?? undefined}
                            onDateChange={(dateStr: string) => {
                                onChange('date', dateStr)
                            }}
                        />
                    </div>

                    <div className="block-field">
                        <TxtLabel txt="How much did you claim?" />
                        <Input
                            type="number"
                            errorMessage={errors?.['amount']?.message?.toString()}
                            onChange={(e) => onChange('amount', e.target.value)}
                            value={claimdata.amount ?? undefined}
                            isRequired={true}
                            size="lg"
                            classNames={inputStyles}
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">&pound;</span>
                                </div>
                            }
                        />
                    </div>
                    <div className="block-field">
                        <TxtLabel txt="Was the claim for building or contents?" />
                        <Select
                            label=""
                            placeholder="select"
                            onChange={(e) => {
                                onChange('coverage_type', e.target.value)
                            }}
                            isRequired={true}
                            size="lg"
                            classNames={inputStyles}
                        >
                            {
                                optionsCoverageType.map((optVal) => {
                                    return <SelectItem
                                        key={optVal.val}
                                        value={optVal.val}
                                        data-selected={claimdata.coverage_type === optVal.val}>
                                        {optVal.label}
                                    </SelectItem>
                                })
                            }
                        </Select>
                    </div>
                    <div className="block-field">
                        <TxtLabel txt="Please tell us what happened" />
                        <Select
                            defaultSelectedKeys={claimdata.peril ? [String(claimdata.peril)] : []}
                            placeholder="select"
                            onChange={(e) => {
                                onChange('peril', e.target.value)
                            }}
                            isRequired={true}
                            size="lg"
                            classNames={inputStyles}
                        >
                            {
                                optionsPeril.map((optVal) => {
                                    return <SelectItem
                                        key={optVal.val}
                                        value={optVal.val}
                                        data-selected={claimdata.peril === optVal.val}>
                                        {optVal.label}
                                    </SelectItem>
                                })
                            }
                        </Select>
                    </div>

                    <div className="block-field">
                        <TxtLabel txt="Is the claim data settled or still outstanding?" />
                        <Select
                            placeholder="select"
                            onChange={(e) => {
                                onChange('status', e.target.value)
                            }}
                            isRequired={true}
                            size="lg"
                        >
                            {
                                optionsStatus.map((optVal) => {
                                    return <SelectItem
                                        key={optVal.val}
                                        value={optVal.val}
                                        data-selected={claimdata.status === optVal.val}>
                                        {optVal.label}
                                    </SelectItem>
                                })
                            }
                        </Select>
                    </div>
                    <div className="step-footer">
                        <BtnComponentB
                            type={UmbrlButton.CONTINUE}
                            label="Save claim"
                            onClick={() => {

                                if (
                                    claimdata.amount !== null &&
                                    claimdata.date !== null &&
                                    claimdata.peril !== null &&
                                    claimdata.coverage_type !== null &&
                                    claimdata.status !== null
                                ) {

                                    claimsDispatch({
                                        type: ClaimsEditorActions.ADD_CLAIM,
                                        // @ts-ignore
                                        payload: { claim: new Claim(claimdata) }
                                    })
            
                                    setClaimdata({
                                        date: null,
                                        amount: null,
                                        peril: null,
                                        coverage_type: null,
                                        status: null,
                                    })

                                    onSaveClaim()
                                }

                                
                            }}
                            disabled={Object.values(claimdata).some(d => !d)}
                        />
                        <BtnComponentB
                            type={UmbrlButton.CANCEL}
                            label="Cancel"
                            onClick={() => {

                                // onSave(new Claim(claimdata as unknown as ClaimDoc))

                                setClaimdata({
                                    date: null,
                                    amount: null,
                                    peril: null,
                                    coverage_type: null,
                                    status: null,
                                })

                                onSaveClaim()
                            }}
                            // disabled={Object.values(claimdata).some(d => !d)}
                        />
                    </div>
                </form>
            </div>
        </ScreenContainerComponent>
    </SidebarComponent>
}

export const claimsTotalString = (claims: Claim[]) => {
    const total = claims.reduce((acc: number, claim: Claim) => {
        const amt = parseInt(`${claim.amount}` ?? '0')
        return acc + (amt)
    }, 0)

    return formatCurrency(total)
}