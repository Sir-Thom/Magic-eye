import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";

export default function LoggingSetting({ settings, onSave }) {
  const [logLevel, setLogLevel] = useState(settings.logLevel || "info");
  const [logDestinations, setLogDestinations] = useState(
    settings.logDestinations || ["stdout"]
  );
  const [logFile, setLogFile] = useState(settings.logFile || "mediamtx.log");

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
              <div className="flex justify-center items-center my-4 flex-1 ">
                <label>
                  Log Level:
                  <input
                    type="text"
                    className="mx-2"
                    value={logLevel}
                    onChange={handleLogLevelChange}
                  />
                </label>
              </div>
              <div className="flex justify-center items-center my-4 flex-1 ">
                <label>
                  Log Destinations:
                  <input
                    type="text"
                    className="mx-2"
                    value={logDestinations}
                    onChange={handleLogDestinationsChange}
                  />
                </label>
              </div>
              <div className="flex justify-center items-center my-4 flex-1 ">
                <label>
                  Log file:
                  <input
                    type="text"
                    className="mx-2"
                    value={logFile}
                    onChange={handleLogFileChange}
                  />
                </label>
              </div>
              <div className="absolute  mt-auto bottom-0 right-0 mb-4 flex justify-end items-center">
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
