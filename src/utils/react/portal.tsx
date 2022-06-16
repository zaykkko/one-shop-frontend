import {useRef, useEffect} from "react";
import {createPortal} from "react-dom";

interface IPortalProps {
    className: string;
}

const Portal: React.FC<React.PropsWithChildren<IPortalProps>> = ({
    children,
    className,
}) => {
    const {current: container} = useRef<HTMLDivElement>(
        document.getElementById("modal-container") as HTMLDivElement
    );
    const {current: child} = useRef<HTMLDivElement>(
        document.createElement("div")
    );

    useEffect(() => {
        child.classList.add(className);

        container.appendChild(child);

        return () => {
            container.removeChild(child);
        };
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return createPortal(children, child);
};

export {Portal};
