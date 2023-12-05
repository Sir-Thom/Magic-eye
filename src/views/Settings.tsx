import {
    useEffect,
    useState,
} from "react";
import {
    IApiSettings,
    ILoggingSettings,
    IHlsSettings,
    IServer,
    IRtspSettings,
    IRtmpSettings,
    IWebrtcSettings,
    ISrtSettings,
    IRecordSettings,
} from "../interfaces/IServer";
import {
    invoke,
 } from "@tauri-apps/api";
import { createPortal } from "react-dom";
import ApiSetting from "./serverSetting/ApiSetting";
import HlsSetting from "./serverSetting/hlsSetting";
import RtspSetting from "./serverSetting/RtspSetting";
import LoggingSetting from "./serverSetting/LoggingSetting";
import GeneralSetting from "./appSetting/appSetting";
import WebrtcSetting from "./serverSetting/webrtcSetting";
import RtmpSetting from "./serverSetting/RtmpSetting";
import SrtSetting from "./serverSetting/SrtSetting";
import SuccessAlert from "../components/alert/sucessAlert";
import RecordSetting from "./serverSetting/RecordSetting";
import Titlebar from "../components/titlebar/titlebar";
import SideMenu from "../components/sideMenu/sideMenu";
import Notification from "../components/notification/notification";
import useServerData from "../utils/hooks/ServerData";


