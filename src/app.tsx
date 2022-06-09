import "./app.scss";

import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {Router, Outlet} from "react-location";

import Sprites from "./sprites";
import {routes, location} from "./router";
import Header from "./shared/header";

const root = createRoot(
    document.getElementById(
        process.env.REACT_ROOT_ELEMENT_ID as string
    ) as HTMLElement
);

root.render(
    <StrictMode>
        <Sprites />
        <Router routes={routes} location={location}>
            <Header />
            <Outlet />
        </Router>
    </StrictMode>
);
