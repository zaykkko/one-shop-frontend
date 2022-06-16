import {Children, useEffect} from "react";

const useTitle = (title: string) => {
    useEffect(() => {
        const prevTitle = document.title;

        document.title = title;

        return () => {
            document.title = prevTitle;
        };
    }, []);
};

const Title = ({children}: {children: React.ReactNode}) => {
    useTitle(getLabelFromChildren(children));

    return null;
};

//https://github.com/facebook/react/issues/9255#issuecomment-452368065
const getLabelFromChildren = (children: React.ReactNode) => {
    let label = "";

    Children.map(children, (child) => {
        if (typeof child === "string") {
            label += child;
        }
    });

    return label;
};

export {useTitle, Title};
