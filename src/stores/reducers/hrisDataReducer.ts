import { Thing, sameThing } from "@/src/models/thing";
import { Dispatch } from "react";


export  interface HrisDataState {
    hris: Thing[];
}

export enum HrisEditorActions {
    INIT_HRIS = "INIT_HRIS",
    ADD_HRI = "ADD_HRI",
    REMOVE_HRI = "REMOVE_HRI",
    REMOVE_ALL_HRIS = "REMOVE_ALL_HRIS",
    SET_HRI_OUTSIDE = 'SET_HRI_OUTSIDE'
}

interface InitHrisPayload {
    hris: Thing[];
}
interface AddHriPayload {
    hri: Thing;
}

interface DeleteHriPayload {
    hri: Thing;
}

interface SetOutsideHriPayload {
    hri: Thing;
    insideAndOutside: boolean;
}


type HrisEditorPayload =  InitHrisPayload | AddHriPayload | DeleteHriPayload | SetOutsideHriPayload

interface HrisEditorStateAction {
    type: HrisEditorActions;
    payload: HrisEditorPayload;
}

export const defaultHrisEditorState: HrisDataState = {
    hris: [],
}

export type HrisEditorDispatch = Dispatch<HrisEditorStateAction>

export const hrisEditorStateReducer = (state: HrisDataState, action: HrisEditorStateAction): HrisDataState => {

    switch (action.type) {

        case HrisEditorActions.INIT_HRIS:
        
            if ('hris' in action.payload) {

                const hris = action.payload.hris

                return {
                    ...state,
                    hris: [...hris]
                }
                
            }
            
            return state

        case HrisEditorActions.ADD_HRI:

            if ('hri' in action.payload) {

                const newStateHris = [
                    ...state.hris,
                    action.payload.hri
                ]

                return {
                    hris: newStateHris
                }
            }

            return state

        case HrisEditorActions.REMOVE_HRI:

            if ('hri' in action.payload) {

                const toDelete = action.payload.hri
                const newStateHris = state.hris.filter(c => !sameThing(c, toDelete)) ?? []

                return {
                    hris: newStateHris
                }
            }

            return state

        case HrisEditorActions.REMOVE_ALL_HRIS:

            return {
                hris: []
            }

        case HrisEditorActions.SET_HRI_OUTSIDE:

            if ('hri' in action.payload && 'insideAndOutside' in action.payload) {

                const hri = action.payload.hri
                const insideAndOutside = action.payload.insideAndOutside

                const newStateHris = state.hris.map((t: Thing) => {
                    
                    if (sameThing(t, hri)) {
                        // return {
                        //     ...t,
                        //     insideAndOutside: insideAndOutside
                        // }
                        t.setInsideAndOutside(insideAndOutside)
                    }
                    return t
                })

                return {
                    hris: newStateHris
                }
            }

            return state

      default:
        return state;
    }
  }
