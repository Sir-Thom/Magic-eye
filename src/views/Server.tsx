import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Titlebar } from "../components/titlebar/titlebar";
import { slideToScreen } from "../utils/animation/screenAnimation";
import { Link } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import { invoke } from "@tauri-apps/api";
import { IServer } from "../interfaces/IServer";
import ErrorToast from "../components/toast/errorToast";

export default function ServerPage() {
  const [configData, setConfigData] = useState<IServer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiEnabled, setApiEnabled] = useState(configData?.api || false);
  const [apiAddress, setApiAddress] = useState(configData?.apiAddress || "");

  // Handler for updating API Enabled checkbox
  const handleApiEnabledChange = (event) => {
    setApiEnabled(event.target.checked);
  };

  // Handler for updating API Address input
  const handleApiAddressChange = (event) => {
    setApiAddress(event.target.value);
  };
  useEffect(() => {
    setError(null);
    const serverUrl = "http://127.0.0.1:9997/v2/config/get"; // Replace with your actual URL
    invoke("get_server_config_options", { url: serverUrl })
      .then((response: string) => {
        const parsedResponse: IServer = JSON.parse(response);
        setConfigData(parsedResponse);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
      });
  }, []);

  const handleSaveConfig = () => {
    // Update the configData state with the modified values
    setConfigData((prevConfig) => ({
      ...prevConfig,
      api: apiEnabled,
      apiAddress: apiAddress
    }));

    // Perform any API call or logic here to save the changes on the server
  };
  async function handleDismissErrorToast() {
    setError(null);
  }

  return (
    <>
      <Titlebar />

      <motion.div
        variants={slideToScreen}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="h-screen">
          <div className="flex justify-start items-center">
            <Link
              className="flex justify-start items-center w-8 mt-12 dark:text-text-dark text-text-light h-8 rounded-full hover:dark:bg-window-dark-600 hover:bg-window-light-600"
              to="/"
            >
              <IconArrowLeft
                size={30}
                className="flex justify-center items-center dark:text-text-dark text-text-light"
              />
            </Link>
          </div>
          {configData && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mx-2 mb-2">
                Configuration Data
              </h2>
              <label>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={configData.api}
                  onChange={handleApiEnabledChange}
                />
                API Enabled
              </label>
              API Address:
              <label>
                <input
                  type="text"
                  className="mr-2"
                  value={apiAddress}
                  onChange={handleApiAddressChange}
                />
              </label>
              <button onClick={handleSaveConfig}>Save</button>
              <pre className="bg-window-dark-500 p-4 rounded-md">
                {JSON.stringify(configData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </motion.div>
      {error && (
        <ErrorToast
          message={error}
          timer={5000}
          onDismiss={handleDismissErrorToast}
        />
      )}
    </>
  );
}
