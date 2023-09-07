import { useEffect, useState } from "react";
import ApiSetting from "./serverSetting/ApiSetting";
import HlsSetting from "./serverSetting/hlsSetting";
import RtspSetting from "./serverSetting/RtspSetting";
import LoggingSetting from "./serverSetting/LoggingSetting";
import GeneralSetting from "./appSetting/appSetting";
import { Titlebar } from "../components/titlebar/titlebar";
import { invoke } from "@tauri-apps/api";
import {
  IApiSettings,
  ILoggingSettings,
  IHlsSettings,
  IServer
} from "../interfaces/IServer";
import SideMenu from "../components/sideMenu/sideMenu";
import Toast from "../components/toast/Toast";

export default function Setting() {
  const [configData, setConfigData] = useState<IServer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentSetting, setCurrentSetting] = useState("General Setting"); // Initially show the "API Setting" component
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
  const [hlsSettings, setHlsSettings] = useState<IHlsSettings>({
    hls: configData?.hls || true,
    hlsAddress: configData?.hlsAddress || ":8888",
    hlsAllowOrigin: configData?.hlsAllowOrigin || "*",
    hlsAlwaysRemux: configData?.hlsAlwaysRemux || false,
    hlsDirectory: configData?.hlsDirectory || "",
    hlsDisable: configData?.hlsDisable || false,
    hlsEncryption: configData?.hlsEncryption || false,
    hlsPartDuration: configData?.hlsPartDuration || "200ms",
    hlsSegmentCount: configData?.hlsSegmentCount || 7,
    hlsSegmentDuration: configData?.hlsSegmentDuration || "1s",
    hlsSegmentMaxSize: configData?.hlsSegmentMaxSize || "50M",
    hlsServerCert: configData?.hlsServerCert || "server.crt",
    hlsServerKey: configData?.hlsServerKey || "server.key",
    hlsTrustedProxies: configData?.hlsTrustedProxies || [],
    hlsVariant: configData?.hlsVariant || "lowLatency"
  });

  const [rtspSettings, setRtspSettings] = useState({
    rtsp: configData?.rtsp || true,
    rtspDisable: configData?.rtspDisable || false,
    protocols: configData?.protocols || ["multicast", "tcp", "udp"],
    encryption: configData?.encryption || false,
    rtspAddress: configData?.rtspAddress || ":8554",
    rtspsAddress: configData?.rtspsAddress || ":8322",
    rtpAddress: configData?.rtpAddress || ":8000",
    rtcpAddress: configData?.rtcpAddress || ":8001",
    multicastIPRange: configData?.multicastIPRange || "224.1.0.0/16",
    multicastRTPPort: configData?.multicastRTPPort || 8002,
    multicastRTCPPort: configData?.multicastRTCPPort || 8003
  });
  useEffect(() => {
    setError(null);
    const serverUrl = "http://127.0.0.1:9997/v2/config/get";
    invoke("get_server_config_options", { url: serverUrl })
      .then((response: string) => {
        const parsedResponse: IServer = JSON.parse(response);
        setConfigData(parsedResponse);
      })
      .catch(() => {
        setError(
          "Unable to connect to the server. Please check your connection."
        );
      });
  }, []);
  const menuItems = [
    { label: "API Setting" },
    { label: "HLS Setting" },
    { label: "RTSP Setting" },
    { label: "Logging Setting" },
    { label: "General Setting" }
  ].sort((a, b) => a.label.localeCompare(b.label));

  async function handleDismissErrorToast() {
    setError(null);
  }

  return (
    <>
      <Titlebar />
      <div className="flex flex-col  h-screen">
        <div className="flex">
          <div className="w-1/4 mx-auto  h-full">
            <SideMenu
              menuItems={menuItems}
              onMenuItemClick={(menuItem) => setCurrentSetting(menuItem.label)}
            />
          </div>
          <div className="w-3/4 mt-6 mr-24">
            {currentSetting === "General Setting" && <GeneralSetting />}
            {currentSetting === "API Setting" && (
              <ApiSetting
                settings={apiSettings}
                onSave={(updatedApiSettings) =>
                  setApiSettings(updatedApiSettings)
                }
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
            {currentSetting === "HLS Setting" && (
              <HlsSetting
                settings={hlsSettings}
                onSave={(updatedHlsSettings) =>
                  setHlsSettings(updatedHlsSettings)
                }
              />
            )}
            {currentSetting === "RTSP Setting" && (
              <RtspSetting
                settings={rtspSettings}
                onSave={(updatedRtspSettings) =>
                  setRtspSettings(updatedRtspSettings)
                }
              />
            )}
          </div>
        </div>
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
