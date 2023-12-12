import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { IServer } from "../../interfaces/IServer";

function useServerData() {
    const [configData, setConfigData] = useState<IServer | null>(null);
    const [apiIp, setApiIp] = useState<string | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const apiIpValue = await getApiIp();
                setApiIp(apiIpValue);
                setServerError(null);

                const serverUrl = `http://${apiIpValue}/v3/config/global/get`;
                const response = await invoke("get_server_request", {
                    url: serverUrl
                });
                const parsedResponse: IServer = JSON.parse(response as string);
                setConfigData(parsedResponse);
            } catch (error) {
                setServerError("Unable to connect to the server.");
            }
        }

        fetchData();
    }, []);

    async function getApiIp() {
        try {
            const res = await invoke("get_api_ip");
            return res.toString().replace(/^"(.*)"$/, "$1");
        } catch (e) {
            console.error(e);
            return "unable to get API Ip address.";
        }
    }

    return { configData, serverError, apiIp };
}

export default useServerData;
