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
        className="w-3/4 mx-auto flex justify-center items-start min-h-screen"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
             <ul role="list" className="divide-y divide-gray-100">
      {data.items.map((item) => (
        <li key={item.id} className="py-5">
             
            
          <div>
            <p className="text-sm font-semibold leading-6 text-white">{item.id}</p>
            <p className="mt-1 truncate text-xs leading-5  text-white">
              Created: {item.created}
            </p>
            <p className="truncate text-xs leading-5  text-white">
              Remote Address: {item.remoteAddr}
            </p>
            <p className="text-xs leading-5  text-white">
              Bytes Received: {item.bytesReceived}
            </p>
            <p className="text-xs leading-5  text-white">
              Bytes Sent: {item.bytesSent}
            </p>
          </div>
          <button className="text-xs text-red-500">
              Delete
            </button>
          
          </li>
          ))}
       
    </ul>

        </motion.div>
    );
}
