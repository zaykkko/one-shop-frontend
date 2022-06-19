import AllProductsStyles from "./allProducts.scss";
import SharedStyles from "@shared/styles.scss";

import {useCallback, useState, memo} from "react";
import {useNavigate} from "react-location";
import {Link} from "react-location";
import classnames from "classnames";

import {Title} from "@util/title";
import {useAluraGeek} from "@context/aluraGeek";
import {useAuth} from "@context/auth";
import {Modal} from "@shared/component/modal";
import {ProductCard} from "@shared/component/productCard";
import ModalTypeRenderer from "./modalTypeRender";

import type {ActionBtnCallbacksProps} from "@shared/component/productCard";
import type {ProductData} from "@reducer/aluraGeekReducer";

type ProductListProps = ActionBtnCallbacksProps & {
    products: ProductData[];
};

const productList: React.FC<ProductListProps> = ({
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
        id?: ProductData["id"];
    }>({});

    const onDeleteButtonClick = useCallback(
        (productId: ProductData["id"]) => {
            setModalInfo({
                type: "delete",
                id: productId,
            });
        },
        [products]
    );

    const onEditButtonClick = useCallback(
        (productId: ProductData["id"]) => {
            setModalInfo({
                type: "edit",
                id: productId,
            });
        },
        [products]
    );

    const onModalClose = useCallback(() => {
        setModalInfo({});
    }, []);

    return (
        <>
            <ProductList
                onDeleteButtonClick={onDeleteButtonClick}
                onEditButtonClick={onEditButtonClick}
                products={products}
            />
            {modalInfo.id && modalInfo.type && (
                <Modal onModalClose={onModalClose}>
                    <ModalTypeRenderer
                        modalType={modalInfo.type}
                        productId={modalInfo.id}
                    />
                </Modal>
            )}
        </>
    );
};

const AllProducts = () => {
    const {setIsLoggedIn} = useAuth();
    const navigate = useNavigate();

    return (
        <section
            className={classnames(
                SharedStyles.container,
                AllProductsStyles.allProducts
            )}
        >
            <Title>Todos los productos | AluraGeek</Title>
            <div className={AllProductsStyles.allProducts__header}>
                <h1>Todos los productos</h1>
                <div className={AllProductsStyles.allProducts__btnsArea}>
                    <Link to="/product/new" className={SharedStyles.btn_basic}>
                        Agregar producto
                    </Link>
                    <button
                        type="button"
                        className={SharedStyles.btn_basic}
                        onClick={() => {
                            setIsLoggedIn(false);
                            navigate({to: "/"});
                        }}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
            <ul className={SharedStyles.responsiveGrid}>
                <ProductListWrapper />
            </ul>
        </section>
    );
};

export default AllProducts;
