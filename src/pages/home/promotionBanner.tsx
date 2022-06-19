import HomeStyles from "./home.scss";
import SharedStyles from "@shared/styles.scss";

import classnames from "classnames";
import {Link} from "react-location";

const PromotionBanner = () => (
    <section className={HomeStyles.promotion}>
        <div
            className={HomeStyles.promotion__image}
            style={{
                backgroundImage: `url("${process.env.BASE_URL}/promotionBanner.jpg")`,
            }}
        ></div>
        <div className={HomeStyles.promotion__info}>
            <div className={HomeStyles.promotion__title}>
                <h1>Febrero Promocional</h1>
            </div>
            <div className={HomeStyles.promotion__description}>
                <h2>Productos seleccionados con 33% de descuento</h2>
            </div>
            <Link
                className={classnames(
                    HomeStyles.promotion__button,
                    SharedStyles.btn_basic
                )}
                to="./sale/consoles"
            >
                Ver consolas
            </Link>
        </div>
    </section>
);

export default PromotionBanner;
