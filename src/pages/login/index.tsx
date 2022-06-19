import LoginStyles from "./login.scss";
import SharedStyles from "@shared/styles.scss";

import classnames from "classnames";
import {useCallback} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-location";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import {Title} from "@util/title";
import {useAuth} from "@context/auth";

import type {SchemaOf} from "yup";

interface ILoginFormInputs {
    email: string;
    password: string;
}

const loginFormSchema: SchemaOf<ILoginFormInputs> = yup.object().shape({
    email: yup
        .string()
        .email("Por favor, introduce un email válido.")
        .required("Por favor, completa este campo."),
    password: yup
        .string()
        .max(16, "Por favor, escribe una contraseña válida.")
        .required("Por favor, completa este campo."),
});

const LoginForm = () => {
    const {setIsLoggedIn} = useAuth();
    const {
        handleSubmit,
        register,
        formState: {errors},
        setError,
    } = useForm<ILoginFormInputs>({
        resolver: yupResolver(loginFormSchema),
    });
    const navigate = useNavigate();
    const onSubmit = useCallback(({email, password}: ILoginFormInputs) => {
        //No existe backend y la idea del proyecto es sólo probar React, así que un login demasiado simple viene perfecto.
        if (
            email === process.env.LOGIN_EMAIL &&
            password === process.env.LOGIN_PASSWORD
        ) {
            setIsLoggedIn(true);
            navigate({to: "/"});
        } else {
            setError("email", {
                message:
                    "Esta combinación de usuario y contraseña no coincide.",
            });
        }
    }, []);

    return (
        <form
            className={LoginStyles.login__form}
            onSubmit={handleSubmit(onSubmit)}
        >
            <fieldset>
                <legend>Inicio de sesión</legend>
                <label
                    className={SharedStyles["visually-hidden"]}
                    htmlFor="login-email"
                >
                    Escriba su email
                </label>
                <input
                    className={classnames(LoginStyles.login__input, {
                        [LoginStyles["login__input-error"]]: errors.email,
                    })}
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                />
                {errors.email && (
                    <span role="alert">{errors.email.message}</span>
                )}
                <label
                    className={SharedStyles["visually-hidden"]}
                    htmlFor="login-password"
                >
                    Escriba su contraseña
                </label>
                <input
                    className={classnames(LoginStyles.login__input, {
                        [LoginStyles["login__input-error"]]: errors.password,
                    })}
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Contraseña"
                    aria-invalid={!!errors.password}
                    {...register("password")}
                />
                {errors.password && (
                    <span role="alert">{errors.password.message}</span>
                )}
            </fieldset>
            <button className={SharedStyles.btn_basic} type="submit">
                Iniciar sesión
            </button>
        </form>
    );
};

const Login: React.FC = () => (
    <section className={classnames(LoginStyles.login, SharedStyles.container)}>
        <Title>Inicio de sesión | AluraGeek</Title>
        <LoginForm />
    </section>
);

export default Login;
