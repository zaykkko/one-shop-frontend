import HomeStyles from "./home.scss";
import SharedStyles from "@shared/styles/shared.scss";

import classnames from "classnames";
import {Link} from "react-location";
import {LazyLoadImage} from "react-lazy-load-image-component";

import STORE_PRODUCTS_DATA from "../../data/defaultStoreProducts";

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

const ProductItem = ({
    productData: {id, preview_id, title, price},
}: React.PropsWithChildren<{productData: ProductData}>) => (
    <li className={HomeStyles.productCard}>
        <LazyLoadImage src={`./assets/img/unsplash_${preview_id}.png`} />
        <div className={HomeStyles.productCard__body}>
            <div className={HomeStyles.productCard__title}>
                <h2>{title}</h2>
            </div>
            <div className={HomeStyles.productCard__price}>
                <p>${price}</p>
            </div>
            <Link
                className={HomeStyles.productCard__anchor}
                to={`./product/${id}`}
            >
                Ver producto
            </Link>
        </div>
    </li>
);

const Category = ({
    data: {categoryName, categoryGroupId, products},
}: React.PropsWithChildren<{data: ProductCategory}>) => (
    <section className={HomeStyles.products__category}>
        <div className={HomeStyles.products__header}>
            <h1>{categoryName}</h1>
            <Link to={`./sales/${categoryGroupId}`}>
                Ver todo
                <i className={HomeStyles.icon__arrowRight}>
                    <svg focusable="false" viewBox="0 0 15 15">
                        <use href="#right-arrow"></use>
                    </svg>
                </i>
            </Link>
        </div>
        <div className={HomeStyles.products__body}>
            <ul className={HomeStyles.products__listWrapper}>
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

const CategoryList = () => (
    <section
        className={classnames(HomeStyles.products, SharedStyles.container)}
    >
        {STORE_PRODUCTS_DATA.map((categoryData) => (
            <Category key={categoryData.id} data={categoryData} />
        ))}
    </section>
);

export {CategoryList, Category, ProductItem};
