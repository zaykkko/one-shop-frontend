import {createContext, useContext, useReducer} from "react";

import {productReducer, productInitialState} from "@reducer/aluraGeekReducer";
import type {
    AluraGeekReducerAction,
    AluraGeekReducerState,
} from "@reducer/aluraGeekReducer";

interface ProductContextType {
    state: AluraGeekReducerState;
    dispatch: React.Dispatch<AluraGeekReducerAction>;
}

const AluraGeekContext = createContext<ProductContextType>(
    {} as ProductContextType
);

export function useAluraGeekContext() {
    const context = useContext(AluraGeekContext);

    if (context === undefined) {
        throw new Error(
            "useAluraGeekContext must be used within a AluraGeekContext"
        );
    }

    return context;
}

export function useAluraGeek() {
    const context = useContext(AluraGeekContext);

    if (context === undefined) {
        throw new Error("useAluraGeek must be used within a AluraGeekContext");
    }

    return context.state;
}

export function useAluraGeekProducts(categoryId: number) {
    const {products} = useAluraGeek();

    return products.filter((product) => product.categoryId === categoryId);
}

export const AluraGeekProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(productReducer, productInitialState);

    return (
        <AluraGeekContext.Provider value={{state, dispatch}}>
            {children}
        </AluraGeekContext.Provider>
    );
};
