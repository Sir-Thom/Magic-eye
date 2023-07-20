import React, { useState, useEffect } from "react";
import { Titlebar } from "../components/titlebar/titlebar";
import { Link } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import { motion } from "framer-motion";
import customData from "./settings.json";
import "../styles.css";
import { configDir } from "@tauri-apps/api/path";
import Dropdown from "../components/dropdowns/dropdown";

async function getConfigDirPath() {
  const configDirPath = (await configDir()) + "Test/settings.json";
  console.log(configDirPath);
}

export default function Settings() {
  const [currentTheme, setCurrentTheme] = useState("Dark");
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    // Fetch themes from the JSON file or any data source
    setThemes(customData.theme);
  }, []);

  console.log(getConfigDirPath());

  function handleThemeChange(event) {
    setThemes(customData.theme);
    setCurrentTheme(event.target.value);
    console.log(currentTheme);
  }
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
            onClick={getConfigDirPath}
          >
            Apply
          </button>
        </div>
      </motion.div>
    </>
  );
}
