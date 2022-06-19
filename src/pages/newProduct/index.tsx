import NewProductStyles from "./newProduct.scss";
import SharedStyles from "@shared/styles.scss";

import {useCallback, useMemo, useId} from "react";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useNavigate} from "react-location";
import * as yup from "yup";
import Select from "react-select";

import {Title} from "@util/title";
import {useAluraGeekContext} from "@context/aluraGeek";
import selectStyles from "@shared/react-select";

import {
    addItemDispatcher,
    EditableProductData,
} from "@reducer/aluraGeekReducer";
import type {SchemaOf} from "yup";

const productFormSchema: SchemaOf<EditableProductData> = yup.object().shape({
    img_url: yup
        .string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            "FIELD_INVALID_URL"
        )
        .required("FIELD_REQUIRED"),
    categoryId: yup
        .string()
        .matches(
            /^\{?[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}\}?$/i,
            "FIELD_INVALID"
        )
        .required("FIELD_REQUIRED"),
    title: yup.string().required("FIELD_REQUIRED"),
    price: yup
        .string()
        .matches(/^\d*(.{1}\d{1,2})?$/, "FIELD_ONLY_POSITIVE_FLOAT")
        .required("FIELD_REQUIRED"),
    description: yup.string().required("FIELD_REQUIRED"),
});

const NewProductForm = () => {
    const formId = useId();
    const {
        state: {categories},
        dispatch,
    } = useAluraGeekContext();
    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<EditableProductData>({
        reValidateMode: "onSubmit",
        resolver: yupResolver(productFormSchema),
    });
    const navigate = useNavigate();

    const categoryOptions = useMemo(
        () =>
            categories.map((category) => ({
                value: category.id,
                label: category.categoryName,
            })),
        [categories]
    );

    const onSubmit = useCallback((data: EditableProductData) => {
        dispatch(addItemDispatcher(data));
        navigate({to: "/product/all"});
    }, []);

    return (
        <form
            className={NewProductStyles.newProduct}
            onSubmit={handleSubmit(onSubmit)}
        >
            <fieldset>
                <legend>Añadir un nuevo producto</legend>
                <div className={SharedStyles.inputGroup}>
                    <label htmlFor={formId + "img_url"}>URL de imagen</label>
                    <input
                        id={formId + "img_url"}
                        type="text"
                        autoComplete="off"
                        spellCheck="false"
                        required
                        aria-invalid={!!errors.img_url}
                        {...register("img_url")}
                    />
                    <div className={SharedStyles.inputGroup__lineDeco}></div>
                </div>
                {errors.img_url && (
                    <span role="alert">{errors.img_url.message}</span>
                )}
                <Controller
                    control={control}
                    name="categoryId"
                    render={({field: {onChange, value, ref}}) => (
                        <Select
                            id={formId + "categoryid"}
                            ref={ref}
                            styles={selectStyles}
                            options={categoryOptions}
                            placeholder="Categoría"
                            value={categoryOptions.find(
                                (option) => option.value === value
                            )}
                            onChange={(option) => onChange(option?.value)}
                        />
                    )}
                />
                {errors.categoryId && (
                    <span role="alert">{errors.categoryId.message}</span>
                )}
                <div className={SharedStyles.inputGroup}>
                    <label htmlFor={formId + "title"}>
                        Nombre del producto
                    </label>
                    <input
                        id={formId + "title"}
                        type="text"
                        autoComplete="off"
                        spellCheck="false"
                        required
                        aria-invalid={!!errors.title}
                        {...register("title")}
                    />
                    <div className={SharedStyles.inputGroup__lineDeco}></div>
                </div>
                {errors.title && (
                    <span role="alert">{errors.title.message}</span>
                )}
                <div className={SharedStyles.inputGroup}>
                    <label htmlFor={formId + "price"}>
                        Precio del producto
                    </label>
                    <input
                        id={formId + "price"}
                        type="number"
                        step="0.01"
                        autoComplete="off"
                        required
                        aria-invalid={!!errors.price}
                        {...register("price")}
                    />
                    <div className={SharedStyles.inputGroup__lineDeco}></div>
                </div>
                {errors.price && (
                    <span role="alert">{errors.price.message}</span>
                )}
                <div className={SharedStyles.inputGroup}>
                    <label htmlFor={formId + "description"}>
                        Descripción del producto
                    </label>
                    <textarea
                        id={formId + "description"}
                        aria-invalid={!!errors.description}
                        required
                        {...register("description")}
                    />
                    <div className={SharedStyles.inputGroup__lineDeco}></div>
                </div>
                {errors.description && (
                    <span role="alert">{errors.description.message}</span>
                )}
            </fieldset>
            <button type="submit" className={SharedStyles.btn_basic}>
                Añadir producto
            </button>
        </form>
    );
};

const NewProduct = () => (
    <section className={SharedStyles.container}>
        <Title>Añadir nuevo producto | AluraGeek</Title>
        <NewProductForm />
    </section>
);

export default NewProduct;
