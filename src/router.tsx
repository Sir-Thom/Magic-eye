import App from "./App";
import Settings from "./views/Settings";
import Server from "./views/Server";
import { Route, Routes } from "react-router-dom";

export default function Router() {
    return (<Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/server" element={<Server />} />
        <Route path="/" element={<App />} />
    </Routes>);
}

