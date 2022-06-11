import HeaderStyles from "./header.scss";
import SharedStyles from "../shared.scss";

import classnames from "classnames";
import {Link} from "react-location";

const Header = () => (
    <header className={classnames(HeaderStyles.header, SharedStyles.container)}>
        <Link title="Alura Geek" to="/">
            <i className={HeaderStyles.header__logo}>
                <svg focusable="false" viewBox="0 0 176 51">
                    <use href="#logo"></use>
                </svg>
            </i>
        </Link>
        <button className={HeaderStyles.header__login_btn} type="button">
            Login
        </button>
        <button className={HeaderStyles.header__search_btn} type="button">
            <i className={HeaderStyles["icon-search"]}>
                <svg focusable="false" viewBox="0 0 22 22" fill="currentColor">
                    <use href="#ms-glass"></use>
                </svg>
            </i>
        </button>
    </header>
);

export default Header;
