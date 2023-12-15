import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import { invoke } from "@tauri-apps/api";
import ListView from "../../components/ListBox/listView";
import useServerData from "../../utils/hooks/ServerData";

export default function RtspsConnInfo() {
    const [items, setItems] = useState<any[]>([]);
    const { apiIp,loading } = useServerData();
    useEffect(() => {
        if (!loading) {
            console.log("apiIp:", apiIp);
            getAllRtspsSessions();
        }
    }, [apiIp, loading]);
       // Poll the server for updates
   useEffect(() => {
    const intervalId = setInterval(() => {
        if (!loading) {
            getAllRtspsSessions();
        }
    }, 5000); // Fetch data every 5 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
}, [apiIp, loading]);
  
    async function getAllRtspsSessions() {
        try {
            console.log("apiIp:", apiIp);
            const response = await invoke("get_server_request", {
                url: `http://${apiIp}/v3/rtspssessions/list`
            });
            const parsedResponse = JSON.parse(response.toString());
            if (parsedResponse && parsedResponse.items) {
                setItems(parsedResponse.items);
            } else {
               throw new Error("Response does not contain 'items'.");
            }
        } catch (error) {
            console.error("Error fetching RTSPS sessions:", error);
        }
    }
    

    async function kickRstpsSession(valueToSend: string) {
        try {
            await invoke("post_server_request", {
                url: `http://${apiIp}/v3/rtspssessions/kick/`,
                value: valueToSend
            }).then(() => {
                // Delay for a short period to allow the server to process the kick
                setTimeout(() => {
                    // Update the UI by fetching the updated list of sessions
                    getAllRtspsSessions();
                }, 100);
            }
            );


        } catch (error) {
            console.error("Error kicking RTSP session:", error);
        }
    }

    return (
        <div className="mx-auto  w-full  ">
            <motion.div
                className="w-full  rounded-md"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <h2 className="text-center py-2.5  mx-auto w-full  bg-center bg-window-dark-900 font-bold text-3xl">
                    RTSPS Informations
                </h2>
                <div className="divide-y  w-full divide-window-dark-500">
                    <ListView
                        fetchData={items}
                        canDelete={true}
                        DeleteFunc={kickRstpsSession}
                    />
                </div>
            </motion.div>
        </div>
    );
}
