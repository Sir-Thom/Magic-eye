import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import { invoke } from "@tauri-apps/api";

export default function RtspServerInfo() {
    const [items, setItems] = useState<any[]>([]);
    useEffect(() => {
      invoke("get_server_request", {
        url: "http://127.0.0.1:9997/v3/rtspconns/list"
      }).then((response) => {
        console.log("response:", JSON.parse(response.toString()));
        response = JSON.parse(response.toString());
        console.log("response:", response);
        if (response && (response as { items: any[] }).items) {
          setItems((response as { items: any[] }).items);
        } else {
          console.error("Response does not contain 'items'.");
        }
      });
    }, []);



    return (
        <motion.div
            className="w-3/4 mx-auto flex justify-center items-start "
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
        > 
      
            
                <ul role="list" className="divide-y divide-gray-100">
                    {items.map((item) => (
                        <li key={item.id} className="py-5">
                            <div>
                                <p className=" font-semibold leading-6 text-white">
                                    {item.id}
                                </p>
                                <p className="mt-1 truncate  leading-5 text-white">
                                    Created: {item.created}
                                </p>
                                <p className="truncate  leading-5 text-white">
                                    Remote Address: {item.remoteAddr}
                                </p>
                                <p className=" leading-5 text-white">
                                    Bytes Received: {item.bytesReceived}
                                </p>
                                <p className=" leading-5 text-white">
                                    Bytes Sent: {item.bytesSent}
                                </p>
                            </div>
                            <button className="t text-red-500">Delete</button>
                        </li>
                    ))}
                </ul>
          
        </motion.div>
    );
}
