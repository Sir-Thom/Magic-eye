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

    return (
        <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {settings && (
                <div className=" my-4">
                    <h2 className="text-center font-bold text-3xl">
                        API Setting
                    </h2>
                    <div className="grid grid-cols-2 overflow-auto mt-6 content-between place-content-start gap-4">
                        <div className="col-span-1">
                            <div className="flex flex-col text-right items-end">
                                <label className="my-2">API:</label>
                               {/* <!-- <label className="my-2">API Address:</label> --> */}
                                <label className="my-3">Metrics:</label>
                                <label className="mt-3 mb-4">Metrics Address:</label>
                                <label className="my-2">Pprof:</label>
                                <label className="my-4">Pprof Address:</label>
                                <label className="mt-5 mb-2.5">Run On Connect:</label>
                                <label className="mt-5 mb-2">
                                    Run On Connect Restart:
                                </label>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="flex flex-col">
                            <Toggle className="my-2 mt-3" enabled={apiEnabled} onChange={handleApiEnabledChange} />

                           
                            
                                <Toggle
                                    className=" mt-4 mb-2"
                                    value={metricsEnabled.toString()}
                                    enabled={metricsEnabled}
                                    onChange={handleMetricsChange}
                                />
                                <input
                                    type="text"
                                    className="mt-3 mb-2  h-8  pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    value={metricsAddress}
                                    onChange={handleMetricsAddressChange}
                                />
                                <Toggle
                                    className="mt-4 mb-2"
                                    value={pprofEnabled.toString()}
                                    enabled={pprofEnabled}
                                    onChange={handlePprofChange}
                                />
                                <input
                                    type="text"
                                    className="mt-4 mb-3 h-8  pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    value={pprofAddress}
                                    onChange={handlePprofAddressChange}
                                />
                                <input
                                    type="text"
                                    className="mt-3.5 mb-3.5 h-8  appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    value={runOnConnect}
                                    onChange={handleRunOnConnectChange}
                                />
                                <Toggle
                                    className="mt-3.5 mb-2"
                                    value={runOnConnectRestart.toString()}
                                    enabled={runOnConnectRestart}
                                    onChange={handleRunOnConnectRestartChange}
                                />
                            </div>
                        </div>
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
    );
}