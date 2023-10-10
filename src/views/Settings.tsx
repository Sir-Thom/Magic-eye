import { useEffect, useState } from "react";
import ApiSetting from "./serverSetting/ApiSetting";
import HlsSetting from "./serverSetting/hlsSetting";
import RtspSetting from "./serverSetting/RtspSetting";
import LoggingSetting from "./serverSetting/LoggingSetting";
import GeneralSetting from "./appSetting/appSetting";
import WebrtcSetting from "./serverSetting/webrtcSetting";
import RtmpSetting from "./serverSetting/RtmpSetting";
import { Titlebar } from "../components/titlebar/titlebar";
import { invoke } from "@tauri-apps/api";
import {
  IApiSettings,
  ILoggingSettings,
  IHlsSettings,
  IServer,
  IRtspSettings,
  IRtmpSettings,
  IWebrtcSettings,
  ISrtSettings
} from "../interfaces/IServer";
import SideMenu from "../components/sideMenu/sideMenu";
import Toast from "../components/toast/Toast";
import SrtSetting from "./serverSetting/SrtSetting";
import SuccessAlert from "../components/alert/sucessAlert";
export default function Setting() {
  const [configData, setConfigData] = useState<IServer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
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

  const [rtspSettings, setRtspSettings] = useState<IRtspSettings>({
    rtsp: configData?.rtsp || true,
    rtspDisable: configData?.rtspDisable || false,
    protocols: configData?.protocols || ["multicast", "tcp", "udp"],
    encryption: configData?.encryption || "no",
    rtspAddress: configData?.rtspAddress || ":8554",
    rtspsAddress: configData?.rtspsAddress || ":8322",
    rtpAddress: configData?.rtpAddress || ":8000",
    rtcpAddress: configData?.rtcpAddress || ":8001",
    multicastIPRange: configData?.multicastIPRange || "224.1.0.0/16",
    multicastRTPPort: configData?.multicastRTPPort || 8002,
    multicastRTCPPort: configData?.multicastRTCPPort || 8003
  });

  const [webrtcSettings, setWebrtcSettings] = useState<IWebrtcSettings>({
    webrtc: configData?.webrtc || true,
    webrtcAddress: configData?.webrtcAddress || ":8080",
    webrtcDisable: configData?.webrtcDisable || false,
    webrtcEncryption: configData?.webrtcEncryption || false,
    webrtcServerKey: configData?.webrtcServerKey || "server.key",
    webrtcServerCert: configData?.webrtcServerCert || "server.crt",
    webrtcAllowOrigin: configData?.webrtcAllowOrigin || "*",
    webrtcTrustedProxies: configData?.webrtcTrustedProxies || [],
    webrtcICEServers: configData?.webrtcICEServers || null,
    webrtcICEServers2: configData?.webrtcICEServers2 || null,
    webrtcICEHostNAT1To1IPs: configData?.webrtcICEHostNAT1To1IPs || [],
    webrtcICEUDPMuxAddress: configData?.webrtcICEUDPMuxAddress || "",
    webrtcICETCPMuxAddress: configData?.webrtcICETCPMuxAddress || ""
  });

  const [rtmpSettings, setRtmpSettings] = useState<IRtmpSettings>({
    rtmp: configData?.rtmp || true,
    rtmpAddress: configData?.rtmpAddress || ":1935",
    rtmpDisable: configData?.rtmpDisable || false,
    rtmpEncryption: configData?.rtmpEncryption || "no",
    rtmpsAddress: configData?.rtmpsAddress || ":1936",
    rtmpServerKey: configData?.rtmpServerKey || "server.key",
    rtmpServerCert: configData?.rtmpServerCert || "server.crt"
  });

  const [srtSettings, setSrtSettings] = useState<ISrtSettings>({
    srt: configData?.srt || true,
    srtAddress: configData?.srtAddress || ":8890"
  });
  console.log(apiSettings);

  useEffect(() => {
    setError(null);
    const serverUrl = "http://127.0.0.1:9997/v2/config/get";
    invoke("get_server_config_options", { url: serverUrl })
      .then((response: string) => {
        const parsedResponse: IServer = JSON.parse(response);
        setConfigData(parsedResponse);
        console.log("parsed option:" + JSON.stringify(parsedResponse));

        // Update the state variables with the new settings
        setApiSettings({
          api: parsedResponse.api || true,
          apiAddress: parsedResponse.apiAddress || "127.0.0.1:9997",
          metrics: parsedResponse.metrics || false,
          metricsAddress: parsedResponse.metricsAddress || "127.0.0.1:9998",
          pprof: parsedResponse.pprof || false,
          pprofAddress: parsedResponse.pprofAddress || "127.0.0.1:9999",
          runOnConnect: parsedResponse.runOnConnect || "",
          runOnConnectRestart: parsedResponse.runOnConnectRestart || false
        });
        console.log("api setting: " + JSON.stringify(apiSettings));
        setLoggingSettings({
          logLevel: parsedResponse.logLevel || "info",
          logDestinations: parsedResponse.logDestinations || ["stdout"],
          logFile: parsedResponse.logFile || "mediamtx.log"
        });
        console.log("logging setting: " + JSON.stringify(loggingSettings));
        setHlsSettings({
          hls: parsedResponse.hls || true,
          hlsAddress: parsedResponse.hlsAddress || ":8888",
          hlsAllowOrigin: parsedResponse.hlsAllowOrigin || "*",
          hlsAlwaysRemux: parsedResponse.hlsAlwaysRemux || false,
          hlsDirectory: parsedResponse.hlsDirectory || "",
          hlsDisable: parsedResponse.hlsDisable || false,
          hlsEncryption: parsedResponse.hlsEncryption || false,
          hlsPartDuration: parsedResponse.hlsPartDuration || "200ms",
          hlsSegmentCount: parsedResponse.hlsSegmentCount || 7,
          hlsSegmentDuration: parsedResponse.hlsSegmentDuration || "1s",
          hlsSegmentMaxSize: parsedResponse.hlsSegmentMaxSize || "50M",
          hlsServerCert: parsedResponse.hlsServerCert || "server.crt",
          hlsServerKey: parsedResponse.hlsServerKey || "server.key",
          hlsTrustedProxies: parsedResponse.hlsTrustedProxies || [],
          hlsVariant: parsedResponse.hlsVariant || "lowLatency"
        });
        console.log("hls setting: " + JSON.stringify(hlsSettings));
        setRtmpSettings({
          rtmp: parsedResponse.rtmp || true,
          rtmpAddress: parsedResponse.rtmpAddress || ":1935",
          rtmpDisable: parsedResponse.rtmpDisable || false,
          rtmpEncryption: parsedResponse.rtmpEncryption || "no",
          rtmpsAddress: parsedResponse.rtmpsAddress || ":1936",
          rtmpServerKey: parsedResponse.rtmpServerKey || "server.key",
          rtmpServerCert: parsedResponse.rtmpServerCert || "server.crt"
        });
        console.log("rtmp setting: " + JSON.stringify(rtmpSettings));
        setRtspSettings({
          rtsp: parsedResponse.rtsp || true,
          rtspDisable: parsedResponse.rtspDisable || false,
          protocols: parsedResponse.protocols || ["multicast", "tcp", "udp"],
          encryption: parsedResponse.encryption || "no",
          rtspAddress: parsedResponse.rtspAddress || ":8554",
          rtspsAddress: parsedResponse.rtspsAddress || ":8322",
          rtpAddress: parsedResponse.rtpAddress || ":8000",
          rtcpAddress: parsedResponse.rtcpAddress || ":8001",
          multicastIPRange: parsedResponse.multicastIPRange || "224.1.0.0/16",
          multicastRTPPort: parsedResponse.multicastRTPPort || 8002,
          multicastRTCPPort: parsedResponse.multicastRTCPPort || 8003
        });
        console.log("rtsp setting: " + JSON.stringify(rtspSettings));
      })

      .catch((e) => {
        setError(
          "Unable to connect to the server. Please check your connection. " +
            e.message
        );
      });
  }, []);

  async function postSetting(configData) {
    try {
      if (configData == null) {
        throw new Error("the configuation data is empty");
      }
      await invoke("post_server_config_options", {
        configData: configData,
        url: "http://127.0.0.1:9997/v2/config/set"
      }).then((response: string) => {
        const parsedResponse: IServer = JSON.parse(response);
        console.log("parsed option in post:" + JSON.stringify(parsedResponse));
        setConfigData(parsedResponse);
        setSuccessMessage("Settings saved successfully");
        // get the updated config
        const serverUrl = "http://127.0.0.1:9997/v2/config/get";
        invoke("get_server_config_options", { url: serverUrl }).then(
          (response: string) => {
            const parsedResponse: IServer = JSON.parse(response);
            console.log(parsedResponse.metrics);
            setConfigData(parsedResponse);
            console.log("new parsed option:" + JSON.stringify(parsedResponse));
          }
        );
      });
    } catch (e) {
      setError(
        "Unable to connect to the server. Please check your connection." +
          e.message
      );
    }
  }

  const menuItems = [
    { label: "API Setting" },
    { label: "HLS Setting" },
    { label: "RTSP Setting" },
    { label: "Logging Setting" },
    { label: "General Setting" },
    { label: "RTMP Setting" },
    { label: "WebRTC Setting" },
    { label: "SRT Setting" }
  ].sort((a, b) => a.label.localeCompare(b.label));

  async function handleDismissErrorToast() {
    setError(null);
  }

  function handleCloseAlert(): void {
    setSuccessMessage("");
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
            <div className="mt-24">
              {successMessage && (
                <SuccessAlert
                  message={successMessage}
                  OnClose={handleCloseAlert}
                  timer={5000}
                />
              )}
              {currentSetting === "General Setting" && <GeneralSetting />}
              {currentSetting === "API Setting" && (
                <ApiSetting
                  settings={apiSettings}
                  onSave={(updatedApiSettings) => {
                    setApiSettings(updatedApiSettings);
                    console.log(
                      "updated api setting: " +
                        JSON.stringify(updatedApiSettings)
                    );
                  }}
                  postSetting={postSetting}
                />
              )}
              {currentSetting === "Logging Setting" && (
                <LoggingSetting
                  settings={loggingSettings}
                  onSave={(updatedLoggingSettings) =>
                    setLoggingSettings(updatedLoggingSettings)
                  }
                  postSetting={postSetting}
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
              {currentSetting === "RTMP Setting" && (
                <RtmpSetting
                  settings={rtmpSettings}
                  onSave={(updatedRtmpSettings) =>
                    setRtmpSettings(updatedRtmpSettings)
                  }
                />
              )}
              {currentSetting === "SRT Setting" && (
                <SrtSetting
                  settings={srtSettings}
                  onSave={(updatedSrtSettings) =>
                    setSrtSettings(updatedSrtSettings)
                  }
                />
              )}
              {currentSetting === "WebRTC Setting" && (
                <WebrtcSetting
                  settings={webrtcSettings}
                  onSave={(updatWebRtcSettings) =>
                    setWebrtcSettings(updatWebRtcSettings)
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
      </div>
    </>
  );
}
