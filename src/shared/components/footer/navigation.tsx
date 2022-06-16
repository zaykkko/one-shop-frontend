import FooterStyles from "./footer.scss";
import SharedStyles from "@shared/styles.scss";

import classnames from "classnames";
import {Link} from "react-location";

import ContactForm from "./contactForm";

import logo from "@sprite/logo.svg?url";

const Navigation = () => (
    <section
        className={classnames(FooterStyles.contact, SharedStyles.container)}
    >
        <div className={FooterStyles.contact__links}>
            <Link title="Alura Geek" to="/">
                <img src={logo} className={SharedStyles.logo} />
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
