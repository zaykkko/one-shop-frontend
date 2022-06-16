import FooterStyles from "./footer.scss";
import SharedStyles from "@shared/styles.scss";

import classnames from "classnames";
import {useCallback} from "react";
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
    const {register, handleSubmit} = useForm<IContactFormInputs>({
        resolver: yupResolver(contactFormSchema),
    });
    const onSubmit = useCallback((data: IContactFormInputs) => {}, []);

    return (
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                <legend>Hable con nosotros</legend>
                <div className={FooterStyles.form__inputgroup}>
                    <label
                        className={FooterStyles.form__label}
                        htmlFor="contact-name"
                    >
                        Nombre
                    </label>
                    <input
                        id="contact-name"
                        className={FooterStyles.form__input}
                        type="text"
                        autoComplete="name"
                        minLength={3}
                        maxLength={20}
                        spellCheck="false"
                        required={true}
                        {...register("name")}
                    />
                    <div className={FooterStyles.form__inputLine}></div>
                </div>
                <div className={FooterStyles.form__inputgroup}>
                    <label
                        className={FooterStyles.form__label}
                        htmlFor="contact-message"
                    >
                        Escribe tu mensaje
                    </label>
                    <textarea
                        id="contact-message"
                        className={FooterStyles.form__input}
                        required={true}
                        autoComplete="off"
                        spellCheck="true"
                        {...register("message")}
                    />
                    <div className={FooterStyles.form__inputLine}></div>
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
