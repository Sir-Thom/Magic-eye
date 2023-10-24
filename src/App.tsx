import VidPlayer from "./components/videoPlayer/videoPlayer";
import { Titlebar } from "./components/titlebar/titlebar";
import { useEffect } from "react";
import { resizeWindow } from "./utils/WindowSize";
import { invoke } from "@tauri-apps/api";

function App() {
    useEffect(() => {
        resizeWindow;

        invoke("close_splashscreen");
    }, []);

    return (
        <>
            <Titlebar />
            <VidPlayer />
        </>
    );
}

export default App;
