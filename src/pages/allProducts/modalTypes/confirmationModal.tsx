import ConfirmModalStyles from "./confirmationModal.scss";
import SharedStyles from "@shared/styles.scss";

import {useCallback} from "react";
import classnames from "classnames";

import {useAluraGeekContext} from "@context/aluraGeek";
import {removeItemDispatcher} from "@reducer/aluraGeekReducer";
import {useModal} from "@shared/modal";

import type {ProductData} from "@reducer/aluraGeekReducer";

const ConfirmationModal = ({product}: {
    product: ProductData;
}) => {
    const {dispatch} = useAluraGeekContext();
    const {onModalClose} = useModal();

    const onDeleteConfirmed = useCallback(() => {
        dispatch(removeItemDispatcher(product.id));
        onModalClose();
    }, [product]);

    return (
        <div className={ConfirmModalStyles.confirmModal}>
            <div className={ConfirmModalStyles.confirmModal__warn}>
                <h2>¿Estás seguro de que quieres eliminar este producto?</h2>
                <div className={ConfirmModalStyles.confirmModal__preview}>
                    <img src={product.img_url} />
                    <div
                        className={ConfirmModalStyles.confirmModal__productInfo}
                    >
                        <h3>{product.title}</h3>
                        <h3>${product.price}</h3>
                    </div>
                </div>
            </div>
            <div className={ConfirmModalStyles.confirmModal__buttons}>
                <button type="button" onClick={onModalClose}>
                    Cancelar
                </button>
                <button
                    type="button"
                    className={classnames(
                        SharedStyles.btn_basic,
                        SharedStyles.btn__warn
                    )}
                    onClick={onDeleteConfirmed}
                >
                    Borrar producto
                </button>
            </div>
        </div>
    );
};

export default ConfirmationModal;
