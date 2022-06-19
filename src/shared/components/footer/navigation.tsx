import FooterStyles from "./footer.scss";
import SharedStyles from "@shared/styles.scss";

import classnames from "classnames";
import {Link} from "react-location";

import {useTheme} from "@context/theme";
import ContactForm from "./contactForm";

import logo from "@sprite/logo.svg?url";
import Moon from "@sprite/moon.svg";
import Sun from "@sprite/sun.svg";

const Navigation = () => {
    const {theme, setTheme} = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <section
            className={classnames(FooterStyles.contact, SharedStyles.container)}
        >
            <div className={FooterStyles.contact__links}>
                <Link title="Alura Geek" to="/">
                    <img src={logo} className={SharedStyles.logo} />
                </Link>
                <nav className={FooterStyles.contact__nav}>
                    <button type="button" onClick={toggleTheme}>
                        {theme === "dark" ? (
                            <>
                                <Moon className={FooterStyles.icon__theme} />
                                Tema oscuro
                            </>
                        ) : (
                            <>
                                <Sun className={FooterStyles.icon__theme} />
                                Tema claro
                            </>
                        )}
                    </button>
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
};

export default Navigation;
