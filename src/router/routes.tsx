import {useLayoutEffect} from "react";
import {useRouter, Router, Navigate} from "react-location";
import type {Route} from "react-location";

import {useAuth} from "@context/auth";
import {location} from "./history";
import Home from "../pages/home";
import Login from "../pages/login";
import Sale from "../pages/sale";
import Product from "../pages/product";
import AllProducts from "../pages/allProducts";
import NewProduct from "../pages/newProduct";

const getRoutes = (isLoggedIn: boolean): Route[] => [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: isLoggedIn ? <Navigate to="/" /> : <Login />,
    },
    {
        path: "/sale/:categoryGroupId",
        element: <Sale />,
    },
    {
        path: "/product",
        children: [
            {
                path: "all",
                element: isLoggedIn ? <AllProducts /> : <Navigate to="/" />,
            },
            {
                path: "new",
                element: isLoggedIn ? <NewProduct /> : <Navigate to="/" />,
            },
            {
                path: ":productId",
                element: <Product />,
            },
            {
                element: <Navigate to="/" />,
            },
        ],
    },
    {
        element: <Navigate to="/" />,
    },
];

const ScrollUp = ({children}: {children: React.ReactNode}) => {
    const {
        state: {location},
    } = useRouter();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return <>{children}</>;
};

const RouterProvider = ({children}: {children: React.ReactNode}) => {
    const {isLoggedIn} = useAuth();

    return (
        <Router routes={getRoutes(isLoggedIn)} location={location}>
            <ScrollUp>{children}</ScrollUp>
        </Router>
    );
};

export {RouterProvider};
