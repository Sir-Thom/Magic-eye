import "./App.css";
import VidPlayer from "./components/videoFrame/gstFrame";
import { Titlebar } from "./components/titlebar/titlebar";
function App() {
  return (
    <>
      <Titlebar />

      {<VidPlayer />}
    </>
  );
}

export default App;
