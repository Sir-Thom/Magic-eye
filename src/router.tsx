import App from "./App";
import Settings from "./views/Settings";
import ServerPage from "./views/Server";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "settings",
    element: <Settings />
  },
  {
    path: "/",
    element: <App />
  },
  { path: "server", element: <ServerPage /> }
]);
