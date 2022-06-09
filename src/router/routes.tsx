import {Navigate} from "react-location";
import type {Route} from "react-location";

import Home from "../pages/home";

const routes: Route[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        element: <Navigate to="/" />,
    },
];

export {routes};
