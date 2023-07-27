import { useState, useEffect } from "react";
import { Titlebar } from "../components/titlebar/titlebar";
import { Link } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import { motion } from "framer-motion";
import ErrorToast from "../components/toast/errorToast";
import "../styles.css";
import Dropdown from "../components/dropdowns/dropdown";
import { invoke } from "@tauri-apps/api";
import SuccessAlert from "../components/alert/sucessAlert";
import { slideToScreen } from "../utils/animation/screenAnimation";
export function getConfigDir() {
  invoke("get_config_dir").catch((err) => {
    throw new Error("Error : " + err);
  });
}

export function GetConfigFile() {
  invoke("get_config_file").catch(() => {
    throw new Error("Error while finding the configuration file");
  });
}
export async function GetConfig() {
  try {
    const configData = await invoke("get_config_file_content");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return configData as any;
  } catch (err) {
    throw new Error("Error while reading the configuration file");
  }
}

export function SetConfig(new_settings) {
  invoke("update_settings_file", { newSettings: new_settings });
}

export default function Settings() {
  const [currentTheme, setCurrentTheme] = useState("Dark");
  const customData = {
    theme: ["Dark", "Light"]
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [config, setConfig] = useState({});
  const [tmpConf, setTmpConf] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchConfig() {
      try {
        const configData = await GetConfig();
        setConfig(configData);
        // Initialize the dropdown value with the value from the JSON file
        setCurrentTheme(configData.theme || "Dark");
      } catch (err) {
        setError(err.message);
      }
    }
    fetchConfig();
  }, []);

  function handleThemeChange(event) {
    const newTheme = event.target.value;
    setCurrentTheme(newTheme);
    // Update the temporary configuration object with the new theme
    setTmpConf((prevTmpConf) => ({
      ...prevTmpConf,
      theme: newTheme
    }));
  }

  function saveConfig() {
    SetConfig(tmpConf);
  }

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
          <div className="flex justify-start items-center">
            <Link
              className="flex justify-start items-center w-8 mt-12 dark:text-text-dark text-text-light  h-8 rounded-full hover:dark:bg-window-dark-600 hover:bg-window-light-600 "
              to="/"
            >
              <IconArrowLeft
                size={30}
                className="flex justify-center item-center dark:text-text-dark text-text-light "
              />
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
            type="button"
            className="dark:text-text-dark text-text-light bg-accent-color1-700 hover:bg-accent-color1-800 ml-4 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            className="dark:text-text-dark text-text-light bg-accent-color1-700 hover:bg-accent-color1-800 mx-4 font-bold py-2 px-4 rounded"
            onClick={saveConfig} // Call the function to update the JSON file
          >
            Apply
          </button>
        </div>
        {error && <ErrorToast message={error} />}
      </motion.div>
    </>
  );
}
