import {useState } from "react";

import SideMenu from "../components/sideMenu/sideMenu";
import Toast from "../components/toast/Toast";
import RtspServerInfo from "./ServerInfoView/RtspServerInfo";
import { createPortal } from "react-dom";
import Titlebar from "../components/titlebar/titlebar";
import RtmpConnInfo from "./ServerInfoView/RtmpServerInfo";
import HLsConnInfo from "./ServerInfoView/HlsServerInfo";
export default function ServerInfo() {
    const [error, setError] = useState<string | null>(null);
    const [currentSetting, setCurrentSetting] = useState("RTSP"); // Initially show the "API Setting" component

    const menuItems = [
        { label: "HLS" },
        { label: "RTSP" },
        { label: "RTMP" },
        { label: "WebRTC" },
        { label: "SRT" }
    ].sort((a, b) => a.label.localeCompare(b.label));

    function handleDismissErrorToast() {
        setError(null);
    }

    return (
        <>
             {createPortal(<Titlebar/> , document.getElementById("titlebar")!)}
            <div className="flex flex-col  h-screen">
                <div className="flex">
                    <div className="w-1/4 mx-auto fixed  h-full">
                        <SideMenu
                            menuItems={menuItems}
                            onMenuItemClick={(menuItem) =>
                                setCurrentSetting(menuItem.label)
                            }
                        />
                    </div>
                    <div className="w-3/4 mx-auto mt-4 mr-24">
                        <div className="mx-auto mt-24">
                            {currentSetting === "RTSP" && <RtspServerInfo />}
                        </div>
                        <div className="mx-auto mt-24">
                            {currentSetting === "RTMP" && <RtmpConnInfo />}
                        </div>
                        <div className="mx-auto mt-24">
                            {currentSetting === "HLS" && <HLsConnInfo />}
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
                </div>
            </div>
        </>
    );
}
