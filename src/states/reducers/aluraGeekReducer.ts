import {produce} from "immer";
import {v4 as uuidv4} from "uuid";

import DEFAULT_PRODUCTS from "./data/defaultProducts";
import DEFAULT_CATEGORIES from "./data/defaultCategories";

export enum ACTIONS {
    REFRESH_DATA = "@aluraGeekReducer/updateStoreData",
    REMOVE_PRODUCT = "@aluraGeekReducer/removeProduct",
    UPDATE_PRODUCT = "@aluraGeekReducer/updateProduct",
    ADD_PRODUCT = "@aluraGeekReducer/addProduct",
}

export type ProductCategory = {
    id: string;
    categoryName: string;
    categoryGroupId: string;
};

export type ProductData = {
    id: string;
    categoryId: ProductCategory["id"];
    img_url: string;
    title: string;
    price: string;
    description: string;
};

export type AluraGeekReducerState = {
    categories: ProductCategory[];
    products: ProductData[];
};

export type AluraGeekReducerAction = {
    type: ACTIONS;
    payload: {
        productId?: ProductData["id"];
        data?: Partial<EditableProductData>;
    };
};

export type EditableProductData = Omit<ProductData, "id">;

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
        case ACTIONS.REFRESH_DATA:
            return getInitialData();

        case ACTIONS.ADD_PRODUCT:
            if (payload.data) {
                const insertionResult = produce(state, (draft) => {
                    const productData = {
                        ...(payload.data as EditableProductData),
                        id: uuidv4(),
                    };

                    draft.products.push(productData);
                });

                saveProducts(insertionResult);

                return insertionResult;
            }

            return state;

        case ACTIONS.REMOVE_PRODUCT:
            if (payload.productId) {
                const removeResult = produce(state, (draft) => {
                    const productIndex = draft.products.findIndex(
                        (category) => category.id === payload.productId
                    );

                    if (productIndex !== -1) {
                        draft.products.splice(productIndex, 1);
                    }
                });

                saveProducts(removeResult);

                return removeResult;
            }

            return state;

        case ACTIONS.UPDATE_PRODUCT:
            if (payload.productId) {
                const updateResult = produce(state, (draft) => {
                    const productIndex = draft.products.findIndex(
                        (product) => product.id === payload.productId
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
            }

            return state;

        default:
            throw new Error(`Unhandled productReducer action type: ${type}`);
    }
};

export const refreshDataDispatcher = () => ({
    type: ACTIONS.REFRESH_DATA,
    payload: {},
});

export const removeItemDispatcher = (productId: ProductData["id"]) => ({
    type: ACTIONS.REMOVE_PRODUCT,
    payload: {
        productId,
    },
});

export const updateItemDispatcher = (
    productId: ProductData["id"],
    data: Partial<EditableProductData>
) => ({
    type: ACTIONS.UPDATE_PRODUCT,
    payload: {
        productId,
        data,
    },
});

export const addItemDispatcher = (data: EditableProductData) => ({
    type: ACTIONS.ADD_PRODUCT,
    payload: {
        data,
    },
});
