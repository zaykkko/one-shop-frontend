import {Navigate} from "react-location";
import type {Route} from "react-location";

import Home from "../pages/home";
import Login from "../pages/login";

const routes: Route[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        element: <Navigate to="/" />,
    },
];

export {routes};
