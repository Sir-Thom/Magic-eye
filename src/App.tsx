import VidPlayer from "./components/videoPlayer/videoPlayer";
import { useEffect } from "react";
import { resizeWindow } from "./utils/WindowSize";
import { invoke } from "@tauri-apps/api/core";
import { createPortal } from "react-dom";
import Titlebar from "./components/titlebar/titlebar";

function App() {
    useEffect(() => {
        resizeWindow;
        invoke("close_splashscreen");
    }, []);

    return (
        <>
            {/*https://react.dev/reference/react-dom/createPortal*/}
            {createPortal(<Titlebar />, document.getElementById("titlebar")!)}
            <VidPlayer />
        </>
    );
}

export default App;
