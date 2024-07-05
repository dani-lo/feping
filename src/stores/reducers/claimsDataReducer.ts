import { Claim } from "@/src/models/claim";
import { Dispatch } from "react";


export  interface ClaimsDataState {
    claims: Claim[];
    madeClaims: boolean;
}


export enum ClaimsEditorActions {
    INIT_CLAIMS = "INIT_CLAIMS",
    ADD_CLAIM = "ADD_CLAIM",
    REMOVE_CLAIM = "REMOVE_CLAIM",
    REMOVE_ALL_CLAIMS = "REMOVE_ALL_CLAIMS",
    MADE_CLAIMS = 'MADE_CLAIMS'
}

interface InitClaimsPayload {
    claims: Claim[];
}
interface AddClaimPayload {
    claim: Claim;
}

interface DeleteClaimPayload {
    claim: Claim;
}

interface MadeClaimsPayload {
    madeClaims: boolean;
}

type ClaimsEditorPayload =  InitClaimsPayload | AddClaimPayload | DeleteClaimPayload | MadeClaimsPayload

interface ClaimsEditorStateAction {
    type: ClaimsEditorActions;
    payload: ClaimsEditorPayload;
}

export const defaultClaimsEditorState: ClaimsDataState = {
    claims: [],
    madeClaims: false,
}

export type ClaimsEditorDispatch = Dispatch<ClaimsEditorStateAction>

export const claimsEditorStateReducer = (state: ClaimsDataState, action: ClaimsEditorStateAction): ClaimsDataState => {

    switch (action.type) {

        case ClaimsEditorActions.INIT_CLAIMS:
        
            if ('claims' in action.payload) {

                const claims = action.payload.claims

                return {
                    ...state,
                    claims: [...claims]
                }
                
            }
            
            return state

        case ClaimsEditorActions.ADD_CLAIM:

            if ('claim' in action.payload) {
                const newStateClaims = [
                    ...state.claims,
                    action.payload.claim
                ]

                return {
                    ...state,
                    claims: newStateClaims
                }
            }

            return state

        case ClaimsEditorActions.REMOVE_CLAIM:

            if ('claim' in action.payload) {

                const toDelete = action.payload.claim
                const newStateClaims = state.claims.filter(c => c.getUid() !== toDelete.getUid()) ?? []

                return {
                    claims: newStateClaims,
                    madeClaims: state.madeClaims && newStateClaims.length > 0
                }
            }

            return state

        case ClaimsEditorActions.REMOVE_ALL_CLAIMS:

            return {
                claims: [],
                madeClaims: false
            }

        case ClaimsEditorActions.MADE_CLAIMS:
            
            if ('madeClaims' in action.payload) {
                return {
                    ...state,
                    madeClaims: action.payload.madeClaims
                }
            }
            
            return state

      default:
        return state;
    }
  }
