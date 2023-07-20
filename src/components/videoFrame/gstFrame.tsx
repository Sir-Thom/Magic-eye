import { useEffect, useState, useCallback } from "react";
import ReactPlayer from "react-player";
import ReactHlsPlayer from "react-hls-player";
import useWindowDimensions from "../../utils/WindowSize";
import { invoke } from "@tauri-apps/api";
//border-[#8e44ad]
import { motion } from "framer-motion";

const videoUrls = [
  "http://192.168.0.161:8000/stream",
  "http://legion:8080/stream/stream.m3u8",

  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "./src/assets/test.mp4",
];

export default function VidPlayer({ videoUrl }) {
  const { height, width } = useWindowDimensions();
  const [ip, setip] = useState("");
  const i = () => {
    console.log("ip: " + ip);
    invoke("get_ip", { ip: ip });
  };

  const slideToScreen = {
    hidden: {
      x: "100vw",
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
      {/*  <ReactPlayer
          playing={true}
          loop={true}
          className="flex  mx-16  mt-16  "
          url={videoUrl}
          width={width}
          height={height - 150}
          controls={true}
        />     <motion.div
        variants={slideToScreen}
        initial="hidden"
        animate="visible"
        exit={"exit"}
      >*/}

      <div className="flex  h-full w-full  justify-center items-center">
        <ReactHlsPlayer
          src={videoUrl}
          autoPlay={true}
          controls={true}
          width={width}
          height="auto"
          hlsConfig={{
            maxLoadingDelay: 4,
            minAutoBitrate: 0,
            lowLatencyMode: true,
          }}
        />
      </div>
      <div className="w-full flex justify-center items-center pb-1 mt-6">
        <button
          type={"button"}
          className=" dark:text-text-dark text-text-light bg-accent-color1-700 hover:bg-accent-color1-800 ml-16  font-bold py-2 px-4 rounded"
        >
          Disconnect
        </button>
        <div className="mx-4 dark:text-text-dark text-text-light flex-1">
          <input
            className="w-full border-2 border-gray-400 rounded items-center mt-1 py-2 mb-2 px-4"
            type="text"
            placeholder="IP address"
            onChange={(e) => setip(e.target.value)}
          />
        </div>
        <button
          onClick={i}
          type={"button"}
          className=" bg-accent-color1-700 hover:bg-accent-color1-800 mr-16   font-bold py-2 px-4 rounded"
        >
          Connect
        </button>
      </div>
      {/*</motion.div>*/}
    </>
  );
}
