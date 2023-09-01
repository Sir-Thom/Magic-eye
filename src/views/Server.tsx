import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Titlebar } from "../components/titlebar/titlebar";
import { slideToScreen } from "../utils/animation/screenAnimation";
import { Link } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import { invoke } from "@tauri-apps/api";
import { IServer } from "../interfaces/IServer";
import ErrorToast from "../components/toast/errorToast";
import SideMenu from "../components/sideMenu/sideMenu";

export default function ServerPage() {
  const [configData, setConfigData] = useState<IServer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiEnabled, setApiEnabled] = useState(configData?.api || true);
  const [apiAddress, setApiAddress] = useState(configData?.apiAddress || "");
  const [authMethods, setAuthMethods] = useState(configData?.authMethods || []);
  const [encryption, setEncryption] = useState(configData?.encryption || "no");
  const [hlsEnabled, setHlsEnabled] = useState(configData?.hls || true);
  const [hlsAddress, setHlsAddress] = useState(
    configData?.hlsAddress || ":8888"
  );
  const [hlsAllowOrigin, setHlsAllowOrigin] = useState(
    configData?.hlsAllowOrigin || "*"
  );
  const [hlsAlwaysRemux, setHlsAlwaysRemux] = useState(
    configData?.hlsAlwaysRemux || false
  );
  const [hlsDirectory, setHlsDirectory] = useState(
    configData?.hlsDirectory || ""
  );
  const [hlsDisable, setHlsDisable] = useState(configData?.hlsDisable || false);
  const [hlsEncryption, setHlsEncryption] = useState(
    configData?.hlsEncryption || false
  );
  const [hlsPartDuration, setHlsPartDuration] = useState(
    configData?.hlsPartDuration || "200ms"
  );
  const [hlsSegmentCount, setHlsSegmentCount] = useState(
    configData?.hlsSegmentCount || 7
  );
  const [hlsSegmentDuration, setHlsSegmentDuration] = useState(
    configData?.hlsSegmentDuration || "1s"
  );
  const [hlsSegmentMaxSize, setHlsSegmentMaxSize] = useState(
    configData?.hlsSegmentMaxSize || "50M"
  );
  const [hlsServerCert, setHlsServerCert] = useState(
    configData?.hlsServerCert || "server.crt"
  );
  const [hlsServerKey, setHlsServerKey] = useState(
    configData?.hlsServerKey || "server.key"
  );
  const [hlsTrustedProxies, setHlsTrustedProxies] = useState(
    configData?.hlsTrustedProxies || []
  );
  const [hlsVariant, setHlsVariant] = useState(
    configData?.hlsVariant || "lowLatency"
  );
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
        setHlsEnabled(parsedResponse.hls || true);
        setHlsAddress(parsedResponse.hlsAddress || ":8888");
        setHlsAllowOrigin(parsedResponse.hlsAllowOrigin || "*");
        setHlsAlwaysRemux(parsedResponse.hlsAlwaysRemux || false);
        setHlsDirectory(parsedResponse.hlsDirectory || "");
        setHlsDisable(parsedResponse.hlsDisable || false);
        setHlsEncryption(parsedResponse.hlsEncryption || false);
        setHlsPartDuration(parsedResponse.hlsPartDuration || "200ms");
        setHlsSegmentCount(parsedResponse.hlsSegmentCount || 7);
        setHlsSegmentDuration(parsedResponse.hlsSegmentDuration || "1s");
        setHlsSegmentMaxSize(parsedResponse.hlsSegmentMaxSize || "50M");
        setHlsServerCert(parsedResponse.hlsServerCert || "server.crt");
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

  const handleHlsEnabledChange = (event) => {
    setHlsEnabled(event.target.checked);
  };

  const handleHlsAddressChange = (event) => {
    setHlsAddress(event.target.value);
  };
  const handleHlsAllowOriginChange = (event) => {
    setHlsAllowOrigin(event.target.value);
  };

  const handleHlsAlwaysRemuxChange = (event) => {
    setHlsAlwaysRemux(event.target.checked);
  };

  const handleHlsDirectoryChange = (event) => {
    setHlsDirectory(event.target.value);
  };

  const handleHlsDisableChange = (event) => {
    setHlsDisable(event.target.checked);
  };

  const handleHlsEncryptionChange = (event) => {
    setHlsEncryption(event.target.checked);
  };

  const handleHlsPartDurationChange = (event) => {
    setHlsPartDuration(event.target.value);
  };

  const handleHlsSegmentCountChange = (event) => {
    setHlsSegmentCount(event.target.value);
  };

  const handleHlsSegmentDurationChange = (event) => {
    setHlsSegmentDuration(event.target.value);
  };

  const handleHlsSegmentMaxSizeChange = (event) => {
    setHlsSegmentMaxSize(event.target.value);
  };

  const handleHlsServerCertChange = (event) => {
    setHlsServerCert(event.target.value);
  };

  const handleHlsServerKeyChange = (event) => {
    setHlsServerKey(event.target.value);
  };

  const handleHlsTrustedProxiesChange = (event) => {
    setHlsTrustedProxies(event.target.value);
  };

  const handleHlsVariantChange = (event) => {
    setHlsVariant(event.target.value);
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
      hls: hlsEnabled,
      hlsAddress: hlsAddress,
      hlsAllowOrigin: hlsAllowOrigin,
      hlsAlwaysRemux: hlsAlwaysRemux,
      hlsDirectory: hlsDirectory,
      hlsDisable: hlsDisable,
      hlsEncryption: hlsEncryption,
      hlsPartDuration: hlsPartDuration,
      hlsSegmentCount: hlsSegmentCount,
      hlsSegmentDuration: hlsSegmentDuration,
      hlsSegmentMaxSize: hlsSegmentMaxSize,
      hlsServerCert: hlsServerCert,
      hlsServerKey: hlsServerKey,
      hlsTrustedProxies: hlsTrustedProxies,
      hlsVariant: hlsVariant,
      logDestinations: logDestinations
    }));
  };
  const menuItems = [
    { label: "Item 1", link: "#" },
    { label: "Item 2", link: "#" },
    { label: "Item 3", link: "#" }
  ];
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
          <div className="flex">
            <div className="w-1/4">
              <SideMenu menuItems={menuItems} />
            </div>
            <div className="w-3/4">
              {configData && (
                <div className="mt-12">
                  <h2 className="flex justify-center items-center text-center font-bold text-3xl">
                    Configuration Data
                  </h2>
                  <div className="flex justify-center items-center my-4 flex-1 ">
                    <label>
                      API Enabled:
                      <input
                        type="checkbox"
                        className="mx-2"
                        value={apiEnabled.toString()}
                        checked={apiEnabled}
                        onChange={handleApiEnabledChange}
                      />
                    </label>
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
                  <div className="flex justify-center items-center my-4 flex-1">
                    <label>
                      HLS Enabled:
                      <input
                        type="checkbox"
                        className="mx-2"
                        value={hlsEnabled.toString()}
                        checked={hlsEnabled}
                        onChange={handleHlsEnabledChange}
                      />
                    </label>
                  </div>
                  <div className="flex justify-center items-center my-4 flex-1">
                    <label>
                      HLS Address:
                      <input
                        type="text"
                        className="mx-2"
                        value={hlsAddress}
                        onChange={handleHlsAddressChange}
                      />
                    </label>
                  </div>
                  <div className="flex justify-center items-center my-4 flex-1 ">
                    <label>
                      HLS Allow Origin:
                      <input
                        type="text"
                        className="mx-2"
                        value={hlsAllowOrigin}
                        onChange={handleHlsAllowOriginChange}
                      />
                    </label>
                  </div>
                  <div className="flex justify-center items-center my-4 flex-1 ">
                    <label>
                      HLS Always Remux:
                      <input
                        type="checkbox"
                        className="mx-2"
                        value={hlsAlwaysRemux.toString()}
                        onChange={handleHlsAlwaysRemuxChange}
                      />
                    </label>
                  </div>
                  <div className="flex justify-center items-center my-4 flex-1 ">
                    <label>
                      HLS Directory:
                      <input
                        type="text"
                        className="mx-2"
                        value={hlsDirectory}
                        onChange={handleHlsDirectoryChange}
                      />
                    </label>
                  </div>
                  <div className="flex justify-center items-center my-4 flex-1 ">
                    <label>
                      HLS Disable:
                      <input
                        type="checkbox"
                        className="mx-2"
                        value={hlsDisable.toString()}
                        onChange={handleHlsDisableChange}
                      />
                    </label>
                  </div>
                  <div className="flex justify-center items-center my-4 flex-1 ">
                    <label>
                      HLS Encryption:
                      <input
                        type="checkbox"
                        className="mx-2"
                        value={hlsEncryption.toString()}
                        onChange={handleHlsEncryptionChange}
                      />
                    </label>
                  </div>
                  <div className="flex justify-center items-center my-4 flex-1 ">
                    <label>
                      HLS Part Duration:
                      <input
                        type="text"
                        className="mx-2"
                        value={hlsPartDuration}
                        onChange={handleHlsPartDurationChange}
                      />
                    </label>
                  </div>
                  <div className="flex justify-center items-center my-4 flex-1 ">
                    <label>
                      HLS Segment Count:
                      <input
                        type="number"
                        className="mx-2"
                        value={hlsSegmentCount}
                        onChange={handleHlsSegmentCountChange}
                      />
                    </label>
                  </div>
                  <div className="flex justify-center items-center my-4 flex-1 ">
                    <label>
                      HLS Segment Duration:
                      <input
                        type="text"
                        className="mx-2"
                        value={hlsSegmentDuration}
                        onChange={handleHlsSegmentDurationChange}
                      />
                    </label>
                  </div>
                  <div className="flex justify-center items-center my-4 flex-1 ">
                    <label>
                      HLS Segment Max Size:
                      <input
                        type="text"
                        className="mx-2"
                        value={hlsSegmentMaxSize}
                        onChange={handleHlsSegmentMaxSizeChange}
                      />
                    </label>
                  </div>
                  <div className="flex justify-center items-center my-4 flex-1 ">
                    <label>
                      HLS Server Cert:
                      <input
                        type="text"
                        className="mx-2"
                        value={hlsServerCert}
                        onChange={handleHlsServerCertChange}
                      />
                    </label>
                  </div>
                  <div className="flex justify-center items-center my-4 flex-1 ">
                    <label>
                      HLS Server Key:
                      <input
                        type="text"
                        className="mx-2"
                        value={hlsServerKey}
                        onChange={handleHlsServerKeyChange}
                      />
                    </label>
                  </div>
                  <div className="flex justify-center items-center my-4 flex-1">
                    <label>
                      HLS Trusted Proxies:
                      <textarea
                        name="hlsTrustedProxies"
                        style={{ resize: "none" }}
                        className="mx-2"
                        value={hlsTrustedProxies}
                        onChange={handleHlsTrustedProxiesChange}
                      />
                    </label>
                  </div>
                  <div className="flex justify-center items-center my-4 flex-1 ">
                    <label>
                      HLS Variant:
                      <input
                        type="text"
                        className="mx-2"
                        value={hlsVariant}
                        onChange={handleHlsVariantChange}
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
                  <button
                    type="button"
                    className="dark:text-text-dark text-text-light bg-accent-color1-700 hover:bg-accent-color1-800 mx-4 font-bold py-2 px-4 rounded"
                    onClick={handleSaveConfig}
                  >
                    Save
                  </button>
                  <pre className="bg-window-dark-500 p-4 rounded-md">
                    {JSON.stringify(configData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
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
    </>
  );
}
