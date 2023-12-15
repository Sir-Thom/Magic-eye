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
    const logLevels = ["info", "debug", "warn", "error"];

    useEffect(() => {
        setLogLevel(settings.logLevel || "info");
        setLogDestinations(settings.logDestinations || ["stdout"]);
        setLogFile(settings.logFile || "mediamtx.log");
    }, [settings]);

    const handleLogLevelChange = (event) => {
            setLogLevel(event.target.value);
            console.log("logLevel:", logLevel);
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
        console.log("updatedSettings:", updatedSettings);   

        // Call the onSave prop to save the changes
        onSave(updatedSettings);
        patchSetting(updatedSettings);
    };

    const LoggingSection = () => (
        <div className="grid  w-full  grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 ">
            <div>
                <h2 className="text-base font-semibold leading-7 text-white">
                    Logging
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400"></p>
            </div>
            <div className="col-span-2 gap-4 w-fit   grid-rows-3 grid grid-cols-2">
                <label className="place-content-center  my-auto  col-start-1 row-start-1 row-end-2 ">
                    Log Level:
                </label>
                <label className="place-content-center my-auto col-start-1 row-start-2 row-end-3 ">
                    log Destinations:
                </label>
                <label className="place-content-center col-start-1 row-start-3 row-end-4 my-auto">
                    logFile name:
                </label>

                <Dropdown
                    className=" row-start-1 my-auto place-content-center row-end-2"
                    options={logLevels}
                    value={logLevel}
                    onChange={handleLogLevelChange}
                />

                <input
                    type="text"
                    className="appearance-none h-8  border place-content-center  my-auto  row-start-2 row-end-3  border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={logDestinations}
                    onChange={handleLogDestinationsChange}
                />
                <input
                    type="text"
                    className="appearance-none h-8  border my-auto  row-start-3 row-end-4 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={logFile}
                    onChange={handleLogFileChange}
                />
            </div>
        </div>
    );

    return (
        <div className="mx-auto  w-full  ">
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full  rounded-md"
            >
                {settings && (
                    <div className="mx-auto w-full">
                        <h2 className="text-center py-2.5  mx-auto w-full  bg-center bg-window-dark-900 font-bold text-3xl">
                            Logging Setting
                        </h2>
                        <div className="divide-y  w-full divide-window-dark-500">
                            {LoggingSection()}
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
                )}
            </motion.div>
        </div>
    );
}
