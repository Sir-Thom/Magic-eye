import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import Toggle from "../../components/toggle/toggle";

export default function ApiSetting({ settings, onSave, patchSetting }) {
    const [apiEnabled, setApiEnabled] = useState(Boolean(settings.api));
    const [metricsEnabled, setMetricsEnabled] = useState(
        Boolean(settings.metrics)
    );
    const [metricsAddress, setMetricsAddress] = useState(
        settings.metricsAddress
    );
    const [pprofEnabled, setPprofEnabled] = useState(Boolean(settings.pprof));
    const [pprofAddress, setPprofAddress] = useState(settings.pprofAddress);
    const [runOnConnect, setRunOnConnect] = useState(settings.runOnConnect);
    const [runOnConnectRestart, setRunOnConnectRestart] = useState(
        Boolean(settings.runOnConnectRestart)
    );

    const handleApiEnabledChange = () => {
        setApiEnabled(!apiEnabled); // Toggle the API state
    };

    const handleMetricsChange = () => {
        setMetricsEnabled(!metricsEnabled); // Toggle the metrics state
    };

    const handleMetricsAddressChange = (event) => {
        setMetricsAddress(event.target.checked);
    };

    const handlePprofChange = () => {
        setPprofEnabled(!pprofEnabled); // Toggle the Pprof state
    };

    const handlePprofAddressChange = (event) => {
        setPprofAddress(event.target.value);
    };

    const handleRunOnConnectChange = (event) => {
        setRunOnConnect(event.target.value);
    };

    const handleRunOnConnectRestartChange = () => {
        setRunOnConnectRestart(!runOnConnectRestart); // Toggle the Run On Connect Restart state
    };

    useEffect(() => {
        setApiEnabled(Boolean(settings.api));
       // setApiAddress(settings.apiAddress);
        setMetricsEnabled(Boolean(settings.metrics));
        setMetricsAddress(settings.metricsAddress);
        setPprofEnabled(Boolean(settings.pprof));
        setPprofAddress(settings.pprofAddress);
        setRunOnConnect(settings.runOnConnect);
        setRunOnConnectRestart(Boolean(settings.runOnConnectRestart));
    }, [settings]);

    const handleSaveConfig = () => {
        // Create an updated settings object with the modified logging settings
        const updatedSettings = {
            ...settings,
            api: apiEnabled,
      //      apiAddress: apiAddress,
            metrics: metricsEnabled,
            metricsAddress: metricsAddress,
            pprof: pprofEnabled,
            pprofAddress: pprofAddress,
            runOnConnect: runOnConnect,
            runOnConnectRestart: runOnConnectRestart
        };
        console.log("setting updated: " + JSON.stringify(updatedSettings));

        // Call the onSave prop to save the changes
        onSave(updatedSettings);
        patchSetting(updatedSettings);
    };
    const APISection = () => (
        <div className="grid  w-full  grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 bg-window-dark-800">
        <div>
          <h2 className="text-base font-semibold leading-7 text-white">API</h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
               
          </p>
        </div>
            <div className="col-span-2 gap-4 w-fit   grid-rows-3 grid grid-cols-2">
              
                <label className="place-content-center  my-auto  col-start-1 row-start-1 row-end-2 ">API:</label>
                <label className="place-content-center my-auto col-start-1 row-start-2 row-end-3 ">Run On Connect:</label>
                <label className="place-content-center col-start-1 row-start-3 row-end-4 my-auto">Run On Connect Restart:</label>
      
             <Toggle className=" row-start-1 my-auto place-content-center row-end-2" enabled={apiEnabled} onChange={handleApiEnabledChange} />

            <input
                                    type="text"
                                    className="my-auto h-8 align-text-bottom place-content-center row-start-2 row-end-3 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    value={runOnConnect}
                                    onChange={handleRunOnConnectChange}
                                />
                                <Toggle
                                    className="my-auto place-content-center row-start-3 row-end-4"
                                    value={runOnConnectRestart.toString()}
                                    enabled={runOnConnectRestart}
                                    onChange={handleRunOnConnectRestartChange}
                                />
                 </div>
                </div>
              
            
            
  
          );

          const MetricsSection = () => (
            <div className="grid  w-full place-content-start  grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 bg-window-dark-800">
            <div>
              <h2 className="text-base font-semibold leading-7 text-white">Metrics</h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                   
              </p>
            </div>
            <div className="col-span-2 gap-4 w-fit   grid-rows-2 grid grid-cols-2">
              
                    <label className="place-content-center  my-auto  col-start-1 row-start-1 row-end-2 ">Metrics:</label>
                    <label className="place-content-center  my-auto  col-start-1 row-start-2 row-end-3 ">Metrics Address:</label>
                    <Toggle
                                    className=" row-start-1 my-auto place-content-center row-end-2"
                                    value={metricsEnabled.toString()}
                                    enabled={metricsEnabled}
                                    onChange={handleMetricsChange}
                                />
                                <input
                                    type="text"
                                    className="row-start-2 my-auto place-content-center row-end-3  h-8  pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    value={metricsAddress}
                                    onChange={handleMetricsAddressChange}
                                />
                
               
                
                     </div>
                     </div>
          );

            const PprofSection = () => (
                <div className="grid  w-full  overscroll-contain  overflow-hidden grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 bg-window-dark-800">
                <div>
                  <h2 className="text-base font-semibold leading-7 text-white">Pprof</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                       
                  </p>
                </div>
                <div className="col-span-2  w-fit gap-4  grid-rows-2 grid grid-cols-2">
                        <label className="place-content-center  my-auto  col-start-1 row-start-1 row-end-2">Pprof:</label>
                        <label className="place-content-center  my-auto  col-start-1 row-start-2 row-end-3">Pprof Address:</label>
                    <Toggle
                                    className="place-content-center  my-auto  row-start-1 row-end-2"
                                    value={pprofEnabled.toString()}
                                    enabled={pprofEnabled}
                                    onChange={handlePprofChange}
                                />
                                <input
                                    type="text"
                                    className="place-content-center  my-auto  row-start-2 row-end-3 h-8  pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    value={pprofAddress}
                                    onChange={handlePprofAddressChange}
                                />
                         </div>
                         </div>
            );

    return (
        <div className="mx-auto  w-full  ">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full  rounded-md"
      >
        {settings && (
          <div className="mx-auto w-full">
            <h2 className="text-center my-3 font-bold text-3xl">API Setting</h2>
            <div className="divide-y  w-full divide-window-dark-500">
            {APISection()}
            {MetricsSection()}
            {PprofSection()}
            </div>
            <div className="my-6 flex justify-end fixed bottom-0 right-0">
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
    );
}
