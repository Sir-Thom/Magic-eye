// useConfigData.js
import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api";

export function useConfigData() {
  const [configData, setConfigData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const configData = await invoke("get_config_file_content");
        setConfigData(JSON.parse(configData));
      } catch (err) {
        console.error("Error while reading the configuration file", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { configData, isLoading };
}
