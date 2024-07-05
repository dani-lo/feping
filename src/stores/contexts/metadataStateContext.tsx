import { Product, ProductDoc } from "@/src/models/product";
import { createContext, useReducer } from "react";

export type MetadataEnums = {
    [k: string]: {
        [k: string] : string;
    }
}

export type MetadataState = {
    products: Product[] | null;
    enums: MetadataEnums | null;
}

interface MetadataStateAction {
    type: 'SET_ENUMS' | 'SET_PRODUCTS';
    payload: ProductDoc[] |MetadataEnums;
}

const MetadataStateContext = createContext<{ state: MetadataState | null, dispatch: any } | null>(null);

const metaStateReducer = (state:MetadataState, action: MetadataStateAction): {} | null => {

    switch (action.type) {
        case "SET_ENUMS":
            return {
                ...state,
                enums:  action.payload as unknown as MetadataEnums
            }

        case "SET_PRODUCTS":
            
            const docs = action.payload as ProductDoc[]

            return {
                ...state,
                products:  docs.map(p => new Product(p)) as unknown as Product[]
            }

        default:
            return state;
    }
}

const defaultMetadataState = {
    products: null,
    enums: null
}

// type MetedataReducer = (prev: MetadataState, next: MetadataState) => MetadataState

const MetadataContextProvider = ({ children }: { children: React.ReactNode }) => {

    // @ts-ignore
    const [state, dispatch] = useReducer(metaStateReducer, defaultMetadataState)

    return (
        <MetadataStateContext.Provider value={{ state, dispatch }}>
            {children}
        </MetadataStateContext.Provider>
    );
};

export { MetadataContextProvider, MetadataStateContext, metaStateReducer }