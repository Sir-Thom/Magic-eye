import { useEffect, useState } from "react";
import ApiSetting from "./ApiSetting";
import HlsSetting from "./hlsSetting";
import LoggingSetting from "./LoggingSetting";
import { Titlebar } from "../../components/titlebar/titlebar";
import { invoke } from "@tauri-apps/api";
import {
  IApiSettings,
  ILoggingSettings,
  IServer
} from "../../interfaces/IServer";
import SideMenu from "../../components/sideMenu/sideMenu";
import ErrorToast from "../../components/toast/errorToast";

export default function ServerSettings() {
  const [configData, setConfigData] = useState<IServer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentSetting, setCurrentSetting] = useState("API Setting"); // Initially show the "API Setting" component
  const [loggingSettings, setLoggingSettings] = useState<ILoggingSettings>({
    logLevel: configData?.logLevel || "info",
    logDestinations: configData?.logDestinations || ["stdout"],
    logFile: configData?.logFile || "mediamtx.log"
  });
  const [apiSettings, setApiSettings] = useState<IApiSettings>({
    api: configData?.api || true,
    apiAddress: configData?.apiAddress || "127.0.0.1:9997",
    metrics: configData?.metrics || false,
    metricsAddress: configData?.metricsAddress || "127.0.0.1:9998",
    pprof: configData?.pprof || false,
    pprofAddress: configData?.pprofAddress || "127.0.0.1:9999",
    runOnConnect: configData?.runOnConnect || "",
    runOnConnectRestart: configData?.runOnConnectRestart || false
  });

  useEffect(() => {
    setError(null);
    const serverUrl = "http://127.0.0.1:9997/v2/config/get"; // Replace with your actual URL
    invoke("get_server_config_options", { url: serverUrl })
      .then((response: string) => {
        const parsedResponse: IServer = JSON.parse(response);
        setConfigData(parsedResponse);
      })

      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("Error:", error);
        setError(error);
      });
  }, []);
  const menuItems = [
    { label: "API Setting" },
    { label: "HLS Setting" },
    { label: "Logging Setting" }
  ];

  async function handleDismissErrorToast() {
    setError(null);
  }

  return (
    <>
      <Titlebar />
      <div className="flex flex-col h-screen">
        <div className="flex">
          <div className="w-1/4 mx-auto absolute h-full">
            <SideMenu
              menuItems={menuItems}
              onMenuItemClick={(menuItem) => setCurrentSetting(menuItem.label)}
            />
          </div>
        </div>
        <h1>Settings</h1>

        {/* Conditionally render the selected setting component */}
        {currentSetting === "API Setting" && (
          <ApiSetting
            settings={apiSettings}
            onSave={(updatedApiSettings) => setApiSettings(updatedApiSettings)}
          />
        )}

        {currentSetting === "Logging Setting" && (
          <LoggingSetting
            settings={loggingSettings}
            onSave={(updatedLoggingSettings) =>
              setLoggingSettings(updatedLoggingSettings)
            }
          />
        )}
      </div>
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
