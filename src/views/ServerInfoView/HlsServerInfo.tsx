import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import { invoke } from "@tauri-apps/api";
import ListView from "../../components/ListBox/listView";
import useServerData from "../../utils/hooks/ServerData";

export default function HLsConnInfo() {
    const [items, setItems] = useState<any[]>([]);
    const { apiIp } = useServerData();
    

    useEffect(() => {
      if (apiIp !== null) {
        console.log("apiIp:", apiIp);
        
  
        invoke("get_server_request", {
          url: `http://${apiIp}/v3/hlsmuxers/list`,
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
      }
    }, [apiIp]);


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
                    HLS Informations
                </h2>

                <ListView fetchData={items} canDelete={false} />
            </div>
        </motion.div>
    );
}
