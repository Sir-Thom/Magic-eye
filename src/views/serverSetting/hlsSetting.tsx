import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import Toggle from "../../components/toggle/toggle";

export default function HlsSetting({ settings, onSave, patchSetting }) {
    const [hlsEnabled, setHlsEnabled] = useState(settings.hls || true);
    const [hlsAddress, setHlsAddress] = useState(
        settings.hlsAddress || ":8888"
    );
    const [hlsAllowOrigin, setHlsAllowOrigin] = useState(
        settings.hlsAllowOrigin || "*"
    );
    const [hlsAlwaysRemux, setHlsAlwaysRemux] = useState(
        settings.hlsAlwaysRemux || false
    );
    const [hlsDirectory, setHlsDirectory] = useState(
        settings.hlsDirectory || ""
    );
    const [hlsDisable, setHlsDisable] = useState(settings.hlsDisable || false);
    const [hlsEncryption, setHlsEncryption] = useState(
        settings.hlsEncryption || false
    );
    const [hlsPartDuration, setHlsPartDuration] = useState(
        settings.hlsPartDuration || "200ms"
    );
    const [hlsSegmentCount, setHlsSegmentCount] = useState(
        settings.hlsSegmentCount || 7
    );
    const [hlsSegmentDuration, setHlsSegmentDuration] = useState(
        settings.hlsSegmentDuration || "1s"
    );
    const [hlsSegmentMaxSize, setHlsSegmentMaxSize] = useState(
        settings.hlsSegmentMaxSize || "50M"
    );
    const [hlsServerCert, setHlsServerCert] = useState(
        settings.hlsServerCert || "server.crt"
    );
    const [hlsServerKey, setHlsServerKey] = useState(
        settings.hlsServerKey || "server.key"
    );
    const [hlsTrustedProxies, setHlsTrustedProxies] = useState(
        settings.hlsTrustedProxies || []
    );
    const [hlsVariant, setHlsVariant] = useState(
        settings.hlsVariant || "lowLatency"
    );

    const handleHlsEnabledChange = () => {
        setHlsEnabled(!hlsEnabled);
    };

    const handleHlsAddressChange = (event) => {
        setHlsAddress(event.target.value);
    };
    const handleHlsAllowOriginChange = (event) => {
        setHlsAllowOrigin(event.target.value);
    };

    const handleHlsAlwaysRemuxChange = () => {
        setHlsAlwaysRemux(!hlsAlwaysRemux);
    };

    const handleHlsDirectoryChange = (event) => {
        setHlsDirectory(event.target.value);
    };

    const handleHlsDisableChange = () => {
        setHlsDisable(!hlsDisable);
    };

    const handleHlsEncryptionChange = () => {
        setHlsEncryption(!hlsEncryption);
    };

    const handleHlsPartDurationChange = (event) => {
        setHlsPartDuration(event.target.value);
    };

    const handleHlsSegmentCountChange = (event) => {
        setHlsSegmentCount(event.target.value);
    };

    const handleHlsSegmentDurationChange = (event) => {
        setHlsSegmentDuration(event.target.value);
    };

    const handleHlsSegmentMaxSizeChange = (event) => {
        setHlsSegmentMaxSize(event.target.value);
    };

    const handleHlsServerCertChange = (event) => {
        setHlsServerCert(event.target.value);
    };

    const handleHlsServerKeyChange = (event) => {
        setHlsServerKey(event.target.value);
    };

    const handleHlsTrustedProxiesChange = (event) => {
        setHlsTrustedProxies(event.target.value);
    };

    const handleHlsVariantChange = (event) => {
        setHlsVariant(event.target.value);
    };
    useEffect(() => {
        setHlsEnabled(settings.hls);
        setHlsAddress(settings.hlsAddress || ":8888");
        setHlsAllowOrigin(settings.hlsAllowOrigin || "*");
        setHlsAlwaysRemux(settings.hlsAlwaysRemux || false);
        setHlsDirectory(settings.hlsDirectory || "");
        setHlsDisable(settings.hlsDisable || false);
        setHlsEncryption(settings.hlsEncryption || false);
        setHlsPartDuration(settings.hlsPartDuration || "200ms");
        setHlsSegmentCount(settings.hlsSegmentCount || 7);
        setHlsSegmentDuration(settings.hlsSegmentDuration || "1s");
        setHlsSegmentMaxSize(settings.hlsSegmentMaxSize || "50M");
        setHlsServerCert(settings.hlsServerCert || "server.crt");
        setHlsServerKey(settings.hlsServerKey || "server.key");
        setHlsTrustedProxies(settings.hlsTrustedProxies || []);
        setHlsVariant(settings.hlsVariant || "lowLatency");
    }, [settings]);

    const handleSaveConfig = () => {
        // Update the settings state with the modified values
        const updatedSettings = {
            ...settings,

            hls: hlsEnabled,
            hlsAddress: hlsAddress,
            hlsAllowOrigin: hlsAllowOrigin,
            hlsAlwaysRemux: hlsAlwaysRemux,
            hlsDirectory: hlsDirectory,
            hlsDisable: hlsDisable,
            hlsEncryption: hlsEncryption,
            hlsPartDuration: hlsPartDuration,
            hlsSegmentCount: hlsSegmentCount,
            hlsSegmentDuration: hlsSegmentDuration,
            hlsSegmentMaxSize: hlsSegmentMaxSize,
            hlsServerCert: hlsServerCert,
            hlsServerKey: hlsServerKey,
            hlsTrustedProxies: hlsTrustedProxies,
            hlsVariant: hlsVariant
        };
        onSave(updatedSettings);
        patchSetting(updatedSettings);
    };

    const GeneralSection = () => (
        <div className="grid w-full place-content-start grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 ">
            <div>
                <h2 className="text-base font-semibold leading-7 text-white">
                    General
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400"></p>
            </div>
            <div className="col-span-2 gap-4 w-fit  grid-rows-12 grid grid-cols-2">
                <label className="place-content-center my-auto col-start-1 row-start-1 row-end-2">
                    HLS Enabled:
                </label>
                <Toggle
                    className="my-auto place-content-center row-start-1 row-end-2"
                    enabled={hlsEnabled}
                    onChange={handleHlsEnabledChange}
                />

                <label className="place-content-center my-auto col-start-1 row-start-2 row-end-3">
                    HLS Address:
                </label>
                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-2 row-end-3 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={hlsAddress}
                    onChange={handleHlsAddressChange}
                />

                <label className="place-content-center my-auto col-start-1 row-start-3 row-end-4">
                    HLS Allow Origin:
                </label>
                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-3 row-end-4 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={hlsAllowOrigin}
                    onChange={handleHlsAllowOriginChange}
                />

                <label className="place-content-center my-auto col-start-1 row-start-4 row-end-5">
                    HLS Always Remux:
                </label>
                <Toggle
                    className="my-auto place-content-center row-start-4 row-end-5"
                    value={hlsAlwaysRemux.toString()}
                    enabled={hlsAlwaysRemux}
                    onChange={handleHlsAlwaysRemuxChange}
                />

                <label className="place-content-center my-auto col-start-1 row-start-5 row-end-6">
                    HLS Directory:
                </label>
                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-5 row-end-6 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={hlsDirectory}
                    onChange={handleHlsDirectoryChange}
                />

                <label className="place-content-center my-auto col-start-1 row-start-6 row-end-7">
                    HLS Disable:
                </label>
                <Toggle
                    className="my-auto place-content-center row-start-6 row-end-7"
                    value={hlsDisable.toString()}
                    enabled={hlsDisable}
                    onChange={handleHlsDisableChange}
                />

                <label className="place-content-center my-auto col-start-1 row-start-7 row-end-8">
                    HLS Part Duration:
                </label>
                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-7 row-end-8 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={hlsPartDuration}
                    onChange={handleHlsPartDurationChange}
                />

                <label className="place-content-center my-auto col-start-1 row-start-8 row-end-9">
                    HLS Segment Count:
                </label>
                <input
                    type="number"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-8 row-end-9 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={hlsSegmentCount}
                    onChange={handleHlsSegmentCountChange}
                />

                <label className="place-content-center my-auto col-start-1 row-start-9 row-end-10">
                    HLS Segment Duration:
                </label>
                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-9 row-end-10 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={hlsSegmentDuration}
                    onChange={handleHlsSegmentDurationChange}
                />

                <label className="place-content-center my-auto col-start-1 row-start-10 row-end-11">
                    HLS Segment Max Size:
                </label>
                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-10 row-end-11 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    onChange={handleHlsSegmentMaxSizeChange}
                />

                <label className="place-content-center my-auto col-start-1 row-start-11 row-end-12">
                    HLS Variant:
                </label>
                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-11 row-end-12 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={hlsVariant}
                    onChange={handleHlsVariantChange}
                />
            </div>
        </div>
    );

    const EncryptionSection = () => (
        <div className="grid w-full place-content-start grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 ">
            <div>
                <h2 className="text-base font-semibold leading-7 text-white">
                    Encryption
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400"></p>
            </div>
            <div className="col-span-2 gap-4 w-fit grid-rows-3 grid grid-cols-2">
                <label className="place-content-center my-auto col-start-1 row-start-1 row-end-2">
                    HLS Encryption Enabled:
                </label>

                <Toggle
                    className="my-auto place-content-center row-start-1 row-end-2"
                    value={hlsEncryption.toString()}
                    enabled={hlsEncryption}
                    onChange={handleHlsEncryptionChange}
                />
            </div>
        </div>
    );

    const ServerSection = () => (
        <div className="grid w-full place-content-start grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 ">
            <div>
                <h2 className="text-base font-semibold leading-7 text-white">
                    Server
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400"></p>
            </div>
            <div className="col-span-2 gap-4 w-fit grid-rows-5 grid grid-cols-2">
                <label className="place-content-center my-auto col-start-1 row-start-1 row-end-2">
                    HLS Server Cert:
                </label>
                <label className="place-content-center my-auto col-start-1 row-start-2 row-end-3">
                    HLS Server Key:
                </label>
                <label className="place-content-center my-auto col-start-1 row-start-3 row-end-4">
                    HLS Server Trusted Proxies:
                </label>

                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-1 row-end-2 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={hlsServerCert}
                    onChange={handleHlsServerCertChange}
                />
                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-2 row-end-3 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={hlsServerKey}
                    onChange={handleHlsServerKeyChange}
                />
                <textarea
                    name="hlsTrustedProxies"
                    style={{ resize: "none" }}
                    className="my-auto h-8 align-text-bottom place-content-center row-start-3 row-end-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={hlsTrustedProxies}
                    onChange={handleHlsTrustedProxiesChange}
                />
            </div>
        </div>
    );

    return (
        <div className="mx-auto min-h-screen w-full">
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full rounded-md"
            >
                {settings && (
                    <div className="mx-auto w-full">
                        <h2 className="text-center py-2.5 mx-auto w-full bg-center bg-window-dark-900 font-bold text-3xl">
                            HLS Setting
                        </h2>

                        <div className="divide-y w-full divide-window-dark-500">
                            {GeneralSection()}
                            {EncryptionSection()}
                            {ServerSection()}
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
