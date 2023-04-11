import { createBrowserRouter,  } from "react-router-dom";
import Layout from "../components/Layout";
import { ROUTES } from "./constant";

export const route = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: ROUTES.CHARACTERS,
                // element: <div><Outlet/></div>,
                children:[
                    {   
                        path:"/",
                        element: <div>CharactersComponent</div>
                    },
                    {
                        path:":id",
                        element: <div>Card</div>
                    }
                ]
            },
            {
                path: ROUTES.EPISODES,
                element: <div>Episodes</div>
            },
            {
                path: ROUTES.LOCATIONS,
                element: <div>Location</div>
            }
        ]
    }
]);
