import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";

import { ROUTES } from "./constant";

import { lazy } from "react";
const MainPage = lazy(()=>import("./MainPage"))
const Locations = lazy(()=>import("./Locations"))
const Episodes = lazy(()=>import("./Episodes"))
const Characters = lazy(()=>import("./Chacraters"))
const SingleCharacter = lazy(()=>import("./SingleCharacter"))

export const route = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: ROUTES.MAIN,
                element: <MainPage />
            },
            {
                children: [
                    { path: ROUTES.CHARACTERS, element: <Characters /> },
                    {
                        path: ":characterId",
                        element: <SingleCharacter />
                    }
                ]
            },
            {
                path: ROUTES.EPISODES,
                element: <Episodes />
            },
            {
                path: ROUTES.LOCATIONS,
                element: <Locations />
            }
        ]
    }
]);
