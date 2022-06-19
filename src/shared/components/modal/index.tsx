import ModalStyles from "./modal.scss";
import SharedStyles from "@shared/styles.scss";

import {useRef, useEffect, createContext, useContext} from "react";
import classnames from "classnames";

import {Portal} from "@util/portal";

export type ModalProps = {
    onModalClose(): void;
};

type ModalContext = ModalProps & {
    modalRef: React.RefObject<HTMLDivElement>;
};

const modalContext = createContext<ModalContext>({} as ModalContext);

export function useModal() {
    const context = useContext(modalContext);

    if (context === undefined) {
        throw new Error("useModal must be used within a ModalContext");
    }

    return context;
}

export const Modal = ({
    children,
    onModalClose,
}: React.PropsWithChildren<ModalProps>) => {
    const modalContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            if (
                modalContentRef.current &&
                !modalContentRef.current.contains(event.target as HTMLElement)
            ) {
                onModalClose();
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [modalContentRef, onModalClose]);

    useEffect(() => {
        const elementRoot = document.getElementById(
            process.env.REACT_ROOT_ELEMENT_ID as string
        );

        elementRoot?.setAttribute("aria-hidden", "true");

        return () => {
            elementRoot?.removeAttribute("aria-hidden");
        };
    }, []);

    return (
        <Portal className={ModalStyles.modal}>
            <modalContext.Provider
                value={{onModalClose, modalRef: modalContentRef}}
            >
                <div
                    ref={modalContentRef}
                    className={classnames(
                        SharedStyles.container,
                        ModalStyles.modal__container
                    )}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className={ModalStyles.modal__body}>{children}</div>
                </div>
            </modalContext.Provider>
        </Portal>
    );
};
