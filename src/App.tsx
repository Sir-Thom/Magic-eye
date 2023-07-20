import "./App.css";
import VidPlayer from "./components/videoFrame/gstFrame";
import { Titlebar } from "./components/titlebar/titlebar";

//https://www.youtube.com/live/jfKfPfyJRdk?feature=share
function App() {
  const slideToScreen = {
    hidden: {
      x: "100vw",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,

      transition: {
        duration: 0.35,
        type: "tween",
        anticipate: [0.17, 0.67, 0.83, 0.97],
      },
    },
    exit: {
      x: "-100vw",
      opacity: 0,
    },
  };

  return (
    <>
      <Titlebar />
      {/* <motion.div
        variants={slideToScreen}
        initial="hidden"
        animate="visible"
        exit={"exit"}
      ></motion.div>*/}

      {<VidPlayer videoUrl={"http://127.0.0.1:8080/stream/stream.m3u8"} />}
    </>
  );
}

export default App;
