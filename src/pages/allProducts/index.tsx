import AllProductsStyles from "./allProducts.scss";
import SharedStyles from "@shared/styles.scss";

import {useCallback, useState, memo} from "react";
import {Link} from "react-location";
import classnames from "classnames";

import {Portal} from "@util/portal";
import {Title} from "@util/title";
import {useAluraGeek} from "@context/aluraGeek";
import {ProductCard} from "@shared/productCard";
import type {IActionBtnCallbacks} from "@shared/productCard";
import type {ProductData} from "@reducer/aluraGeekReducer";

interface IProductListProps extends IActionBtnCallbacks {
    products: ProductData[];
}

const productList: React.FC<IProductListProps> = ({
    products,
    onDeleteButtonClick,
    onEditButtonClick,
}) => (
    <>
        {products.map((data) => (
            <ProductCard
                key={data.id}
                productData={data}
                editable={true}
                onDeleteButtonClick={onDeleteButtonClick}
                onEditButtonClick={onEditButtonClick}
            />
        ))}
    </>
);
const ProductList = memo(productList);

const ProductListWrapper = () => {
    const {products} = useAluraGeek();
    const [modalInfo, setModalInfo] = useState<{
        type?: "delete" | "edit";
        id?: number;
    }>({});

    const onDeleteButtonClick = useCallback(
        (productId: number) => {
            setModalInfo({
                type: "delete",
                id: productId,
            });
        },
        [products]
    );

    const onEditButtonClick = useCallback(
        (productId: number) => {
            setModalInfo({
                type: "edit",
                id: productId,
            });
        },
        [products]
    );

    return (
        <>
            <ProductList
                onDeleteButtonClick={onDeleteButtonClick}
                onEditButtonClick={onEditButtonClick}
                products={products}
            />
            {modalInfo.id && (
                <Portal className={"modalContainer"}>
                    <div>{modalInfo.id}</div>
                </Portal>
            )}
        </>
    );
};

const AllProducts = () => (
    <section
        className={classnames(
            SharedStyles.container,
            AllProductsStyles.allProducts
        )}
    >
        <Title>Todos los productos | AluraGeek</Title>
        <div className={AllProductsStyles.allProducts__header}>
            <h1>Todos los productos</h1>
            <Link to="/product/new" className={SharedStyles.btn_basic}>
                Agregar producto
            </Link>
        </div>
        <ul className={SharedStyles.responsiveGrid}>
            <ProductListWrapper />
        </ul>
    </section>
);

export default AllProducts;
