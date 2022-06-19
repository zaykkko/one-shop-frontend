import {useAluraGeekProduct} from "@context/aluraGeek";
import type {ProductData} from "@reducer/aluraGeekReducer";

import ConfirmationModal from "./modalTypes/confirmationModal";
import EditableModal from "./modalTypes/editableModal";
import ErrorModal from "./modalTypes/errorModal";

type ModalTypeRenderProps = {
    productId: ProductData["id"];
    modalType: "delete" | "edit";
};

const ModalTypeRender = ({productId, modalType}: ModalTypeRenderProps) => {
    const productData = useAluraGeekProduct(productId);

    if (productData) {
        if (modalType === "edit") {
            return <EditableModal product={productData} />;
        }

        return <ConfirmationModal product={productData} />;
    }

    return <ErrorModal />;
};

export default ModalTypeRender;
