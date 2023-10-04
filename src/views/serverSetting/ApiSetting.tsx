import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import Checkbox from "../../components/checkBox/checkBox";

export default function ApiSetting({ settings, onSave }) {
  const [apiEnabled, setApiEnabled] = useState(settings.api || true);
  const [apiAddress, setApiAddress] = useState(
    settings.apiAddress || "127.0.0.1:9997"
  );
  const [metrics, setMetrics] = useState(settings.metrics || false);
  const [metricsAddress, setMetricsAddress] = useState(
    settings.metricsAddress || "127.0.0.1:9998"
  );
  const [pprof, setPprof] = useState(settings.pprof || false);
  const [pprofAddress, setPprofAddress] = useState(
    settings.pprofAddress || "127.0.0.1:9999"
  );
  const [runOnConnect, setRunOnConnect] = useState(settings.runOnConnect || "");
  const [runOnConnectRestart, setRunOnConnectRestart] = useState(
    settings.runOnConnectRestart || false
  );
  console.log(settings);

  const handleApiEnabledChange = (event) => {
    setApiEnabled(event.target.checked);
  };

  const handleApiAddressChange = (event) => {
    setApiAddress(event.target.value);
  };

  const handleMetricsChange = (event) => {
    setMetrics(event.target.checked);
  };

  const handleMetricsAddressChange = (event) => {
    setMetricsAddress(event.target.value);
  };

  const handlePprofChange = (event) => {
    setPprof(event.target.checked);
  };

  const handlePprofAddressChange = (event) => {
    setPprofAddress(event.target.value);
  };

  const handleRunOnConnectChange = (event) => {
    setRunOnConnect(event.target.value);
  };

  const handleRunOnConnectRestartChange = (event) => {
    setRunOnConnectRestart(event.target.checked);
  };

  useEffect(() => {
    if (settings) {
      setApiEnabled(settings.api);
      setApiAddress(settings.apiAddress);
      setMetrics(settings.metrics);
      setMetricsAddress(settings.metricsAddress);
      setPprof(settings.pprof);
      setPprofAddress(settings.pprofAddress);
      setRunOnConnect(settings.runOnConnect);
      setRunOnConnectRestart(settings.runOnConnectRestart);
    }
  }, [settings]);

  const handleSaveConfig = () => {
    // Create an updated settings object with the modified logging settings
    const updatedSettings = {
      ...settings,
      api: apiEnabled,
      apiAddress: apiAddress,
      metrics: metrics,
      metricsAddress: metricsAddress,
      pprof: pprof,
      pprofAddress: pprofAddress,
      runOnConnect: runOnConnect,
      runOnConnectRestart: runOnConnectRestart
    };
    console.log(updatedSettings);

    // Call the onSave prop to save the changes
    onSave(updatedSettings);
  };

  return (
    <>
      <div className="w-3/4 mx-auto flex justify-center items-center ">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {settings && (
            <div className="mt-12">
              <h2 className="flex justify-center items-center text-center font-bold text-3xl">
                API Setting
              </h2>
              <div className="flex justify-between flex-col items-center my-4 flex-1 ">
                <label className="flex text-justify items-center">
                  API
                  <Checkbox
                    value={apiEnabled.toString()}
                    checked={apiEnabled}
                    onChange={handleApiEnabledChange}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  API Address:
                  <input
                    type="text"
                    className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                    value={apiAddress}
                    onChange={handleApiAddressChange}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Metrics
                  <Checkbox
                    value={metrics.toString()}
                    checked={metrics}
                    onChange={handleMetricsChange}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Metrics Address:
                  <input
                    type="text"
                    className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                    value={metricsAddress}
                    onChange={handleMetricsAddressChange}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Pprof
                  <Checkbox
                    value={pprof.toString()}
                    checked={pprof}
                    onChange={handlePprofChange}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col items-center my-4 flex-2 ">
                <label className="flex text-justify items-center">
                  Pprof Address:
                  <input
                    type="text"
                    className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                    value={pprofAddress}
                    onChange={handlePprofAddressChange}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Run On Connect:
                  <input
                    type="text"
                    className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                    value={runOnConnect}
                    onChange={handleRunOnConnectChange}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Run On Connect Restart:
                  <Checkbox
                    value={runOnConnectRestart.toString()}
                    checked={runOnConnectRestart}
                    onChange={handleRunOnConnectRestartChange}
                  />
                </label>
              </div>
              <div className="my-6 absolute right-0 bottom-0 flex justify-end">
                <button
                  type="button"
                  className="dark:text-text-dark text-text-light bg-accent-color1-700 hover:bg-accent-color1-800 ml-4 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="dark:text-text-dark text-text-light bg-accent-color1-700 hover:bg-accent-color1-800 mx-4 font-bold py-2 px-4 rounded"
                  onClick={handleSaveConfig}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
