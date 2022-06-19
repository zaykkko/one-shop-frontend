import CardStyles from "./productCard.scss";
import SharedStyles from "@shared/styles.scss";

import {Link} from "react-location";
import {LazyLoadImage} from "react-lazy-load-image-component";

import TrashBinIcon from "@sprite/trash-bin.svg";
import PenIcon from "@sprite/edit-pen.svg";

import type {ProductData} from "@reducer/aluraGeekReducer";

export type ActionBtnCallbacksProps = {
    onDeleteButtonClick(productId: ProductData["id"]): void;
    onEditButtonClick(productId: ProductData["id"]): void;
};

export type ProductCardProps = Partial<ActionBtnCallbacksProps> & {
    productData: ProductData;
    editable?: boolean;
    lazy?: boolean;
};

const ProductCard = ({
    productData: {id, img_url, title, price},
    editable = false,
    lazy = true,
    onDeleteButtonClick,
    onEditButtonClick,
}: React.PropsWithChildren<ProductCardProps>) => (
    <li className={CardStyles.productCard}>
        <div className={CardStyles.productCard__header}>
            {editable && onDeleteButtonClick && onEditButtonClick && (
                <div className={CardStyles.productCard__actionBtns}>
                    <button
                        type="button"
                        onClick={() => onDeleteButtonClick(id)}
                    >
                        <TrashBinIcon className={SharedStyles["icon-2"]} />
                    </button>
                    <button type="button" onClick={() => onEditButtonClick(id)}>
                        <PenIcon className={SharedStyles["icon-2"]} />
                    </button>
                </div>
            )}
            {lazy ? (
                <LazyLoadImage src={img_url} alt={title} />
            ) : (
                <img src={img_url} alt={title} />
            )}
        </div>
        <div className={CardStyles.productCard__body}>
            <div className={CardStyles.productCard__title}>
                <h2>{title}</h2>
            </div>
            <div className={CardStyles.productCard__price}>
                <p>${price}</p>
            </div>
            <Link
                className={CardStyles.productCard__anchor}
                to={`/product/${id}`}
            >
                Ver producto
            </Link>
        </div>
    </li>
);

export {ProductCard};
