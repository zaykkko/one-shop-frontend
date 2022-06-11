import HomeStyles from "./home.scss";
import SharedStyles from "@shared/shared.scss";

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
        name: yup.string().required(),
        message: yup.string().required(),
    })
    .required();

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
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
            <fieldset className={HomeStyles.form__fieldset}>
                <legend>Hable con nosotros</legend>
                <div className={HomeStyles.form__inputgroup}>
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        {...register("name", {
                            required: true,
                            maxLength: 20,
                            pattern: /^[A-Za-z\u00f1\u00d1\u00E0-\u00FC]+$/i,
                        })}
                    />
                </div>
                <div className={HomeStyles.form__inputgroup}>
                    <label htmlFor="message">Escribe tu mensaje</label>
                    <textarea {...register("message", {required: true})} />
                </div>
            </fieldset>
            <button className={HomeStyles.form__submit} type="submit">
                Enviar mensaje
            </button>
        </form>
    );
};

const Navigation = () => (
    <section className={classnames(HomeStyles.contact, SharedStyles.container)}>
        <div className={HomeStyles.contact__links}>
            <Link title="Alura Geek" to="/">
                <i className={HomeStyles.contact__logo}>
                    <svg focusable="false" viewBox="0 0 176 51">
                        <use href="#logo"></use>
                    </svg>
                </i>
            </Link>
            <nav className={HomeStyles.contact__nav}>
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
        <div className={HomeStyles.contact__form}>
            <ContactForm />
        </div>
    </section>
);

export default Navigation;
