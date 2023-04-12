import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Characters from "./chacraters";
import { ROUTES } from "./constant";
import Episodes from "./episodes";
import Locations from "./locations";

export const route = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: ROUTES.CHARACTERS,
                // element: <div><Outlet/></div>,
                children: [
                    {
                        path: "/",
                        element: <Characters />
                    },
                    {
                        path: ":id",
                        element: <div>Card</div>
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
