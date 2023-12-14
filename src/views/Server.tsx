import { useState } from "react";
import SideMenu from "../components/sideMenu/sideMenu";
import RtspServerInfo from "./ServerInfoView/RtspServerInfo";
import { createPortal } from "react-dom";
import Titlebar from "../components/titlebar/titlebar";
import RtmpConnInfo from "./ServerInfoView/RtmpServerInfo";
import HLsConnInfo from "./ServerInfoView/HlsServerInfo";
import Notification from "../components/notification/notification";

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

    function handleDismissErrorNotification() {
        setError(null);
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
                        {currentSetting === "RTSP" && <RtspServerInfo />}

                        {currentSetting === "RTMP" && <RtmpConnInfo />}

                        {currentSetting === "HLS" && <HLsConnInfo />}
                    </div>
                </div>
            </div>
            {error && (
                <Notification
                    message={error}
                    timer={5000}
                    type={"error"}
                    onDismiss={handleDismissErrorNotification}
                />
            )}
        </>
    );
}
