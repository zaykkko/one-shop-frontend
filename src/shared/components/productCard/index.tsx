import CardStyles from "./productCard.scss";

import {Link} from "react-location";
import {LazyLoadImage} from "react-lazy-load-image-component";

import trashBinIcon from "@sprite/trash-bin.svg?sprite";
import penIcon from "@sprite/edit-pen.svg?sprite";

import type {ProductData} from "@reducer/aluraGeekReducer";
import React from "react";

export interface IActionBtnCallbacks {
    onDeleteButtonClick?: (productId: number) => void;
    onEditButtonClick?: (productId: number) => void;
}

export interface IProductCardProps extends IActionBtnCallbacks {
    productData: ProductData;
    editable?: boolean;
}

const ProductCard = ({
    productData: {id, img_url, title, price},
    editable = false,
    onDeleteButtonClick,
    onEditButtonClick,
}: React.PropsWithChildren<IProductCardProps>) => (
    <li className={CardStyles.productCard}>
        <div className={CardStyles.productCard__header}>
            {editable && onDeleteButtonClick && onEditButtonClick && (
                <div className={CardStyles.productCard__actionBtns}>
                    <button
                        type="button"
                        onClick={() => onDeleteButtonClick(id)}
                    >
                        <svg
                            focusable="false"
                            viewBox={trashBinIcon.viewBox}
                            fill="currentColor"
                            fillRule="evenodd"
                        >
                            <use href={`#${trashBinIcon.id}`} />
                        </svg>
                    </button>
                    <button type="button" onClick={() => onEditButtonClick(id)}>
                        <svg
                            focusable="false"
                            viewBox={penIcon.viewBox}
                            fill="currentColor"
                            fillRule="evenodd"
                        >
                            <use href={`#${penIcon.id}`} />
                        </svg>
                    </button>
                </div>
            )}
            <LazyLoadImage src={img_url} />
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
