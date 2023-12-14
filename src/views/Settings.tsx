import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { createPortal } from "react-dom";
import SuccessAlert from "../components/alert/sucessAlert";
import Titlebar from "../components/titlebar/titlebar";
import SideMenu from "../components/sideMenu/sideMenu";
import Notification from "../components/notification/notification";
import useServerData from "../utils/hooks/ServerData";
import ApiSetting from "./serverSetting/ApiSetting";
import HlsSetting from "./serverSetting/hlsSetting";
import RtspSetting from "./serverSetting/RtspSetting";
import LoggingSetting from "./serverSetting/LoggingSetting";
import GeneralSetting from "./appSetting/appSetting";
import WebrtcSetting from "./serverSetting/webrtcSetting";
import RtmpSetting from "./serverSetting/RtmpSetting";
import SrtSetting from "./serverSetting/SrtSetting";
import RecordSetting from "./serverSetting/RecordSetting";
import { ISettings } from "../interfaces/IServer";
function getDefaultSettings(configData ): ISettings {
    configData = configData || {};
    return {
        apiSettings: {  
            api: configData?.api || true,
            metrics: configData?.metrics || false,
            metricsAddress: configData?.metricsAddress || "127.0.0.1:9998",
            pprof: configData?.pprof || false,
            pprofAddress: configData?.pprofAddress || "127.0.0.1:9999",
            runOnConnect: configData?.runOnConnect || "",
            runOnConnectRestart: configData?.runOnConnectRestart || false },
        loggingSettings: {logLevel: configData?.logLevel || "info",
        logDestinations: configData?.logDestinations || ["stdout"],
        logFile: configData?.logFile || "mediamtx.log" },
        hlsSettings: {  hls: configData?.hls || true,
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
            hlsVariant: configData?.hlsVariant || "lowLatency"},
        rtspSettings: {  rtsp: configData?.rtsp || true,
            rtspDisable: configData?.rtspDisable || false,
            protocols: configData?.protocols || ["multicast", "tcp", "udp"],
            encryption: configData?.encryption || "no",
            rtspAddress: configData?.rtspAddress || ":8554",
            rtspsAddress: configData?.rtspsAddress || ":8322",
            rtpAddress: configData?.rtpAddress || ":8000",
            rtcpAddress: configData?.rtcpAddress || ":8001",
            multicastIPRange: configData?.multicastIPRange || "224.1.0.0/16",
            multicastRTPPort: configData?.multicastRTPPort || 8002,
            multicastRTCPPort: configData?.multicastRTCPPort || 8003 },
        rtmpSettings: {   rtmp: configData?.rtmp || true,
            rtmpAddress: configData?.rtmpAddress || ":1935",
            rtmpEncryption: configData?.rtmpEncryption || "no",
            rtmpsAddress: configData?.rtmpsAddress || ":1936",
            rtmpServerKey: configData?.rtmpServerKey || "server.key",
            rtmpServerCert: configData?.rtmpServerCert || "server.crt" },
        srtSettings: { srt: configData?.srt || true,
            srtAddress: configData?.srtAddress || ":8890"},
        webrtcSettings: {  webrtc: configData?.webrtc || true,
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
            webrtcICETCPMuxAddress: configData?.webrtcICETCPMuxAddress || ""},
        recordSettings: {   record: configData?.record || false,
            recordPath: configData?.recordPath || "",
            recordFormat: configData?.recordFormat || "fmp4",
            recordPartDuration: configData?.recordPartDuration || "200ms",
            recordSegmentDuration: configData?.recordSegmentDuration || "1h",
            recordDeleteAfter: configData?.recordDeleteAfter || "24h" },
    };
}
export default function Setting() {
    const [saveButtonPressed, setSaveButtonPressed] = useState(false);
    const { configData} = useServerData();
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [currentSetting, setCurrentSetting] = useState("General Setting");
    const [settings, setSettings] = useState(getDefaultSettings(null));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiIpValue = await getApiIp();
                setError(null);

                const serverUrl = `http://${apiIpValue}/v3/config/global/get`;
                const response = await invoke("get_server_request", { url: serverUrl });
                const parsedResponse = JSON.parse(response.toString());

                // Make sure parsedResponse is an object before using it
                if (parsedResponse && typeof parsedResponse === "object") {
                    const defaultSettings = getDefaultSettings(configData);
                    const updatedSettings = { ...defaultSettings, ...parsedResponse };
                    setSettings(updatedSettings);
                    updateStateAndHandleActions(parsedResponse);
                } else {
                    setError("Invalid response format");
                }
            } catch (e) {
                setError(e.message);
            }
        };

        fetchData();
    }, [configData]);
    async function getApiIp() {
        try {
            const res = await invoke("get_api_ip");
            console.log("apiIp:", res.toString().replace(/^"(.*)"$/, "$1"));
            return res.toString().replace(/^"(.*)"$/, "$1");
        } catch (e) {
            console.log(e);
            return "unable to get API Ip address.";
        }
    }
   




        function updateStateAndHandleActions(parsedResponse: ISettings): void {
            setSettings((prevSettings) => {
                const updatedSettings: ISettings = {
                    apiSettings: { ...prevSettings.apiSettings, ...parsedResponse.apiSettings },
                    loggingSettings: { ...prevSettings.loggingSettings, ...parsedResponse.loggingSettings },
                    hlsSettings: { ...prevSettings.hlsSettings, ...parsedResponse.hlsSettings },
                    rtspSettings: { ...prevSettings.rtspSettings, ...parsedResponse.rtspSettings },
                    rtmpSettings: { ...prevSettings.rtmpSettings, ...parsedResponse.rtmpSettings },
                    srtSettings: { ...prevSettings.srtSettings, ...parsedResponse.srtSettings },
                    webrtcSettings: { ...prevSettings.webrtcSettings, ...parsedResponse.webrtcSettings },
                    recordSettings: { ...prevSettings.recordSettings, ...parsedResponse.recordSettings },
                };
        
                return updatedSettings;
            });
           
             

  
  
    
        


            const apiIpValue =  getApiIp();
            invoke("save_api_ip", { apiIp: apiIpValue }).then((res) => {
                console.log("save api: " + res);
            });
    }

   async function patchSetting(PatchData) {
    try {
        const apiIpValue = await getApiIp(); // call it as a function
        console.log("apiIpInPatch:", apiIpValue);

        if (!PatchData) {
            setError("ConfigData is empty.");
            return;
        }

        const serverUrl = `http://${apiIpValue}/v3/config/global/patch`;
        const response = await invoke("patch_server_request", {
            configData: PatchData,
            url: serverUrl
        });
        const parsedResponse = JSON.parse(response as string);
        if (parsedResponse && parsedResponse.error) {
            throw(parsedResponse.error);
        } else {
            // Handle common actions
            updateStateAndHandleActions(PatchData);
            setSaveButtonPressed(true);
            setSuccessMessage("Settings saved successfully");
        }
    } catch (error) {
       
        setError("Error: "+JSON.parse(error)["error"]); 
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
        { label: "SRT Setting" },
        { label: "Record Setting" }
    ].sort((a, b) => a.label.localeCompare(b.label));

    function handleDismissErrorToast() {
        setError(null);
    }

    function handleCloseAlert(): void {
        setSaveButtonPressed(false);
        setSuccessMessage("");
    }

    const settingsComponents = {
        "General Setting": <GeneralSetting />,
        "API Setting": (
            <ApiSetting
                settings={settings.apiSettings}
                onSave={(updatedApiSettings) => setSettings({ ...settings, apiSettings: updatedApiSettings })}
                patchSetting={patchSetting}
            />
        ),
        "Logging Setting": (
            <LoggingSetting
                settings={settings.loggingSettings}
                onSave={(updatedLoggingSettings) => setSettings({ ...settings, loggingSettings: updatedLoggingSettings })}
                patchSetting={patchSetting}
            />
        ),
        "HLS Setting": (
            <HlsSetting
                settings={settings.hlsSettings}
                onSave={(updatedHlsSettings) => setSettings({ ...settings, hlsSettings: updatedHlsSettings })}
                patchSetting={patchSetting}
            />
        ),
        "RTSP Setting": (
            <RtspSetting
                settings={settings.rtspSettings}
                onSave={(updatedRtspSettings) => setSettings({ ...settings, rtspSettings: updatedRtspSettings })}
                patchSetting={patchSetting}
            />
        ),
        "RTMP Setting": (
            <RtmpSetting
                settings={settings.rtmpSettings}
                onSave={(updatedRtmpSettings) => setSettings({ ...settings, rtmpSettings: updatedRtmpSettings })}
                patchSetting={patchSetting}
            />
        ),
        "SRT Setting": (
            <SrtSetting
                settings={settings.srtSettings}
                onSave={(updatedSrtSettings) => setSettings({ ...settings, srtSettings: updatedSrtSettings })}
                patchSetting={patchSetting}
            />
        ),
        "WebRTC Setting": (
            <WebrtcSetting
                settings={settings.webrtcSettings}
                onSave={(updatedWebRtcSettings) => setSettings({ ...settings, webrtcSettings: updatedWebRtcSettings })}
                patchSetting={patchSetting}
            />
        ),
        "Record Setting": (
            <RecordSetting
                settings={settings.recordSettings}
                onSave={(updatedRecordSettings) => setSettings({ ...settings, recordSettings: updatedRecordSettings })}
                patchSetting={patchSetting}
            />
        ),
    };

    return (
        <>
            {createPortal(<Titlebar />, document.getElementById("titlebar")!)}

            <div className="grid  relative w-full overflow-hidden grid-cols-12 ">
                <div className=" col-span-2  pt-10 ">
                    <SideMenu
                        menuItems={menuItems}
                        onMenuItemClick={(menuItem) => setCurrentSetting(menuItem.label)}
                    />
                </div>

                <div className="my-8 py-3.5 row-start-1  row-end-2 w-full col-start-4 col-span-9 h-full   ">
                    <div className="mx-auto z-auto my-auto ">
                        {saveButtonPressed && successMessage && (
                            <SuccessAlert
                                message={successMessage}
                                OnClose={handleCloseAlert}
                                timer={5000}
                            />
                        )}

                        {/* Render settings based on the current setting */}
                        {settingsComponents[currentSetting]}

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
