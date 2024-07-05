'use client'

import { useContext, useEffect, useReducer } from "react"
import { Input } from "@nextui-org/react"

import { useForm } from "react-hook-form"

import {SelectableListComponent} from "./selectableList";
import { FormDataItem, UmbrlForm } from "@/src/models/form";
import { BtnComponent, UmbrlButton } from "@/components/libForm/btn"
import { QuoteOpt, QuoteScreen, QuoteScreenId, StaticQuoteJourneyDefinition } from "@/src/stores/staticQuoteJourneyDefinition"
import { FormOrchestrator } from "../orchestrators/formOrchestrator"
import { config } from "@/src/config"
import { TxtLabel, TxtNoteEvidence } from "@/components/util/txt"
import { addressEditorStateReducer, AddressState, AddressStateDispatch, defaultAddressEditorState } from "@/src/stores/reducers/addressEditorReducer"
import { Patterns, validNumber, validPostcode } from "@/src/util/validators";
import { LocalStateContext } from "@/src/stores/contexts/localStateContext";
import { populateOptsFromACloud } from "@/src/models/address";
import { debounce } from "@/src/util/debounce";

const AddressEditor = ({ onValid, onUnvalid, screendatavalid, formChanged } : {
    onValid: (data: { apikey: string; val: FormDataItem | null; }[]) => void;
    onUnvalid: () => void;
    formChanged: (hasFormChanged: boolean) => void;
    screendatavalid: { apikey: string; val: FormDataItem | null; }[] | null;
}) => {

    const screenDefinition = StaticQuoteJourneyDefinition.find(d => d.sid === QuoteScreenId.QUICK_QUOTE_PROPERTY) as QuoteScreen

    const localCtx = useContext(LocalStateContext)

    const formDataManager = new UmbrlForm(
        screenDefinition.opts,
        screenDefinition.apisection,
        localCtx?.state ?? null,
        localCtx?.dispatch  ?? null
    )

    const [state, dispatch] = useReducer(addressEditorStateReducer, defaultAddressEditorState);

    useEffect(() => {

        if (screendatavalid) {

            const changed = UmbrlForm.hasFormChanged(formDataManager, screendatavalid)

            formChanged(changed)
        }

        
    }, [screendatavalid])

    useEffect(() => {
        if (state?.postcode && validPostcode(state?.postcode) && state?.houseNum && validNumber(state?.houseNum)) {
            debounce(() => fetchAddresses(), 2000)()
        }
    }, [state?.houseNum, state?.postcode])

    useEffect(() => {
        const fetchAddressDetails = async () => {
            try {
                const response = await fetch(`${ config.url.addressDetails }/${state.selectedAcloudId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": config.acloud.key,
                        "x-client-id": config.acloud.clientId
                    }
                })

                if (response?.ok && state.selectedAcloudId) {

                    const data = await response.json()

                    const addressDetails = data["data"]
                    const populatedOpts = addressDetails ? populateOptsFromACloud(screenDefinition.opts, formDataManager.storageKey ?? '', addressDetails, state.selectedAcloudId) as QuoteOpt[] : null
                    
                    const storable = (populatedOpts ?? []).map(o => {
                        return {
                            apikey: o.apikey,
                            val: o.value ?? ''
                        }
                    })

                    onValid(storable)

                }
            } catch (error) {
                console.log(error)
            }
        }

        if (state.selectedAcloudId) {
            fetchAddressDetails()
        } else {
            onUnvalid()
        }
    }, [state.selectedAcloudId])

    const { register, formState: {errors} } = useForm({ mode: "onBlur"})

    const fetchAddresses = async () => {

        // disable form if user submits a new postcode
        dispatch({type: 'SET_AE_SELECTED_ACLOUD_ID', payload: {selectedAcloudId: null}})

        try {
            const postcode = state.postcode?.replace(/\s/g, '')

            const response = await fetch(`${ config.url.postcodeAddreses }/${postcode}?buildingNameOrNumber=${state.houseNum}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {

                const data = await response.json()

                const addresses = data.data

                dispatch({type: 'SET_AE_ADDRESS_ARR', payload: {addresses: addresses}})

            }
        } catch (error) {
            console.error(error)
        }
    }

    const inputStyle = (isError: boolean) => {
        return {
            label: 'bold',
            inputWrapper: isError ? "border bg-white input-not-valid" : "border bg-white" ,
        }
    }

    return <div className="address-editor">
        <div className="fxrow">
            <div className="block-field">
                <TxtLabel txt="House Number" />
                <Input
                    {...register("houseNum",
                        {
                            required: "This field is required.",
                            pattern: { value: Patterns.houseOrFlatAlphnum, message: '' }
                        }
                    )}
                    type="text"
                    onChange={(e) => dispatch({type: 'SET_AE_HOUSENUM', payload: {houseNum: e.target.value}}) }
                    value={ state.houseNum ?? undefined }
                    isRequired={true}
                    size="lg"
                    data-testid='address-editor-house-num-input'
                    classNames={ inputStyle(!!errors?.houseNum) }
                />
            </div>
            <div className="block-field">
                <TxtLabel txt="Postcode" />
                <Input
                    {...register("postcode",
                        {
                            required: "This field is required.",
                            pattern: { value: Patterns.postcode, message: '' },
                        }
                    )}
                    type="text"
                    onChange={(e) => dispatch({type: 'SET_AE_POSTCODE', payload: {postcode: e.target.value}})}
                    value={ state.postcode ?? undefined }
                    isRequired={true}
                    size="lg"
                    data-testid='address-editor-postcode-input'
                    classNames={ inputStyle(!!errors?.postcode) }
                />
            </div>
        </div>
        {/* <div className="block-right block-field">
            <BtnComponent
                type={ UmbrlButton.CONFIRM }
                label="Submit"
                onClick={fetchAddresses}
                disabled={!state.isPostcodeValid || !state.isHouseNumValid}
                size="sm"
                testid='address-editor-btn'
            />
        </div> */}
        {
            state.addresses.length > 0 &&
            <>
                {/* <TxtNoteEvidence txt="Please choose your address below"/> */}
                <SelectableListComponent
                    items={state.addresses.map((address: any) => {
                        return {
                            label: address.description,
                            key: address.acloud_id
                        }
                    })}
                    onSelectItem={ (item) => {

                        if (item !== state.selectedAcloudId) {
                            dispatch({
                                type: 'SET_AE_SELECTED_ACLOUD_ID',
                                payload: {
                                    selectedAcloudId: item
                                }
                            })

                        } else {
                            dispatch({
                                type: 'UNSET_AE_SELECTED_ACLOUD_ID',
                                payload: {
                                    selectedAcloudId: null
                                }
                            })
                        }

                    }}
                    actionLabel="Select"
                    selected={ state.selectedAcloudId ?? null }
                />
            </>
        }
    </div>
}

export { AddressEditor }