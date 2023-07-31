import "./App.css";
import VidPlayer from "./components/videoFrame/gstFrame";
import { Titlebar } from "./components/titlebar/titlebar";
import { useEffect } from "react";
import { resizeWindow } from "./utils/WindowSize";
function App() {
  useEffect(() => {
    resizeWindow;
  }, []);

  return (
    <>
      <Titlebar />

      {<VidPlayer />}
    </>
  );
}

export default App;
