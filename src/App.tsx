import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.scss";
import { route } from "./pages";
import { initialredux } from "./store";

function App() {
    return (
        <Provider store={initialredux}>
            <RouterProvider router={route} />
        </Provider>
    );
}

export default App;
