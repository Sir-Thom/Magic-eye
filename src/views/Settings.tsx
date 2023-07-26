import { useState, useEffect } from "react";
import { Titlebar } from "../components/titlebar/titlebar";
import { Link, json } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import { motion } from "framer-motion";
import customData from "./settings.json";
import "../styles.css";
import Dropdown from "../components/dropdowns/dropdown";
import { invoke } from "@tauri-apps/api";

export function getConfigDir() {
  invoke("get_config_dir")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

export function GetConfigFile() {
  invoke("get_config_file")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}
export function GetConfig() {
  invoke("get_config_file_content")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}
export function SetConfig(new_settings) {
  invoke(" update_settings_file", { new_settings: new_settings });
}

export default function Settings() {
  const [currentTheme, setCurrentTheme] = useState("Dark");

  const [config, setConfig] = useState({});
  const [tmpConf, setTmpConf] = useState({});

  useEffect(() => {
    async function fetchConfig() {
      try {
        const configData = await GetConfig();
        setConfig(configData);
        setTmpConf(configData); // Initialize tmpConf with the same value as config
      } catch (err) {
        console.error(err);
      }
    }
    fetchConfig();
  }, []);

  function handleThemeChange(event) {
    setCurrentTheme(event.target.value);
    console.log(currentTheme);
    // Update the "theme" property with the new value
    setTmpConf((prevTmpConf) => ({
      ...prevTmpConf,
      theme: event.target.value
    }));

    setConfig(tmpConf);
    console.log(config);
  }
  const slideToScreen = {
    hidden: {
      x: "100vw"
    },
    visible: {
      x: "0",
      opacity: 1,

      transition: {
        duration: 0.35,
        type: "tween",
        anticipate: [0.17, 0.67, 0.83, 0.97]
      }
    },
    exit: {
      x: "-100vw",
      opacity: 0
    }
  };

  return (
    <>
      <Titlebar />
      <motion.div
        variants={slideToScreen}
        initial="hidden"
        animate="visible"
        exit={"exit"}
      >
        <div className=" h-screen">
          <div className="flex    justify-start items-center">
            <Link
              className="flex  justify-start items-center w-20   mt-12 "
              to="/"
            >
              {" "}
              <IconArrowLeft size={30} />
            </Link>
          </div>

          <h1 className="flex justify-center items-center text-center   font-bold text-3xl ">
            Setting
          </h1>
          <div className="flex  justify-center items-centerjustify-center items-center my-4 ">
            <label
              className="flex justify-center items-center text-center mx-2"
              htmlFor=""
            >
              test
            </label>
            <input></input>
          </div>

          <div className="flex justify-center items-center my-4 flex-1 ">
            <label
              className="flex justify-center items-center text-center mx-2"
              htmlFor=""
            >
              test
            </label>
            <input></input>
          </div>

          <div className="flex justify-center items-center my-4 flex-1 ">
            <label
              className="flex justify-center items-center text-center  mx-2"
              htmlFor=""
            >
              test
            </label>
            <input></input>
          </div>
          <div className="flex justify-center items-center flex-1 ">
            <label
              className="flex justify-center items-center text-center  mx-2"
              htmlFor=""
            >
              Themes
            </label>
            <Dropdown
              options={customData.theme}
              value={currentTheme}
              onChange={handleThemeChange}
            />
          </div>
        </div>

        <div className="flex absolute bottom-0 right-0 mb-4 justify-end items-center">
          <button
            type={"button"}
            className="flex justify-end items-center  mr-4 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type={"button"}
            className="flex justify-end items-center   mr-4 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              console.log("new :" + JSON.stringify(tmpConf));
              invoke("update", {
                assets: tmpConf
              });
            }}
          >
            Apply
          </button>
        </div>
      </motion.div>
    </>
  );
}
