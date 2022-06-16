import FooterStyles from "./footer.scss";
import SharedStyles from "@shared/styles.scss";

import classnames from "classnames";

import Navigation from "./navigation";

const Footer = () => (
    <footer className={FooterStyles.footer}>
        <Navigation />
        <section
            className={classnames(FooterStyles.author, SharedStyles.container)}
        >
            <h1>
                Desarrollado por{" "}
                <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://github.com/zaykkko"
                >
                    Zaykkko
                </a>
                .
            </h1>
            <h2>2022</h2>
        </section>
    </footer>
);

export default Footer;
