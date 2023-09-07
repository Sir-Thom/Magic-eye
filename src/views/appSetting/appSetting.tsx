import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ErrorToast from "../../components/toast/errorToast";
import "../../styles.css";
import Dropdown from "../../components/dropdowns/dropdown";
import { invoke } from "@tauri-apps/api";
import SuccessAlert from "../../components/alert/sucessAlert";
import { fadeIn } from "../../utils/animation/screenAnimation";
import { appWindow } from "@tauri-apps/api/window";
import { ISetting } from "../../interfaces/ISetting";

export async function GetConfig() {
  try {
    const configData = await invoke("get_config_file_content");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return configData as any;
  } catch (err) {
    throw new Error("Error while reading the configuration file" + err);
  }
}

export async function SetConfig(new_settings) {
  try {
    await invoke("update_settings_file", {
      newSettings: new_settings
    });

    return;
  } catch (err) {
    // Rethrow the error here
    throw new Error("Error while updating the configuration file");
  }
}

export default function GeneralSetting() {
  const [currentTheme, setCurrentTheme] = useState("");
  const [currentPlaceholder, setCurrentPlacholder] = useState("");
  const themeLabelData = {
    theme: ["dark", "light"]
  };
  const placeholderdata = {
    placeholder: [
      "placeholder-smpte",
      "placeholder-smpte100",
      "placeholder-smpte75",
      "placeholder-ball",
      "placeholder-bar",
      "placeholder-black",
      "placeholder-blue",
      "placeholder-white",
      "placeholder-green",
      "placeholder-red",
      "placeholder-solid-color",
      "placeholder-snow",
      "placeholder-checkers-1",
      "placeholder-checkers-2",
      "placeholder-checkers-4",
      "placeholder-checkers-8",
      "placeholder-chroma-zone-plate",
      "placeholder-circular",
      "placeholder-gradient",
      "placeholder-pinwheel",
      "placeholder-spokes",
      "placeholder-zone-plate"
    ]
  };

  const [tmpConf, setTmpConf] = useState<ISetting>({
    theme: "",
    placeholder: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [themeOptions, setThemeOptions] = useState<string[]>(
    themeLabelData.theme
  );
  const [placeholderOptions, setPlaceholderOptions] = useState<string[]>(
    placeholderdata.placeholder
  );

  useEffect(() => {
    async function fetchConfig() {
      try {
        const configData = await GetConfig();
        const parsedConfig = JSON.parse(configData);
        setTmpConf(parsedConfig);
        setCurrentTheme(parsedConfig.theme);
        setCurrentPlacholder(parsedConfig.placeholder);
        setError(null);

        // Update the dropdown options with values from the configuration
        if (!themeOptions.includes(parsedConfig.theme)) {
          setThemeOptions((prevOptions) => [
            ...prevOptions,
            parsedConfig.theme
          ]);
        }

        if (!placeholderOptions.includes(parsedConfig.placeholder)) {
          setPlaceholderOptions((prevOptions) => [
            ...prevOptions,
            parsedConfig.placeholder
          ]);
        }
      } catch (err) {
        setError(err.message);
      }
    }

    fetchConfig();
    appWindow.listen("tauri://update_settings_file", () => {
      fetchConfig();
    });
  }, []);

  async function handleDismissErrorToast() {
    setError(null);
  }

  async function handleCloseAlert() {
    setSuccessMessage("");
  }

  function handleThemeChange(event) {
    const newTheme = event.target.value;
    setCurrentTheme(newTheme);
    setTmpConf((prevTmpConf) => ({
      ...prevTmpConf,
      theme: newTheme
    }));
  }

  function handlePlaceholderChange(event) {
    const newPlaceholder = event.target.value;
    setCurrentPlacholder(newPlaceholder);
    setTmpConf((prevTmpConf) => ({
      ...prevTmpConf,
      placeholder: newPlaceholder
    }));
  }
  async function handleSaveConfig() {
    try {
      const jsonSettings = JSON.stringify(tmpConf);
      // Serialize the object to JSON
      await SetConfig(jsonSettings);
      setSuccessMessage("Configuration saved successfully!");
      setError(null);
    } catch (err) {
      setError("An error occurred while saving the configuration. " + err);
    }
  }

  return (
    <>
      <div className="w-3/4 mx-auto flex justify-center items-center">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {successMessage && (
            <SuccessAlert
              message={successMessage}
              OnClose={handleCloseAlert}
              timer={5000}
            />
          )}

          <div className="mt-12 mx-auto  ">
            <h2 className="flex justify-center mx-auto items-center text-center font-bold text-3xl">
              Setting
            </h2>

            <div className="flex  justify-between flex-col mx-2  items-center my-4">
              <label className="flex mx-2  items-center">
                Themes
                <Dropdown
                  options={themeOptions}
                  value={currentTheme}
                  onChange={handleThemeChange}
                />
              </label>
            </div>
            <div className="flex justify-between flex-col mx-2  items-center my-4">
              <label className="flex mx-2  items-center">
                Video Placeholder
                <Dropdown
                  options={placeholderOptions}
                  value={currentPlaceholder}
                  onChange={handlePlaceholderChange}
                />
              </label>
            </div>

            <div className="absolute bottom-0 right-0 mb-4 flex justify-end items-end">
              <button
                type="button"
                className="dark:text-text-dark text-text-light bg-accent-color1-700 hover:bg-accent-color1-800 ml-4 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                className="dark:text-text-dark text-text-light bg-accent-color1-700 hover:bg-accent-color1-800 mx-4 font-bold py-2 px-4 rounded"
                onClick={handleSaveConfig}
              >
                Apply
              </button>
            </div>
          </div>
        </motion.div>
        {error && (
          <ErrorToast
            message={error}
            timer={5000}
            onDismiss={handleDismissErrorToast}
          />
        )}
      </div>
    </>
  );
}
