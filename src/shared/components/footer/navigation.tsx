import FooterStyles from "./footer.scss";
import SharedStyles from "@shared/styles/shared.scss";

import {useCallback} from "react";
import classnames from "classnames";
import {Link} from "react-location";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import type {SchemaOf} from "yup";

interface IContactFormInputs {
    name: string;
    message: string;
}

const contactFormSchema: SchemaOf<IContactFormInputs> = yup
    .object({
        name: yup
            .string()
            .max(20)
            .matches(/^[A-Za-z\u00f1\u00d1\u00E0-\u00FC]+$/i)
            .required(),
        message: yup.string().required(),
    })
    .required();

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        //formState: {errors},
    } = useForm<IContactFormInputs>({
        resolver: yupResolver(contactFormSchema),
        defaultValues: {
            name: "",
            message: "",
        },
    });
    const onSubmit = useCallback(
        (data: IContactFormInputs) => console.log(data),
        []
    );

    return (
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={FooterStyles.form__fieldset}>
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

const Navigation = () => (
    <section
        className={classnames(FooterStyles.contact, SharedStyles.container)}
    >
        <div className={FooterStyles.contact__links}>
            <Link title="Alura Geek" to="/">
                <i className={FooterStyles.contact__logo}>
                    <svg focusable="false" viewBox="0 0 176 51">
                        <use href="#logo"></use>
                    </svg>
                </i>
            </Link>
            <nav className={FooterStyles.contact__nav}>
                <ul>
                    <li>
                        <Link to="#">Quiénes somos</Link>
                    </li>
                    <li>
                        <Link to="#">Política de privacidad</Link>
                    </li>
                    <li>
                        <Link to="#">Programa de fidelidad</Link>
                    </li>
                    <li>
                        <Link to="#">Nuestras tiendas</Link>
                    </li>
                    <li>
                        <Link to="#">Quiero ser financiado</Link>
                    </li>
                    <li>
                        <Link to="#">Anuncie aquí</Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div className={FooterStyles.contact__form}>
            <ContactForm />
        </div>
    </section>
);

export default Navigation;
