import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import { invoke } from "@tauri-apps/api";
import ListView from "../../components/ListBox/listView";

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
            className="w-3/4 overscroll-contain mx-auto flex  flex-co justify-center items-start"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <h2 className=" mx-auto   text-center font-bold text-3xl">
                                RTSP Informations
                            </h2>
                            <div className="-6">
            <ListView fetchData={items} />
            </div>
        </motion.div>
        
    );
}
