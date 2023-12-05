import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api';
import { IServer } from '../../interfaces/IServer';


function useServerData() {
  const [configData, setConfigData] = useState<IServer | null>(null);
  const [serverError, setserverError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiIpValue = await getApiIp();
        setserverError(null);

        const serverUrl = `http://${apiIpValue}/v3/config/global/get`;
        const response = await invoke('get_server_request', { url: serverUrl });
        const parsedResponse: IServer = JSON.parse(response as string);

        setConfigData(parsedResponse);
      } catch (error) {
        setserverError('Unable to connect to the server.');
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return { configData, serverError };
}

async function getApiIp() {
  try {
    const res = await invoke('get_api_ip');
    return res.toString();
  } catch (e) {
    console.error(e);
    return 'unable to get API Ip adress.';
  }
}

export default useServerData;
