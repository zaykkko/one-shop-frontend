import SaleStyles from "./sale.scss";
import SharedStyles from "@shared/styles.scss";

import {useMatch, Navigate} from "react-location";
import type {MakeGenerics} from "react-location";

import {Title} from "@util/title";
import {
    useAluraGeekCategoryProducts,
    useAluraGeekCategory,
} from "@context/aluraGeek";
import {ProductCard} from "@shared/component/productCard";

type CategoryParamGeneric = MakeGenerics<{
    Params: {
        categoryGroupId: string;
    };
}>;

const Sale = () => {
    const {
        params: {categoryGroupId},
    } = useMatch<CategoryParamGeneric>();
    const categoryData = useAluraGeekCategory(categoryGroupId);

    if (!categoryData) {
        return <Navigate to="/" />;
    }

    const categoryProducts = useAluraGeekCategoryProducts(categoryData.id);

    return (
        <section className={SharedStyles.container}>
            <Title>{categoryData.categoryName} | AluraGeek</Title>
            <h1 className={SaleStyles.sale_title}>Productos seleccionados</h1>
            <ul className={SharedStyles.responsiveGrid}>
                {categoryProducts.map((productData) => (
                    <ProductCard
                        key={productData.id}
                        productData={productData}
                        lazy={false}
                    />
                ))}
            </ul>
        </section>
    );
};

export default Sale;
