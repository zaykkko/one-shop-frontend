import FooterStyles from "./footer.scss";
import SharedStyles from "@shared/styles.scss";

import classnames from "classnames";
import {useCallback, useId} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import type {SchemaOf} from "yup";

interface IContactFormInputs {
    name: string;
    message: string;
}

const contactFormSchema: SchemaOf<IContactFormInputs> = yup.object().shape({
    name: yup
        .string()
        .min(3)
        .max(20)
        .matches(/^[a-z\s\u00f1\u00d1\u00E0-\u00FC]+$/i)
        .required(),
    message: yup.string().required(),
});

const ContactForm = () => {
    const formId = useId();
    const {register, handleSubmit} = useForm<IContactFormInputs>({
        resolver: yupResolver(contactFormSchema),
    });
    const onSubmit = useCallback((data: IContactFormInputs) => {
        window.location.href = `mailto:no-reply@gmail.com?subject=${data.name}&body=${data.message}`;
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                <legend>Hable con nosotros</legend>
                <div className={SharedStyles.inputGroup}>
                    <label htmlFor={formId + "contact-name"}>Nombre</label>
                    <input
                        id={formId + "contact-name"}
                        type="text"
                        autoComplete="name"
                        minLength={3}
                        maxLength={20}
                        spellCheck="false"
                        required={true}
                        {...register("name")}
                    />
                    <div className={SharedStyles.inputGroup__lineDeco}></div>
                </div>
                <div className={SharedStyles.inputGroup}>
                    <label htmlFor={formId + "contact-message"}>
                        Escribe tu mensaje
                    </label>
                    <textarea
                        id={formId + "contact-message"}
                        required={true}
                        autoComplete="off"
                        spellCheck="true"
                        {...register("message")}
                    />
                    <div className={SharedStyles.inputGroup__lineDeco}></div>
                </div>
            </fieldset>
            <button
                className={classnames(
                    FooterStyles.form__submit,
                    SharedStyles.btn_basic
                )}
                type="submit"
            >
                Enviar mensaje
            </button>
        </form>
    );
};

export default ContactForm;
