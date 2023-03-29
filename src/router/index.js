import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [{}]
    }
]);
