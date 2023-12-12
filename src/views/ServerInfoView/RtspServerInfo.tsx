import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import { invoke } from "@tauri-apps/api";
import ListView from "../../components/ListBox/listView";
import useServerData from "../../utils/hooks/ServerData";

export default function RtspServerInfo() {
    const [items, setItems] = useState<any[]>([]);
    const  {apiIp} = useServerData();
    useEffect(() => {
        getAllRtspSessions();
    }, []);

    async function getAllRtspSessions() {
        try {
            const response = await invoke("get_server_request", {
                url: `http://${apiIp}/v3/rtspsessions/list`
            });
            const parsedResponse = JSON.parse(response.toString());
            if (parsedResponse && parsedResponse.items) {
                setItems(parsedResponse.items);
            } else {
                console.error("Response does not contain 'items'.");
            }
        } catch (error) {
            console.error("Error fetching RTSP sessions:", error);
        }
    }

    async function kickRstpSession(valueToSend: string) {
        try {
            await invoke("post_server_request", {
                url: `http://${apiIp}/v3/rtspsessions/kick/`,
                value: valueToSend
            });

            // Delay for a short period to allow the server to process the kick
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Update the UI by fetching the updated list of sessions
            getAllRtspSessions();
        } catch (error) {
            console.error("Error kicking RTSP session:", error);
        }
    }

    return (
        <motion.div
            className="w-3/4 overscroll-contain mx-auto flex  flex-co justify-center items-start"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="mt-4 mb-2">
                <h2 className=" mx-auto mb-10  text-center font-bold text-3xl">
                    RTSP Sessions
                </h2>
                <ListView
                    fetchData={items}
                    canDelete={true}
                    DeleteFunc={kickRstpSession}
                />
            </div>
        </motion.div>
    );
}
