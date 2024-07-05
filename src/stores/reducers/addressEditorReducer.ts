import { validPostcode } from "@/src/util/validators";
import { Dispatch } from "react";

interface ADDRESS_RES {
    description: string;
    postcode: string;
    acloud_id: string;
  }

export  interface AddressState {
    postcode: string | null;
    houseNum: string | null;
    isPostcodeValid: boolean | null;
    isHouseNumValid: boolean | null;
    addresses: ADDRESS_RES[];
    selectedAcloudId: string | null;
  }


  const addressEditorStateActions = {
    SET_AE_POSTCODE: "SET_AE_POSTCODE",
    SET_AE_HOUSENUM: "SET_AE_HOUSENUM",
    SET_AE_IS_POSTCODE_VALID: "SET_AE_IS_POSTCODE_VALID",
    SET_AE_IS_HOUSENUM_VALID: "SET_AE_IS_HOUSENUM_VALID",
    SET_AE_ADDRESS_ARR: "SET_AE_ADDRESS_ARR",
    SET_AE_SELECTED_ACLOUD_ID: "SET_AE_SELECTED_ACLOUD_ID",
    UNSET_AE_SELECTED_ACLOUD_ID: "UNSET_AE_SELECTED_ACLOUD_ID",
  }

  type AddressEditorStateActionKey = keyof typeof addressEditorStateActions
  type AddressEditorStateActionType = typeof addressEditorStateActions[AddressEditorStateActionKey]


  interface SetPostcodePayload {
    postcode: string;
  }

  interface SetHouseNumPayload {
    houseNum: string;
  }

  interface SetPostcodeValidityPayload {
    isPostcodeValid: boolean;
  }

  interface SetHouseNumValidityPayload {
    isHouseNumValid: boolean;
  }

  interface SetAddressArrPayload {
    addresses: ADDRESS_RES[];
  }

  interface SetSelectedAcloudIdPayload {
    selectedAcloudId: string | null;
  }

type AddressPayload =  SetPostcodePayload
| SetHouseNumPayload
| SetPostcodeValidityPayload
| SetHouseNumValidityPayload
| SetAddressArrPayload
| SetSelectedAcloudIdPayload;

  interface AddressEditorStateAction {
    type: AddressEditorStateActionType;
    payload: AddressPayload;
  }

  export const defaultAddressEditorState: AddressState = {
    postcode: null,
    houseNum: null,
    isPostcodeValid: null,
    isHouseNumValid: null,
    addresses: [],
    selectedAcloudId: null,
  }

  export type AddressStateDispatch = Dispatch<{ type: string; payload: AddressPayload }>

  export const addressEditorStateReducer = (state: AddressState, action: AddressEditorStateAction): AddressState => {

    switch (action.type) {
      case "SET_AE_POSTCODE":
        if ('postcode' in action.payload) {

          return {
            ...state,
            postcode: action.payload.postcode,
            isPostcodeValid: validPostcode(action.payload.postcode)
          }
        }
        return state;

      case "SET_AE_HOUSENUM":
        if ('houseNum' in action.payload) {
          return {
            ...state,
            houseNum: action.payload.houseNum,
            isHouseNumValid: !isNaN(parseInt(action.payload.houseNum))
          }
        }
        return state;

      case "SET_AE_ADDRESS_ARR":
        if ('addresses' in action.payload) {
          return {
            ...state,
            addresses: action.payload.addresses
          }
        }
        return state;

      case "SET_AE_SELECTED_ACLOUD_ID":
        if ('selectedAcloudId' in action.payload) {
          return {
            ...state,
            selectedAcloudId: action.payload.selectedAcloudId
          }
        }
        return state;

        case "UNSET_AE_SELECTED_ACLOUD_ID":
          return {
            ...state,
            selectedAcloudId: null
          }

      default:
        return state;
    }
  }
