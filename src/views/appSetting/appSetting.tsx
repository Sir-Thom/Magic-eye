import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Notification from "../../components/notification/notification";
import Dropdown from "../../components/dropdowns/dropdown";
import { invoke } from "@tauri-apps/api/core";
import SuccessAlert from "../../components/alert/sucessAlert";
import { fadeIn } from "../../utils/animation/screenAnimation";
import { ISetting } from "../../interfaces/ISetting";
import { listen } from "@tauri-apps/api/event";
import ModalConfirm from "../../components/modals/modalConfirm";

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
    const [currentPlaceholder, setCurrentPlacholder] = useState("");
    const [api_ip, setApi_ip] = useState("");
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
        placeholder: "",
        api_ip: ""
      });
      const [error, setError] = useState<string | null>(null);
      const [successMessage, setSuccessMessage] = useState("");
    
      const [placeholderOptions, setPlaceholderOptions] = useState<string[]>(
        placeholderdata.placeholder
      );
    
      const [showConfirmationModal, setShowConfirmationModal] = useState(false);
      
      const [configData, setConfigData] = useState<ISetting>({
        placeholder: "",
        api_ip: ""
      });



      const initialSettings = {
        ...configData
      };
    
      const handleCancel = () => {
        console.log("initialSettings:", initialSettings);
        
        setCurrentPlacholder(initialSettings.placeholder);
        setApi_ip(initialSettings.api_ip);
      };
    
      const showConfirmation = () => {
        setShowConfirmationModal(true);
      };
    
      const hideConfirmation = () => {
        setShowConfirmationModal(false);
      };
    
      useEffect(() => {
        async function fetchConfig() {
          try {
            const configData = await GetConfig();
            const parsedConfig = JSON.parse(configData);
            setTmpConf(parsedConfig);
            setCurrentPlacholder(parsedConfig.placeholder);
            setApi_ip(parsedConfig.api_ip);
            setError(null);
            setConfigData(parsedConfig);
    
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
        listen("tauri://update_settings_file", () => {
          fetchConfig();
          console.log("Settings file updated");
        });
      }, []);
    
      async function handleDismissErrorToast() {
        setError(null);
      }
    
      async function handleCloseAlert() {
        setSuccessMessage("");
      }
    
      function handlePlaceholderChange(event) {
        const newPlaceholder = event.target.value;
        setCurrentPlacholder(newPlaceholder);
        setTmpConf((prevTmpConf) => ({
          ...prevTmpConf,
          placeholder: newPlaceholder
        }));
      }
      function handleApi_ipChange(event) {
        const newApi_ip = event.target.value;
        setApi_ip(newApi_ip);
        setTmpConf((prevTmpConf) => ({
          ...prevTmpConf,
          api_ip: newApi_ip
        }));
      }
      async function handleSaveConfig() {
        hideConfirmation();
        try {
          const jsonSettings = JSON.stringify(tmpConf);
          await SetConfig(jsonSettings);
          setSuccessMessage("Configuration saved successfully!");
          setError(null);
        } catch (err) {
          setError(err.message.toString());
        }
      }


    const AppSection = () => (
        <div className="grid  w-full  grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 ">
            <div>
                <h2 className="text-base font-semibold leading-7 text-white">
                    General
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400"></p>
            </div>
            <div className="col-span-2 gap-4 w-fit   grid-rows-2 grid grid-cols-2">
                <label className="place-content-center  my-auto  col-start-1 row-start-1 row-end-2 ">
                    Placeholder:
                </label>
                <label className="place-content-center my-auto col-start-1 row-start-2 row-end-3 ">
                    API IP:
                </label>

                <Dropdown
                    className="place-content-center  my-auto  row-start-1 row-end-2"
                    options={placeholderOptions}
                    value={currentPlaceholder}
                    onChange={handlePlaceholderChange}
                />

                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-2 row-end-3 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={api_ip}
                    onChange={handleApi_ipChange}
                />
            </div>
        </div>
    );

    return (
        <>
            <div className="mx-auto  w-full  ">
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full  rounded-md"
                >
                    <div className="mx-auto  w-full">
                        {successMessage && (
                            <SuccessAlert
                                message={successMessage}
                                OnClose={handleCloseAlert}
                                timer={5000}
                            />
                        )}
                        <h2 className="text-center py-2.5  mx-auto w-full  bg-center bg-window-dark-900 font-bold text-3xl">
                            App Setting
                        </h2>

                        <div className="divide-y  w-full divide-window-dark-500">
                            {AppSection()}
                        </div>
                        <div className="my-6 flex justify-end fixed bottom-0 right-0">
                            <button
                                type="button"
                                className="dark:text-text-dark text-text-light bg-accent-color1-700 hover:bg-accent-color1-800 ml-4 font-bold py-2 px-4 rounded"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="dark:text-text-dark text-text-light bg-accent-color1-700 hover:bg-accent-color1-800 mx-4 font-bold py-2 px-4 rounded"
                                onClick={showConfirmation}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </motion.div>
            {showConfirmationModal && (
                <ModalConfirm
                confirmText={"Are you sure you want to apply the changes?"}
                confirmTitle={"Apply App Setting ?"}
                    onConfirm={handleSaveConfig}
                    isOpen={showConfirmationModal}
                    onClose={hideConfirmation}
                />
            )}
            </div>
            <div className="my-6 flex justify-end fixed bottom-0 right-0">
                {error && (
                    <Notification
                        message={error}
                        timer={5000}
                        type={"error"}
                        onDismiss={handleDismissErrorToast}
                    />
                )}
            </div>
        </>
    );
}
