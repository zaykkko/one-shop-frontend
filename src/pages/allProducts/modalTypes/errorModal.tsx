import ErrorModalStyles from "./errorModal.scss";
import SharedStyles from "@shared/styles.scss";

import {useModal} from "@shared/component/modal";

const ErrorModal = () => {
    const {onModalClose} = useModal();

    return (
        <div className={ErrorModalStyles.errorModal}>
            <h2>¡Ocurrió un error!</h2>
            <h3>No pudimos encontrar ese producto...</h3>
            <button
                type="button"
                className={SharedStyles.btn_basic}
                onClick={onModalClose}
            >
                Aceptar
            </button>
        </div>
    );
};

export default ErrorModal;
