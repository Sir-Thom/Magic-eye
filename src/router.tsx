import App from "./App";
import Settings from "./views/Settings";
import { createBrowserRouter } from "react-router-dom";
import ServerSettings from "./views/serverSetting/ServerSettings";

export const router = createBrowserRouter([
  {
    path: "settings",
    element: <Settings />
  },
  {
    path: "/",
    element: <App />
  },

  { path: "server", element: <ServerSettings /> }
]);
