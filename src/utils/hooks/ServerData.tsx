import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { IServer } from "../../interfaces/IServer";

function useServerData() {
    const [configData, setConfigData] = useState<IServer | null>(null);
    const [apiIp, setApiIp] = useState<string | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const apiIpValue = await getApiIp();
                setApiIp(apiIpValue);
                setServerError(null);

                const serverUrl = `http://${apiIpValue}/v3/config/global/get`;
                const response = await invoke("get_server_request", {
                    url: serverUrl,
                });
                const parsedResponse: IServer = JSON.parse(response as string);
                setConfigData(parsedResponse);
                setLoading(false); // Set loading to false once the API call is resolved
            } catch (error) {
                setServerError("Error: " + error);
                setLoading(false); // Set loading to false even if there's an error
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

    return { configData, serverError, apiIp, loading };
}

export default useServerData;
