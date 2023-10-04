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

import axios from "axios";

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
    const serverUrl = "http://10.4.1.205:9997/v2/config/get";
    invoke("get_server_config_options", { url: serverUrl })
      .then((response: string) => {
        const parsedResponse: IServer = JSON.parse(response);
        setConfigData(parsedResponse);
        console.log(parsedResponse);
      })

      .catch(() => {
        setError(
          "Unable to connect to the server. Please check your connection."
        );
      });
  }, []);
  const new_config = {
    logLevel: "info",
    logDestinations: ["stdout"],
    logFile: "mediamtx.log",
    readTimeout: "10s",
    writeTimeout: "10s",
    readBufferCount: 512,
    udpMaxPayloadSize: 1472,
    externalAuthenticationURL: "",
    api: true,
    apiAddress: "127.0.0.1:9997",
    metrics: true,
    metricsAddress: "127.0.0.1:9998",
    pprof: false,
    pprofAddress: "127.0.0.1:9999",
    runOnConnect: "",
    runOnConnectRestart: false,
    rtsp: true,
    rtspDisable: false,
    protocols: ["multicast", "tcp", "udp"],
    encryption: "no",
    rtspAddress: ":8554",
    rtspsAddress: ":8322",
    rtpAddress: ":8000",
    rtcpAddress: ":8001",
    multicastIPRange: "224.1.0.0/16",
    multicastRTPPort: 8002,
    multicastRTCPPort: 8003
  };

  async function i() {
    await invoke("post_server_config_options", {
      configData: new_config,
      url: "http://10.4.1.205:9997/v2/config/set"
    })
      .then((response: string) => {
        const parsedResponse: IServer = JSON.parse(response);
        setConfigData(parsedResponse);
        console.log(parsedResponse);
      })
      .catch(() => {
        setError(
          "Unable to connect to the server. Please check your connection."
        );
      });
  }

  const updateConfigDataWithProtocol = (fieldName: string, newValue: any) => {
    if (configData) {
      // Create a new configuration object with the updated field
      const updatedConfigData = {
        ...configData,
        [fieldName]: newValue
      };

      fetch("http://127.0.0.1:9997/v2/config/set", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedConfigData)
      })
        .then((response) => response.json())
        .then((parsedResponse: IServer) => {
          console.log(parsedResponse);
          setConfigData(parsedResponse);
          console.log(parsedResponse);
        })
        .catch((error) => {
          setError(
            "Unable to connect to the server. Please check your connection."
          );
          console.error(error);
        });
    }
  };

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

  async function testapi() {
    const api_url = "http://10.4.1.205:9997/v2/config/set";

    const headers = {
      "Allow-Access-Control-Origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    // New configuration data
    const new_config = {
      logLevel: "info",
      logDestinations: ["stdout"],
      logFile: "mediamtx.log",
      readTimeout: "10s",
      writeTimeout: "10s",
      readBufferCount: 512,
      udpMaxPayloadSize: 1472,
      externalAuthenticationURL: "",
      api: true,
      apiAddress: "127.0.0.1:9997",
      metrics: true,
      metricsAddress: "127.0.0.1:9998",
      pprof: false,
      pprofAddress: "127.0.0.1:9999",
      runOnConnect: "",
      runOnConnectRestart: false,
      rtsp: true,
      rtspDisable: false,
      protocols: ["multicast", "tcp", "udp"],
      encryption: "no",
      rtspAddress: ":8554",
      rtspsAddress: ":8322",
      rtpAddress: ":8000",
      rtcpAddress: ":8001",
      multicastIPRange: "224.1.0.0/16",
      multicastRTPPort: 8002,
      multicastRTCPPort: 8003
      // Add other configuration options and values as needed
    };

    // Make a POST request to update the configuration
    const response = await window.fetch(api_url, {
      method: "POST",
      headers,
      body: JSON.stringify(new_config)
    });

    const { data, errors } = await response.json();
    console.log(data);
    console.log(errors);
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
                onSave={(updatedApiSettings) => {
                  setApiSettings(updatedApiSettings);
                  i();
                }}
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => i()}
          ></button>
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
