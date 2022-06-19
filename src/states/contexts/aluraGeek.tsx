import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useDebugValue,
} from "react";

import {
    productReducer,
    productInitialState,
    refreshDataDispatcher,
} from "@reducer/aluraGeekReducer";
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

export function useAluraGeekCategoryProducts(categoryId: string) {
    const {products} = useAluraGeek();

    return products.filter((product) => product.categoryId === categoryId);
}

export function useAluraGeekCategory(categoryGroupId: string) {
    const {categories} = useAluraGeek();

    const categoryIndex = categories.findIndex(
        (category) => category.categoryGroupId === categoryGroupId
    );

    useDebugValue(categoryGroupId);

    return categoryIndex === -1 ? null : categories[categoryIndex];
}

export function useAluraGeekProduct(productId: string) {
    const {products} = useAluraGeek();

    const productIndex = products.findIndex(
        (product) => product.id === productId
    );

    useDebugValue(productId);

    return productIndex === -1 ? null : products[productIndex];
}

export const AluraGeekProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(productReducer, productInitialState);

    useEffect(() => {
        function onStorageChange({key}: StorageEvent) {
            if (key === (process.env.ALURAGEEK_STORAGE_KEY as string)) {
                dispatch(refreshDataDispatcher());
            }
        }

        window.addEventListener("storage", onStorageChange);

        return () => {
            window.removeEventListener("storage", onStorageChange);
        };
    }, []);

    return (
        <AluraGeekContext.Provider value={{state, dispatch}}>
            {children}
        </AluraGeekContext.Provider>
    );
};
