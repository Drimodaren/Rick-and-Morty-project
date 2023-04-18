import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const BrowserRouterProvider = ({ children }) => {
    return <BrowserRouter>{children}</BrowserRouter>;
};

export const withBrowserRouterRender = (ui, options) => render(ui, { wrapper: BrowserRouterProvider, ...options });
