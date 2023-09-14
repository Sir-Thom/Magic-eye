import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import Dropdown from "../../components/dropdowns/dropdown";

export default function LoggingSetting({ settings, onSave }) {
  const [logLevel, setLogLevel] = useState(settings.logLevel || "info");

  const [logDestinations, setLogDestinations] = useState(
    settings.logDestinations || ["stdout"]
  );
  const [logFile, setLogFile] = useState(settings.logFile || "mediamtx.log");
  const logLevels = ["info", "debug", "warning", "error"];
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
  };

  return (
    <>
      <div className="w-3/4 mx-auto flex justify-center items-center">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {settings && (
            <div className="mt-12">
              <h2 className="flex justify-center items-center text-center font-bold text-3xl">
                Logging Settings
              </h2>
              <div className="flex flex-col my-4">
                <div className="flex my-4   items-center">
                  <label className="mr-2 text-left">Log Level:</label>
                  <Dropdown
                    options={logLevels}
                    value={logLevel}
                    onChange={handleLogLevelChange}
                  />
                </div>
                <div className="flex my-4 items-center">
                  <label className="text-left  mr-2">Log Destinations:</label>
                  <input
                    type="text"
                    className="appearance-none border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={logDestinations}
                    onChange={handleLogDestinationsChange}
                  />
                </div>
                <div className="flex my-4 items-center">
                  <label className="mr-2 text-left">Log file:</label>
                  <input
                    type="text"
                    className="appearance-none border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={logFile}
                    onChange={handleLogFileChange}
                  />
                </div>
              </div>
              <div className="absolute mt-auto bottom-0 right-0 mb-4 flex justify-end items-center">
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
    </>
  );
}
