import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { ISettings } from "../../interfaces/IServer";

function useServerData() {
    const [fetchConfigData, setFetchConfigData] = useState<ISettings | null>(
        null
    );
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
                    url: serverUrl
                });
                const parsedResponse: ISettings = JSON.parse(
                    response as string
                );
                setFetchConfigData(parsedResponse);
                setLoading(false); // Set loading to false once the API call is resolved
            } catch (error) {
                setServerError(error);
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

    return { fetchConfigData, serverError, apiIp, loading };
}

export default useServerData;
