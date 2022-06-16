import {produce} from "immer";

import DEFAULT_PRODUCTS from "./data/defaultProducts";
import DEFAULT_CATEGORIES from "./data/defaultCategories";

export enum ACTIONS {
    REMOVE_PRODUCT = "@aluraGeekReducer/removeProduct",
    UPDATE_PRODUCT = "@aluraGeekReducer/updateProduct",
}

export type ProductData = {
    id: number;
    categoryId: number;
    img_url: string;
    title: string;
    price: string;
};

export type ProductCategory = {
    id: number;
    categoryName: string;
    categoryGroupId: string;
};

export type AluraGeekReducerState = {
    categories: ProductCategory[];
    products: ProductData[];
};

export type AluraGeekReducerAction = {
    type: ACTIONS;
    payload: {
        productId: number;
        data: Partial<ProductData>;
    };
};

function getInitialData() {
    const localData = localStorage.getItem(
        process.env.ALURAGEEK_STORAGE_KEY as string
    );

    if (!localData) {
        const defaultState = {
            categories: DEFAULT_CATEGORIES,
            products: DEFAULT_PRODUCTS,
        };

        localStorage.setItem(
            process.env.ALURAGEEK_STORAGE_KEY as string,
            JSON.stringify(defaultState)
        );

        return defaultState;
    }

    return JSON.parse(localData);
}

function saveProducts(data: AluraGeekReducerState): void {
    const localData = JSON.stringify(data);

    localStorage.setItem(
        process.env.ALURAGEEK_STORAGE_KEY as string,
        localData
    );
}

export const productInitialState = getInitialData();

export const productReducer = (
    state: AluraGeekReducerState,
    {type, payload}: AluraGeekReducerAction
): AluraGeekReducerState => {
    switch (type) {
        case ACTIONS.REMOVE_PRODUCT:
            const removeResult = produce(state, (draft) => {
                const productIndex = draft.products.findIndex(
                    (category) => category.id === payload.productId
                );

                if (productIndex !== -1) {
                    delete draft.products[productIndex];
                }
            });

            saveProducts(removeResult);

            return removeResult;

        case ACTIONS.UPDATE_PRODUCT:
            const updateResult = produce(state, (draft) => {
                const productIndex = draft.categories.findIndex(
                    (category) => category.id === payload.productId
                );

                if (productIndex !== -1) {
                    draft.products[productIndex] = {
                        ...draft.products[productIndex],
                        ...payload.data,
                    };
                }
            });

            saveProducts(updateResult);

            return updateResult;

        default:
            throw new Error(`Unhandled productReducer action type: ${type}`);
    }
};
