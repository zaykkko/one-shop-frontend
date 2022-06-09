import HeaderStyles from "./header.scss";
import SharedStyles from "../shared.scss";

import classnames from "classnames";
import {Link} from "react-location";

const Header = () => (
    <header id={HeaderStyles["top-header"]}>
        <div className={HeaderStyles.container}>
            <Link title="Alura Geek" to="/">
                <span
                    className={classnames(SharedStyles.icon, HeaderStyles.logo)}
                >
                    <svg focusable="false" viewBox="0 0 176 51">
                        <use href="#logo"></use>
                    </svg>
                </span>
            </Link>
            <button className={HeaderStyles["login-btn"]} type="button">
                Login
            </button>
            <button className={HeaderStyles["search-btn"]} type="button">
                <span
                    className={classnames(
                        SharedStyles.icon,
                        HeaderStyles["ms-icon"]
                    )}
                >
                    <svg
                        focusable="false"
                        viewBox="0 0 22 22"
                        fill="currentColor"
                    >
                        <use href="#ms-glass"></use>
                    </svg>
                </span>
            </button>
        </div>
    </header>
);

export default Header;
