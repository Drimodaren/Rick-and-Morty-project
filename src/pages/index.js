import { Outlet, createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Characters from "./chacraters";
import { ROUTES } from "./constant";
import Episodes from "./episodes";
import Locations from "./locations";
import SingleCharacter from "./SingleCharacter/SingleCharacter";
import MainPage from "./MainPage";

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
