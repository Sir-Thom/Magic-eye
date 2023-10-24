import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import Dropdown from "../../components/dropdowns/dropdown";

export default function LoggingSetting({ settings, onSave, patchSetting }) {
    const [logLevel, setLogLevel] = useState(settings.logLevel || "info");

    const [logDestinations, setLogDestinations] = useState(
        settings.logDestinations || ["stdout"]
    );
    const [logFile, setLogFile] = useState(settings.logFile || "mediamtx.log");
    const logLevels = ["info", "debug", "warning", "error"];

    useEffect(() => {
        setLogLevel(settings.logLevel || "info");
        setLogDestinations(settings.logDestinations || ["stdout"]);
        setLogFile(settings.logFile || "mediamtx.log");
    }, [settings]);

    const handleLogLevelChange = (event) => {
        setLogLevel(event.target.value);
    };

    const handleLogDestinationsChange = (event) => {
        setLogDestinations(event.target.value.split(","));
    };

    const handleLogFileChange = (event) => {
        setLogFile(event.target.value);
    };

    const handleSaveConfig = () => {
        // Create an updated settings object with the modified logging settings
        const updatedSettings = {
            ...settings,
            logLevel: logLevel,
            logDestinations: logDestinations,
            logFile: logFile
        };

        // Call the onSave prop to save the changes
        onSave(updatedSettings);
        patchSetting(updatedSettings);
    };

    return (
        <>
            <div className="w-3/4 mx-auto  flex justify-center items-center">
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {settings && (
                        <div className="mt-4">
                            <h2 className="text-center mx-auto font-bold text-3xl mb-4">
                                Logging Settings
                            </h2>
                            <div className="grid grid-cols-2 mt-6 content-between place-content-start gap-4">
                                <div className="col-span-1">
                                    <div className="flex flex-col text-right items-end">
                                        {/* Labels column */}
                                        <label className="m-2">
                                            Log Level:
                                        </label>
                                        <label className="m-2">
                                            Log Destinations:
                                        </label>
                                        <label className="m-2">Log file:</label>
                                    </div>
                                </div>

                                {/* Inputs column */}
                                <div className="col-span-1">
                                    <div className="flex flex-col">
                                        <Dropdown
                                            options={logLevels}
                                            value={logLevel}
                                            onChange={handleLogLevelChange}
                                        />
                                        <input
                                            type="text"
                                            className="appearance-none border mx-2 mt-4 mb-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            value={logDestinations}
                                            onChange={
                                                handleLogDestinationsChange
                                            }
                                        />
                                        <input
                                            type="text"
                                            className="appearance-none border m-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            value={logFile}
                                            onChange={handleLogFileChange}
                                        />
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
                    )}
                </motion.div>
            </div>
        </>
    );
}
