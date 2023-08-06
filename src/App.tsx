import VidPlayer from "./components/videoPlayer/videoPlayer";
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
