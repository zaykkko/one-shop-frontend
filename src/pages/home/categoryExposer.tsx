import HomeStyles from "./home.scss";
import SharedStyles from "@shared/shared.scss";

import classnames from "classnames";
import {Link} from "react-location";

type ProductData = {
    id: number;
    preview_id: string;
    title: string;
    price: string;
};

type ProductCategory = {
    categoryName: string;
    categoryGroupId: string;
    products: ProductData[];
};

const ProductItem: React.FC<{productData: ProductData}> = ({
    productData: {id, preview_id, title, price},
}) => (
    <li className={HomeStyles["product"]}>
        <div className={HomeStyles["product-header"]}>
            <img src={`./assets/img/unsplash_${preview_id}.png`} />
        </div>
        <div className={HomeStyles["product-body"]}>
            <div className={HomeStyles["product-title"]}>
                <span>{title}</span>
            </div>
            <div className={HomeStyles["product-price"]}>
                <span>${price}</span>
            </div>
            <Link
                className={HomeStyles["product-hyperlink"]}
                to={`./product/${id}`}
            >
                Ver producto
            </Link>
        </div>
    </li>
);

const CategoryExposer: React.FC<{data: ProductCategory}> = ({
    data: {categoryName, categoryGroupId, products},
}) => {
    return (
        <section className={HomeStyles["product-cat"]}>
            <div className={HomeStyles["product-cat-header"]}>
                <h2>{categoryName}</h2>
                <Link to={`./sales/${categoryGroupId}`}>
                    Ver todo
                    <span
                        className={classnames(
                            SharedStyles.icon,
                            HomeStyles["arrow-icon"]
                        )}
                    >
                        <svg focusable="false" viewBox="0 0 15 15">
                            <use href="#right-arrow"></use>
                        </svg>
                    </span>
                </Link>
            </div>
            <div className={HomeStyles["product-cat-body"]}>
                <ul className={HomeStyles["product-list"]}>
                    {products.map((productData) => (
                        <ProductItem
                            key={productData.id}
                            productData={productData}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export {CategoryExposer, ProductItem};
