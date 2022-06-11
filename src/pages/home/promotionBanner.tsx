import HomeStyles from "./home.scss";

import {Link} from "react-location";

const PromotionBanner = () => (
    <section className={HomeStyles.promotion}>
        <div className={HomeStyles.promotion__image}>
            <img draggable="false" src="./assets/img/unsplash_promotion.jpg" />
        </div>
        <div className={HomeStyles.promotion__info}>
            <div className={HomeStyles.promotion__title}>
                <h1>Febrero Promocional</h1>
            </div>
            <div className={HomeStyles.promotion__description}>
                <h2>Productos seleccionados con 33% de descuento</h2>
            </div>
            <Link
                className={HomeStyles.promotion__button}
                to="./sales/consoles"
            >
                Ver consolas
            </Link>
        </div>
    </section>
);

export default PromotionBanner;
