import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import { invoke } from "@tauri-apps/api";
import ListBox from "../../components/ListBox/listBox";

export default function RtspServerInfo() {
    const [Rtspdata, setRtspdata] = useState<any[]>([]); // Initialize as an empty array

    useEffect(() => {
        invoke("get_server_request", {
            url: "http://127.0.0.1:9997/v3/rtspconns/list"
        }).then((response: any) => {
            console.log("response:" + response);
            setRtspdata(response as any[]);
            console.log("parsed option:" + JSON.stringify(response));
        });
    }, []);
    const data = {
        itemCount: 2,
        pageCount: 1,
        items: [
            {
                id: "f0181de0-b1fb-4efd-93ad-1ede297eea03",
                created: "2023-10-26T09:19:19.376827665-04:00",
                remoteAddr: "127.0.0.1:46702",
                bytesReceived: 127,
                bytesSent: 128
            },
            {
                id: "4a98da7a-16ad-42db-82c2-c4cae87f77b0",
                created: "2023-10-26T10:31:22.643908707-04:00",
                remoteAddr: "127.0.0.1:36982",
                bytesReceived: 127,
                bytesSent: 128
            }
        ]
    };

    return (
        <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className=" my-4">
                <h2 className="text-center font-bold text-3xl">
                    RTSP Server Information
                </h2>
                <div className="grid grid-cols-2 mt-6 content-between place-content-start gap-4">
                    <div className="col-span-1">
                        <div className="flex flex-col text-right items-end">
                            <label className="font-semibold text-lg my-2">
                                RTSP Server:
                            </label>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-col">
                            <ListBox data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
