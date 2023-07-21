import './App.css';
import VidPlayer from './components/videoFrame/gstFrame';
import { Titlebar } from './components/titlebar/titlebar';
//videoUrl={'http://127.0.0.1:8080/stream/stream.m3u8'}
//https://www.youtube.com/live/jfKfPfyJRdk?feature=share
function App() {
  return (
    <>
      <Titlebar />

      {<VidPlayer />}
    </>
  );
}

export default App;
