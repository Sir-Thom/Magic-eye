import App from "./App";
import Settings from "./views/Settings";
import Server from "./views/Server";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "settings",
        element: <Settings />
    },
    {
        path: "server",
        element: <Server />
    },
    {
        path: "/",
        element: <App />
    }
]);
