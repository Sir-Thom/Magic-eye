import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import { invoke } from "@tauri-apps/api";
import ListView from "../../components/ListBox/listView";
import useServerData from "../../utils/hooks/ServerData";

export default function RtmpConnInfo() {
    const [items, setItems] = useState<any[]>([]);
    const { apiIp } = useServerData();

    useEffect(() => {
        if (apiIp !== null) {
            console.log("apiIp:", apiIp);

            invoke("get_server_request", {
                url: `http://${apiIp}/v3/rtmpconns/list`
            }).then((response) => {
                console.log("Response before parsing:", response);
                if (response) {
                    response = JSON.parse(response.toString());
                    console.log("Parsed Response:", response);
                }
                console.log("response:", response);
                if (response && (response as { items: any[] }).items) {
                    setItems((response as { items: any[] }).items);
                } else {
                    console.error("Response does not contain 'items'.");
                }
            });
        }
    }, [apiIp]);
    // Poll the server for updates
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (apiIp !== null) {
                getAllRTMPSessions();
            }
        }, 5000); // Fetch data every 5 seconds

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [apiIp]);

    async function getAllRTMPSessions() {
        invoke("get_server_request", {
            url: `http://${apiIp}/v3/rtmpconns/list`
        }).then((response) => {
            console.log("Response before parsing:", response);
            
            if (response) {
                response = JSON.parse(response.toString());
                console.log("Parsed Response:", response);
            }
            console.log("response:", response);
            if (response && (response as { items: any[] }).items) {
                setItems((response as { items: any[] }).items);
            } else {
                console.error("Response does not contain 'items'.");
            }
        });
    }

    async function KickRTMPession(valueToSend: string) {
        invoke("post_server_request", {
            url: `http://${apiIp}/v3/rtmpconns/kick/`,
            value: valueToSend
        })
            .then(() => {
                // Delay for a short period to allow the server to process the kick
                setTimeout(() => {
                    // Update the UI by fetching the updated list of sessions
                    getAllRTMPSessions();
                }, 100);
            })
            .catch((error) => {
                console.error("Error kicking RTMP session:", error);
            });
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
                    RTMP Informations
                </h2>
                <div className="divide-y  w-full divide-window-dark-500">
                    <ListView
                        fetchData={items}
                        canDelete={true}
                        DeleteFunc={KickRTMPession}
                    />
                </div>
            </motion.div>
        </div>
    );
}
