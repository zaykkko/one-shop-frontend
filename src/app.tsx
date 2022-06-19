import "./app.scss";

import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {Outlet} from "react-location";
import * as Sentry from "@sentry/react";
import {BrowserTracing} from "@sentry/tracing";

import {RouterProvider} from "./router";
import {AluraGeekProvider} from "@context/aluraGeek";
import {AuthProvider} from "@context/auth";
import {ThemeProvider} from "@context/theme";

import Header from "@shared/component/header";
import Main from "@shared/component/main";
import Footer from "@shared/component/footer";
import ErrorFallback from "@shared/component/fallbacks/error";

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: +(process.env.SENTRY_CAPTURE_RATE as string),
});

const root = createRoot(
    document.getElementById(
        process.env.REACT_ROOT_ELEMENT_ID as string
    ) as HTMLElement
);

root.render(
    <StrictMode>
        <ThemeProvider>
            <AluraGeekProvider>
                <AuthProvider>
                    <RouterProvider>
                        <Header />
                        <Main>
                            <Sentry.ErrorBoundary
                                fallback={ErrorFallback}
                                showDialog
                            >
                                <Outlet />
                            </Sentry.ErrorBoundary>
                        </Main>
                        <Footer />
                    </RouterProvider>
                </AuthProvider>
            </AluraGeekProvider>
        </ThemeProvider>
    </StrictMode>
);
