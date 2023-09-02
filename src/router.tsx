import App from "./App";
import Settings from "./views/Settings";
import HlsSetting from "./views/serverSetting/hlsSetting";
import ApiSetting from "./views/serverSetting/ApiSetting";
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
  { path: "server/hls", element: <HlsSetting /> },
  { path: "server/api", element: <ApiSetting /> }
]);