export default function Setting() {
    const { configData, serverError } = useServerData();
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
        rtmpEncryption: configData?.rtmpEncryption || "no",
        rtmpsAddress: configData?.rtmpsAddress || ":1936",
        rtmpServerKey: configData?.rtmpServerKey || "server.key",
        rtmpServerCert: configData?.rtmpServerCert || "server.crt"
    });

    const [srtSettings, setSrtSettings] = useState<ISrtSettings>({
        srt: configData?.srt || true,
        srtAddress: configData?.srtAddress || ":8890"
    });

    const [recordSettings, setRecordSettings] = useState<IRecordSettings>({
        record: configData?.record || true,
        recordPath: configData?.recordPath || "",
        recordFormat: configData?.recordFormat || "mp4",
        recordPartDuration: configData?.recordPartDuration || "200ms",
        recordSegmentDuration: configData?.recordSegmentDuration || "1h",
        recordDeleteAfter: configData?.recordDeleteAfter || "24h"
    });
    

    console.log(webrtcSettings);
    const [/*apiIp,*/, setApiIp] = useState<string>("");
    async function GetApiIp() {
        try {
            const res = await invoke("get_api_ip");
            const apiIp = res.toString();
            console.log("API Setting from function: " + apiIp);
            setApiIp(apiIp);
            return apiIp;
        } catch (e) {
            console.log(e);
            return "unable to get API Ip adress."; 
        }
    }
    useEffect(() => {
        setError(serverError); // Set error from the serverData hook
      }, [serverError]);
    
    useEffect(() => {
        
        const fetchData = async () => {
            const apiIpValue = await GetApiIp();
            setError(null);

            console.log("API Setting from useEffect: " + apiIpValue);

            console.log("API Setting from useEffect: " + apiIpValue);

            const serverUrl = `http://${apiIpValue}/v3/config/global/get`;
            console.log("serverUrl: " + serverUrl);
            invoke("get_server_request", { url: serverUrl })
                .then((response: string) => {
                    const parsedResponse: IServer = JSON.parse(response);
                    
                    console.log(
                        "parsed option:" + JSON.stringify(parsedResponse)
                    );
                    
                    // destructuring the parsedResponse
                    const {
                        api,
                        metrics,
                        metricsAddress,
                        pprof,
                        pprofAddress,
                        runOnConnect,
                        runOnConnectRestart,
                        logLevel,
                        logDestinations,
                        logFile,
                        hls,
                        hlsAddress,
                        hlsAllowOrigin,
                        hlsAlwaysRemux,
                        hlsDirectory,
                        hlsDisable,
                        hlsEncryption,
                        hlsPartDuration,
                        hlsSegmentCount,
                        hlsSegmentDuration,
                        hlsSegmentMaxSize,
                        hlsServerCert,
                        hlsServerKey,
                        hlsTrustedProxies,
                        hlsVariant,
                        rtsp,
                        rtspDisable,
                        protocols,
                        encryption,
                        rtspAddress,
                        rtspsAddress,
                        rtpAddress,
                        rtcpAddress,
                        multicastIPRange,
                        multicastRTPPort,
                        multicastRTCPPort,
                        webrtc,
                        webrtcAddress,
                        webrtcEncryption,
                        webrtcServerKey,
                        webrtcServerCert,
                        webrtcAllowOrigin,
                        webrtcTrustedProxies,
                        webrtcICEServers,
                        webrtcICEServers2,
                        webrtcICEHostNAT1To1IPs,
                        webrtcICEUDPMuxAddress,
                        webrtcICETCPMuxAddress,
                        rtmp,
                        rtmpAddress,
                        rtmpEncryption,
                        rtmpsAddress,
                        rtmpServerKey,
                        rtmpServerCert,
                        srt,
                        srtAddress,
                        record,
                        recordPath,
                        recordFormat,
                        recordPartDuration,
                        recordSegmentDuration,
                        recordDeleteAfter
                    } = parsedResponse;
        
                    // Update the state variables with the new settings
                    setApiSettings({
                        api: api || true,
                        metrics: metrics || false,
                        metricsAddress: metricsAddress || "127.0.0.1:9998",
                        pprof: pprof || false,
                        pprofAddress: pprofAddress || "127.0.0.1:9999",
                        runOnConnect: runOnConnect || "",
                        runOnConnectRestart: runOnConnectRestart || false,
                    });

                    console.log("api setting: " + JSON.stringify(apiSettings));
                    setLoggingSettings({
                        logLevel: logLevel || "info",
                        logDestinations: logDestinations || ["stdout"],
                        logFile: logFile || "mediamtx.log",
                    });
        
                    setHlsSettings({
                        hls: hls || true,
                        hlsAddress: hlsAddress || ":8888",
                        hlsAllowOrigin: hlsAllowOrigin || "*",
                        hlsAlwaysRemux: hlsAlwaysRemux || false,
                        hlsDirectory: hlsDirectory || "",
                        hlsDisable: hlsDisable || false,
                        hlsEncryption: hlsEncryption || false,
                        hlsPartDuration: hlsPartDuration || "200ms",
                        hlsSegmentCount: hlsSegmentCount || 7,
                        hlsSegmentDuration: hlsSegmentDuration || "1s",
                        hlsSegmentMaxSize: hlsSegmentMaxSize || "50M",
                        hlsServerCert: hlsServerCert || "server.crt",
                        hlsServerKey: hlsServerKey || "server.key",
                        hlsTrustedProxies: hlsTrustedProxies || [],
                        hlsVariant: hlsVariant || "lowLatency",
                    });
        
                    setRtmpSettings({
                        rtmp: rtmp || true,
                        rtmpAddress: rtmpAddress || ":1935",
                        rtmpEncryption: rtmpEncryption || "no",
                        rtmpsAddress: rtmpsAddress || ":1936",
                        rtmpServerKey: rtmpServerKey || "server.key",
                        rtmpServerCert: rtmpServerCert || "server.crt",
                    });
        
                    setRtspSettings({
                        rtsp: rtsp || true,
                        rtspDisable: rtspDisable || false,
                        protocols: protocols || ["multicast", "tcp", "udp"],
                        encryption: encryption || "no",
                        rtspAddress: rtspAddress || ":8554",
                        rtspsAddress: rtspsAddress || ":8322",
                        rtpAddress: rtpAddress || ":8000",
                        rtcpAddress: rtcpAddress || ":8001",
                        multicastIPRange: multicastIPRange || "224.1.0.0/16",
                        multicastRTPPort: multicastRTPPort || 8002,
                        multicastRTCPPort: multicastRTCPPort || 8003,
                    });
        
                    setSrtSettings({
                        srt: srt || true,
                        srtAddress: srtAddress || ":8890",
                    });
        
                    setWebrtcSettings({
                        webrtc: webrtc || true,
                        webrtcAddress: webrtcAddress || ":8080",
                        webrtcEncryption: webrtcEncryption || false,
                        webrtcServerKey: webrtcServerKey || "server.key",
                        webrtcServerCert: webrtcServerCert || "server.crt",
                        webrtcAllowOrigin: webrtcAllowOrigin || "*",
                        webrtcTrustedProxies: webrtcTrustedProxies || [],
                        webrtcICEServers: webrtcICEServers || null,
                        webrtcICEServers2: webrtcICEServers2 || null,
                        webrtcICEHostNAT1To1IPs: webrtcICEHostNAT1To1IPs || [],
                        webrtcICEUDPMuxAddress: webrtcICEUDPMuxAddress || "",
                        webrtcICETCPMuxAddress: webrtcICETCPMuxAddress || "",
                    });
        
                    setRecordSettings({
                        record: record || false,
                        recordPath: recordPath || "./recordings/%path/%Y-%m-%d_%H-%M-%S-%f",
                        recordFormat: recordFormat || "fmp4",
                        recordPartDuration: recordPartDuration || "100ms",
                        recordSegmentDuration: recordSegmentDuration || "1h",
                        recordDeleteAfter: recordDeleteAfter || "24h",
                    });
                })

                .catch(() => {
                    setError("Unable to connect to the server.");
                });
        };
        fetchData();
    }, []);

    async function updateStateAndHandleActions(response) {
        const parsedResponse = JSON.parse(response);
    
        // Update the state variables with the new settings
        setApiSettings(parsedResponse.apiSettings);
        setLoggingSettings(parsedResponse.loggingSettings);
        setHlsSettings(parsedResponse.hlsSettings);
        setRtmpSettings(parsedResponse.rtmpSettings);
        setRtspSettings(parsedResponse.rtspSettings);
        setSrtSettings(parsedResponse.srtSettings);
        setWebrtcSettings(parsedResponse.webrtcSettings);
        setRecordSettings(parsedResponse.recordSettings);
    
       // ConfigData(parsedResponse.configData);
        setSuccessMessage("Settings saved successfully");
    
        //Add additional actions here  if needed
        const apiIpValue = await GetApiIp();
        invoke("save_api_ip", { apiIp: apiIpValue }).then((res) => {
            console.log("save api: " + res);
        });
    }

    async function patchSetting(configData) {
        try {
            const apiIpValue = await GetApiIp();
            if (!configData) {
                setError("ConfigData is empty.");
                return;
            }
    
            const serverUrl = `http://${apiIpValue}/v3/config/global/patch`;
            const response = await invoke("patch_server_request", {
                configData: configData,
                url: serverUrl,
            });
    
            // Handle common actions
            await updateStateAndHandleActions(response);
    
        } catch (error) {
            setError("Unable to connect to the server." + error.message);
        }
        console.log("configData: " + JSON.stringify(configData));
    }

    const menuItems = [
        { label: "API Setting" },
        { label: "HLS Setting" },
        { label: "RTSP Setting" },
        { label: "Logging Setting" },
        { label: "General Setting" },
        { label: "RTMP Setting" },
        { label: "WebRTC Setting" },
        { label: "SRT Setting" },
        { label: "Record Setting" }
    ].sort((a, b) => a.label.localeCompare(b.label));

    function handleDismissErrorToast() {
        setError(null);
    }

    function handleCloseAlert(): void {
        setSuccessMessage("");
    }

    return (
        <>
            {createPortal(<Titlebar />, document.getElementById("titlebar")!)}

            <div className="grid  relative w-full overflow-hidden grid-cols-12 ">
                <div className=" col-span-2  pt-10 ">
                    <SideMenu
                        menuItems={menuItems}
                        onMenuItemClick={(menuItem) =>
                            setCurrentSetting(menuItem.label)
                        }
                    />
                </div>

                <div className="my-8 py-3.5 row-start-1  row-end-2 w-full col-start-4 col-span-9 h-full   ">
                    <div className="mx-auto z-auto my-auto ">
                        {successMessage && (
                            <SuccessAlert
                                message={successMessage}
                                OnClose={handleCloseAlert}
                                timer={5000}
                            />
                        )}

                        {currentSetting === "General Setting" && (
                            <GeneralSetting />
                        )}
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
                                patchSetting={patchSetting}
                            />
                        )}
                        {currentSetting === "Logging Setting" && (
                            <LoggingSetting
                                settings={loggingSettings}
                                onSave={(updatedLoggingSettings) =>
                                    setLoggingSettings(updatedLoggingSettings)
                                }
                                patchSetting={patchSetting}
                            />
                        )}
                        {currentSetting === "HLS Setting" && (
                            <HlsSetting
                                settings={hlsSettings}
                                onSave={(updatedHlsSettings) =>
                                    setHlsSettings(updatedHlsSettings)
                                }
                                patchSetting={patchSetting}
                            />
                        )}
                        {currentSetting === "RTSP Setting" && (
                            <RtspSetting
                                settings={rtspSettings}
                                onSave={(updatedRtspSettings) =>
                                    setRtspSettings(updatedRtspSettings)
                                }
                                patchSetting={patchSetting}
                            />
                        )}
                        {currentSetting === "RTMP Setting" && (
                            <RtmpSetting
                                settings={rtmpSettings}
                                onSave={(updatedRtmpSettings) =>
                                    setRtmpSettings(updatedRtmpSettings)
                                }
                                patchSetting={patchSetting}
                            />
                        )}
                        {currentSetting === "SRT Setting" && (
                            <SrtSetting
                                settings={srtSettings}
                                onSave={(updatedSrtSettings) =>
                                    setSrtSettings(updatedSrtSettings)
                                }
                                patchSetting={patchSetting}
                            />
                        )}
                        {currentSetting === "WebRTC Setting" && (
                            <WebrtcSetting
                                settings={webrtcSettings}
                                onSave={(updatWebRtcSettings) =>
                                    setWebrtcSettings(updatWebRtcSettings)
                                }
                                patchSetting={patchSetting}
                            />
                        )}
                        {currentSetting === "Record Setting" && (
                            <RecordSetting
                                settings={recordSettings}
                                onSave={(updatedRecordSettings) =>
                                    setRecordSettings(updatedRecordSettings)
                                }
                                patchSetting={patchSetting}
                            />
                        )}
                    </div>
                </div>
            </div>

            {error && (
                <Notification
                    message={error}
                    timer={5000}
                    type={"error"}
                    onDismiss={handleDismissErrorToast}
                />
            )}
        </>
    );
}
