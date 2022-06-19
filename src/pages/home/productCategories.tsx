import HomeStyles from "./home.scss";
import SharedStyles from "@shared/styles.scss";

import classnames from "classnames";
import {Link} from "react-location";

import {useAluraGeek, useAluraGeekCategoryProducts} from "@context/aluraGeek";
import {ProductCard} from "@shared/productCard";

import RightArrow from "@sprite/r-arrow.svg";

import type {ProductCategory} from "@reducer/aluraGeekReducer";

const Category = ({
    data: {id, categoryName, categoryGroupId},
}: React.PropsWithChildren<{data: ProductCategory}>) => {
    const products = useAluraGeekCategoryProducts(id);

    return (
        <section className={HomeStyles.products__category}>
            <div className={HomeStyles.products__header}>
                <h1>{categoryName}</h1>
                <Link to={`./sale/${categoryGroupId}`}>
                    Ver todo
                    <RightArrow
                        className={classnames(
                            SharedStyles.icon,
                            HomeStyles.icon__arrowRight
                        )}
                    />
                </Link>
            </div>
            <div className={HomeStyles.products__body}>
                <ul
                    className={classnames(
                        SharedStyles.responsiveGrid,
                        SharedStyles["responsiveGrid-limited"]
                    )}
                >
                    {products.map((productData) => (
                        <ProductCard
                            key={productData.id}
                            productData={productData}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
};

const CategoryList = () => {
    const {categories} = useAluraGeek();

    return (
        <section
            className={classnames(HomeStyles.products, SharedStyles.container)}
        >
            {categories &&
                categories.map((categoryData) => (
                    <Category key={categoryData.id} data={categoryData} />
                ))}
        </section>
    );
};

export {CategoryList, Category};
