import App from "./App";
import Settings from "./views/Settings";
import HlsSetting from "./views/serverSetting/hlsSetting";
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
  { path: "server/hls", element: <HlsSetting /> },

  { path: "server", element: <ServerSettings /> }
]);
