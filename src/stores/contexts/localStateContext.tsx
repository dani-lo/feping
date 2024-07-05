import { FormDataItem } from "@/src/models/form";
import { store } from "@/src/util/storage";
import { Dispatch, createContext, useReducer } from "react";

enum LocalStateActionType {
    SAVE_DATA = "SAVE_DATA",
    INIT_DATA = "INIT_DATA"
}

export type LocalState = { [k: string]: FormDataItem | LocalState }

export type LocalStateDispatchPayload = { key: string; dataTree: LocalState } | { key: string; dataTree: LocalState }[]

export type LocalStateDispatch = Dispatch<{ type: string; payload: LocalStateDispatchPayload }>

interface LocalStateAction {
    type: LocalStateActionType;
    payload: { key: string; dataTree: LocalState } | { key: string; dataTree: LocalState }[]
}

const LocalStateContext = createContext<{ 
    state: LocalState | null, 
    dispatch: LocalStateDispatch 
} | null>(null);

const localStateReducer = (state: LocalState | null, action: LocalStateAction) => {

    switch (action.type) {

        case "SAVE_DATA":

            const obj = action.payload as  { key: string; dataTree: LocalState }

            const newState = {
                ...state,
                [obj.key]: obj.dataTree
            }

            store(obj.key, obj.dataTree)

            return newState

        case "INIT_DATA":

            const objs = action.payload as { key: string; dataTree: LocalState }[]

            const fullStorageState = objs.reduce((acc: LocalState, curr: { key: string; dataTree: LocalState }) => {

                // @ts-ignore
                acc[curr.key] = curr.dataTree

                return acc
            }, {})

            return fullStorageState
    }
}

const LocalStateContextProvider = ({ children }: { children: React.ReactNode }) => {

    // @ts-ignore
    const [state, dispatch] = useReducer(localStateReducer, null)

    return (
        <LocalStateContext.Provider value={{ state, dispatch }}>
            {children}
        </LocalStateContext.Provider>
    )
}

export { LocalStateContext, LocalStateContextProvider, localStateReducer }