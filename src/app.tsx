import "./app.scss";

import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {Outlet} from "react-location";

import {RouterProvider} from "./router";
import {AluraGeekProvider} from "@context/aluraGeek";
import {AuthProvider} from "@context/auth";

import Header from "@shared/header";
import Main from "@shared/main";
import Footer from "@shared/footer";

const root = createRoot(
    document.getElementById(
        process.env.REACT_ROOT_ELEMENT_ID as string
    ) as HTMLElement
);

root.render(
    <StrictMode>
        <AluraGeekProvider>
            <AuthProvider>
                <RouterProvider>
                    <Header />
                    <Main>
                        <Outlet />
                    </Main>
                    <Footer />
                </RouterProvider>
            </AuthProvider>
        </AluraGeekProvider>
    </StrictMode>
);
