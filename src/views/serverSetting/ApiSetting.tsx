import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import { invoke } from "@tauri-apps/api";

import { IServer } from "../../interfaces/IServer";
import { Titlebar } from "../../components/titlebar/titlebar";
import { slideToScreen } from "../../utils/animation/screenAnimation";
import SideMenu from "../../components/sideMenu/sideMenu";
import ErrorToast from "../../components/toast/errorToast";
import Checkbox from "../../components/checkBox/checkBox";

export default function ApiSetting() {
  const [configData, setConfigData] = useState<IServer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiEnabled, setApiEnabled] = useState(configData?.api || true);
  const [apiAddress, setApiAddress] = useState(configData?.apiAddress || "");
  const [authMethods, setAuthMethods] = useState(configData?.authMethods || []);
  const [encryption, setEncryption] = useState(configData?.encryption || "no");
  const [logDestinations, setLogDestinations] = useState(
    configData?.logDestinations || ["stdout"]
  );
  useEffect(() => {
    setError(null);
    const serverUrl = "http://127.0.0.1:9997/v2/config/get"; // Replace with your actual URL
    invoke("get_server_config_options", { url: serverUrl })
      .then((response: string) => {
        const parsedResponse: IServer = JSON.parse(response);
        setConfigData(parsedResponse);
        setApiEnabled(parsedResponse.api || true);
        setApiAddress(parsedResponse.apiAddress || "127.0.0.1");
        setAuthMethods(parsedResponse.authMethods || []);
        setEncryption(parsedResponse.encryption || "no");
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("Error:", error);
        setError(error);
      });
  }, []);
  const handleApiEnabledChange = (event) => {
    setApiEnabled(event.target.checked);
  };

  // Handler for updating API Address input
  const handleApiAddressChange = (event) => {
    setApiAddress(event.target.value);
  };

  const handleAuthMethodsChange = (event) => {
    setAuthMethods(event.target.value);
  };

  const handleEncryptionChange = (event) => {
    setEncryption(event.target.value);
  };

  const handleLogDestinationsChange = (event) => {
    setLogDestinations(event.target.value.split(","));
  };

  const handleSaveConfig = () => {
    // Update the configData state with the modified values
    setConfigData((prevConfig) => ({
      ...prevConfig,
      api: apiEnabled,
      apiAddress: apiAddress,
      authMethods: authMethods,
      encryption: encryption,
      logDestinations: logDestinations
    }));
  };
  const menuItems = [
    { label: "API Setting", link: "/server/api" },
    { label: "HLS Setting", link: "/server/hls" },
    { label: "Item 3", link: "#" }
  ];
  async function handleDismissErrorToast() {
    setError(null);
  }
  return (
    <>
      <Titlebar />
      <div className="flex flex-col h-screen">
        <div className="flex justify-start h-fit items-center">
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
        <div className="flex ">
          <div className="w-1/4  m-auto  h-full">
            <SideMenu menuItems={menuItems} />
          </div>
          <div className="w-3/4 m-auto">
            <motion.div
              variants={slideToScreen}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {configData && (
                <div className="mt-12">
                  <h2 className="flex justify-center items-center text-center font-bold text-3xl">
                    API Setting
                  </h2>
                  <div className="flex justify-center items-center my-4 flex-1 ">
                    <Checkbox
                      title="API Enabled"
                      value={apiEnabled.toString()}
                      checked={apiEnabled}
                      onChange={handleApiEnabledChange}
                    />
                  </div>
                  <div className="flex justify-center items-center my-4 flex-1 ">
                    <label>
                      API Address:
                      <input
                        type="text"
                        className="mx-2"
                        value={apiAddress}
                        onChange={handleApiAddressChange}
                      />
                    </label>
                  </div>
                  <div className="flex justify-center items-center my-4 flex-1">
                    <label>
                      Auth Methods:
                      <input
                        type="text"
                        className="mx-2"
                        value={authMethods}
                        onChange={handleAuthMethodsChange}
                      />
                    </label>
                  </div>
                  <div className="flex justify-center items-center my-4 flex-1">
                    <label>
                      Encryption:
                      <input
                        type="text"
                        className="mx-2"
                        value={encryption}
                        onChange={handleEncryptionChange}
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
                  <div className=" mt-auto bottom-10 right-0 mb-4 flex justify-end items-center">
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
        </div>

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
