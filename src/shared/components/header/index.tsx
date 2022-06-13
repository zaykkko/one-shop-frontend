import HeaderStyles from "./header.scss";
import SharedStyles from "@shared/styles/shared.scss";

import classnames from "classnames";
import {Link} from "react-location";
import {useCallback, useState, useRef, useEffect} from "react";
import {useForm} from "react-hook-form";

interface ISearchForm {
    query: string;
}

const SearchForm = () => {
    const {
        register,
        handleSubmit,
        //formState: {errors},
    } = useForm<ISearchForm>({
        defaultValues: {
            query: "",
        },
    });
    const onSubmit = useCallback((data: ISearchForm) => console.log(data), []);

    return (
        <form
            className={HeaderStyles.header__searchForm}
            method="GET"
            onSubmit={handleSubmit(onSubmit)}
        >
            <fieldset className={HeaderStyles.header__fieldset}>
                <label
                    className={SharedStyles["visually-hidden"]}
                    htmlFor="search-query"
                >
                    ¿Qué deseas buscar?
                </label>
                <input
                    id="search-query"
                    type="text"
                    placeholder="¿Qué deseas buscar?"
                    autoComplete="off"
                    spellCheck="false"
                    required={true}
                    {...register("query")}
                />
            </fieldset>
            <button type="submit">
                <i className={HeaderStyles.icon__search}>
                    <svg
                        focusable="false"
                        viewBox="0 0 22 22"
                        fill="currentColor"
                    >
                        <use href="#ms-glass"></use>
                    </svg>
                </i>
            </button>
        </form>
    );
};

const Header = () => {
    const [isFormVisible, setFormVisible] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    const toggleFormVisibility = useCallback(() => {
        setFormVisible(!isFormVisible);
    }, [isFormVisible]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            event.stopPropagation();

            if (
                headerRef.current &&
                !headerRef.current.contains(event.target as HTMLElement)
            ) {
                toggleFormVisibility();
            }
        }

        if (isFormVisible)
            document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isFormVisible]);

    return (
        <header
            ref={headerRef}
            className={classnames(HeaderStyles.header, SharedStyles.container, {
                [HeaderStyles["header-searching"]]: isFormVisible,
            })}
        >
            <Link title="Alura Geek" to="/">
                <i className={HeaderStyles.header__logo}>
                    <svg focusable="false" viewBox="0 0 176 51">
                        <use href="#logo"></use>
                    </svg>
                </i>
            </Link>
            <SearchForm />
            <Link className={HeaderStyles.header__loginBtn} to="/login">
                Iniciar sesión
            </Link>
            <button
                onClick={toggleFormVisibility}
                className={HeaderStyles.header__searchBtn}
                type="button"
            >
                <i className={HeaderStyles.icon__search}>
                    <svg
                        focusable="false"
                        viewBox="0 0 22 22"
                        fill="currentColor"
                    >
                        <use href="#ms-glass"></use>
                    </svg>
                </i>
                <i className={HeaderStyles.icon__cross}>
                    <svg
                        focusable="false"
                        viewBox="0 0 22 22"
                        fill="currentColor"
                    >
                        <use href="#cross"></use>
                    </svg>
                </i>
            </button>
        </header>
    );
};

export default Header;
