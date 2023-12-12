import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api';
import { IServer } from '../../interfaces/IServer';


function useServerData() {
  const [configData, setConfigData] = useState<IServer | null>(null);
  // get IP api from server
  const [apiIp, setApiIp] = useState<string | null>(null);
  const [serverError, setserverError] = useState<string | null>(null);
  //send fetch request to server

  useEffect(() => {
    async function fetchData() {
      try {
        const apiIpValue = await getApiIp();
        setApiIp(apiIpValue);
        setserverError(null);

        const serverUrl = `http://${apiIpValue}/v3/config/global/get`;
        const response = await invoke('get_server_request', { url: serverUrl }).then((response: string) => {
          console.log("Server Response in ServerData:", response)
          return response
        }); 
        console.log('Server response: ' + response);
        const parsedResponse: IServer = JSON.parse(response as string);

        setConfigData(parsedResponse);
        console.log('Server data: ' + JSON.stringify(parsedResponse));
        console.log('Server data: ' + JSON.stringify(parsedResponse));
      } catch (error) {
        setserverError('Unable to connect to the server.');
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return { configData, serverError,apiIp };
}

async function getApiIp() {
  try {
    const res = await invoke('get_api_ip');
    console.log('API IP: ' + res);
    return res.toString();
  } catch (e) {
    console.error(e);
    return 'unable to get API Ip adress.';
  }
}

export default useServerData;
