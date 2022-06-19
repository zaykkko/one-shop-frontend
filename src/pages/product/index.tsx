import ProductStyles from "./product.scss";
import SharedStyles from "@shared/styles.scss";

import classnames from "classnames";
import {useMatch, Navigate} from "react-location";
import type {MakeGenerics} from "react-location";

import {Title} from "@util/title";
import {
    useAluraGeekProduct,
    useAluraGeekCategoryProducts,
} from "@context/aluraGeek";
import {ProductCard} from "@shared/component/productCard";

type ProductParamGeneric = MakeGenerics<{
    Params: {
        productId: string;
    };
}>;

const Product = () => {
    const {
        params: {productId},
    } = useMatch<ProductParamGeneric>();
    const productData = useAluraGeekProduct(productId);

    if (!productData) {
        return <Navigate to="/" />;
    }

    const suggestions = useAluraGeekCategoryProducts(productData.categoryId);

    return (
        <section
            className={classnames(
                SharedStyles.container,
                ProductStyles.product
            )}
        >
            <Title>{productData.title} | AluraGeek</Title>
            <div className={ProductStyles.product__view}>
                <img
                    src={productData.img_url}
                    alt={productData.title}
                    aria-describedby="product-description"
                />
                <div className={ProductStyles.product__info}>
                    <h2>{productData.title}</h2>
                    <p>${productData.price}</p>
                    <p
                        id="product-description"
                        className={ProductStyles.product__description}
                    >
                        {productData.description}
                    </p>
                </div>
            </div>
            <div className={ProductStyles.product__suggestions}>
                <h2>Productos similares</h2>
                <ul
                    className={classnames(
                        SharedStyles.responsiveGrid,
                        SharedStyles["responsiveGrid-limited"]
                    )}
                >
                    {suggestions
                        .filter((product) => product.id !== productId)
                        .map((product) => (
                            <ProductCard
                                key={product.id}
                                productData={product}
                                lazy={false}
                            />
                        ))}
                </ul>
            </div>
        </section>
    );
};

export default Product;
