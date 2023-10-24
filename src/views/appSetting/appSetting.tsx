import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Toast from "../../components/toast/Toast";
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
    const [currentPlaceholder, setCurrentPlacholder] = useState("");

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
        placeholder: ""
    });
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState("");

    const [placeholderOptions, setPlaceholderOptions] = useState<string[]>(
        placeholderdata.placeholder
    );

    useEffect(() => {
        async function fetchConfig() {
            try {
                const configData = await GetConfig();
                const parsedConfig = JSON.parse(configData);
                setTmpConf(parsedConfig);
                setCurrentPlacholder(parsedConfig.placeholder);
                setError(null);

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
            setError(
                "An error occurred while saving the configuration. " + err
            );
        }
    }

    return (
        <>
            <div className="w-3/4 mx-auto  flex justify-center items-center">
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="mt-4">
                        {successMessage && (
                            <SuccessAlert
                                message={successMessage}
                                OnClose={handleCloseAlert}
                                timer={5000}
                            />
                        )}
                        <div className="my-4">
                            <h2 className="text-center font-bold text-3xl">
                                Setting
                            </h2>
                            <div className="grid grid-cols-2 mt-6 content-between place-content-start gap-4">
                                <div className="col-span-1">
                                    <div className="flex flex-col text-right items-end">
                                        <label className="my-2">
                                            Placeholder:
                                        </label>
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div className="flex flex-col">
                                        <Dropdown
                                            className="mt-2"
                                            options={placeholderOptions}
                                            value={currentPlaceholder}
                                            onChange={handlePlaceholderChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="my-6 flex justify-end fixed bottom-0 right-0">
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
                    </div>
                </motion.div>
            </div>
            {error && (
                <Toast
                    message={error}
                    timer={5000}
                    type={"error"}
                    onDismiss={handleDismissErrorToast}
                />
            )}
        </>
    );
}
