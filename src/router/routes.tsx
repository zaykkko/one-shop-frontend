import {Router, Navigate} from "react-location";
import type {Route} from "react-location";

import {useAuth} from "@context/auth";
import {location} from "./history";
import Home from "../pages/home";
import Login from "../pages/login";
import AllProducts from "../pages/allProducts";

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
        path: "/product",
        children: [
            {
                path: "/all",
                element: isLoggedIn ? <AllProducts /> : <Navigate to="/" />,
            },
            {
                path: ":productId",
            },
        ],
    },
    {
        element: <Navigate to="/" />,
    },
];

const RouterProvider = ({children}: {children: React.ReactNode}) => {
    const {isLoggedIn} = useAuth();

    return (
        <Router routes={getRoutes(isLoggedIn)} location={location}>
            {children}
        </Router>
    );
};

export {RouterProvider};
