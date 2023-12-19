import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import { invoke } from "@tauri-apps/api";
import ListView from "../../components/ListBox/listView";
import useServerData from "../../utils/hooks/ServerData";

export default function RtmpsConnInfo() {
    const [items, setItems] = useState<any[]>([]);
    const { apiIp } = useServerData();

    useEffect(() => {
        if (apiIp !== null) {
            console.log("apiIp:", apiIp);

            invoke("get_server_request", {
                url: `http://${apiIp}/v3/rtmpsconns/list`
            }).then((response) => {
                console.log("response:", response);
                

                console.log("response:", response);
                if (response) {
                    response = JSON.parse(response.toString());
                    console.log("Parsed Response:", response);
                }
                if (response && (response as { items: any[] }).items) {
                    setItems((response as { items: any[] }).items);
                } else {
                    console.error("Response does not contain 'items'.");
                }
            });
        }
    }, [apiIp]);

    async function KickRTMPSession(valueToSend: string) {
        invoke("post_server_request", {
            url: `http://${apiIp}/v3/rtmpsconns/kick/`,
            value: valueToSend
        }).then((res) => {
            console.log(res);
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
                    RTMPS Informations
                </h2>
                <div className="divide-y  w-full divide-window-dark-500">
                    <ListView
                        fetchData={items}
                        canDelete={true}
                        DeleteFunc={KickRTMPSession}
                    />
                </div>
            </motion.div>
        </div>
    );
}
