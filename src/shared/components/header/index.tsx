import HeaderStyles from "./header.scss";
import SharedStyles from "@shared/styles.scss";

import classnames from "classnames";
import {Link} from "react-location";
import {useCallback, useState, useRef, useEffect} from "react";
import logo from "@sprite/logo.svg?url";
import MagnifyingGlass from "@sprite/ms-glass.svg";
import CloseCross from "@sprite/close.svg";

import {useAuth} from "@context/auth";
import SearchForm from "./searchForm";

const Header = () => {
    const {isLoggedIn} = useAuth();
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
                <img
                    src={logo}
                    className={classnames(
                        SharedStyles.logo,
                        HeaderStyles.header__logo
                    )}
                />
            </Link>
            <SearchForm />
            {!isLoggedIn && (
                <Link className={HeaderStyles.header__loginBtn} to="/login">
                    Iniciar sesión
                </Link>
            )}
            {isLoggedIn && (
                <Link
                    className={HeaderStyles.header__loginBtn}
                    to="/product/all"
                >
                    Ver productos
                </Link>
            )}
            <button
                onClick={toggleFormVisibility}
                className={HeaderStyles.header__searchBtn}
                type="button"
            >
                <MagnifyingGlass
                    className={classnames(
                        SharedStyles.icon,
                        HeaderStyles.icon__search
                    )}
                />
                <CloseCross
                    className={classnames(
                        SharedStyles.icon,
                        HeaderStyles.icon__cross
                    )}
                />
            </button>
        </header>
    );
};

export default Header;
