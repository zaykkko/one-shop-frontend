import type {SchemaOf} from "yup";
import * as yup from "yup";

import type {EditableProductData} from "@reducer/aluraGeekReducer";

const editableProductSchema: SchemaOf<EditableProductData> = yup
    .object()
    .shape({
        img_url: yup
            .string()
            .matches(
                /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                "Introduce una dirección URL válida."
            )
            .required("Por favor, completa este campo."),
        categoryId: yup
            .string()
            .matches(
                /^\{?[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}\}?$/i,
                "Por favor elige una categoría válida."
            )
            .required("Por favor, completa este campo."),
        title: yup.string().required("Por favor, completa este campo."),
        price: yup
            .string()
            .matches(
                /^\d*(.{1}\d{1,2})?$/,
                "Introduce solo números con un máximo de dos decimales."
            )
            .required("Por favor, completa este campo."),
        description: yup.string().required("Por favor, completa este campo."),
    });

export default editableProductSchema;
