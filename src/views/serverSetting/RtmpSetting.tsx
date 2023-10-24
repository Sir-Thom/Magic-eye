import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import Checkbox from "../../components/checkBox/checkBox";

export default function RtmpSetting({ settings, onSave, patchSetting }) {
    const [rtmp, setRtmp] = useState(settings.rtmp || true);
    const [rtmpDisabled, setRtmpDisabled] = useState(
        settings.rtmpDisabled || false
    );
    const [rtmpAddress, setRtmpAddress] = useState(
        settings.rtmpAddress || ":1935"
    );
    const [rtmpsAddress, setRtmpsAddress] = useState(
        settings.rtmpAddress || ":1936"
    );
    const [rtmpEncryption, setRtmpEncryption] = useState(
        settings.rtmpEncryption || "no"
    );
    const [rtmpServerKey, setRtmpServerKey] = useState(
        settings.rtmpServerKey || "server.key"
    );
    const [rtmpServerCert, setRtmpServerCert] = useState(
        settings.rtmpServerCert || "server.crt"
    );

    const handleRtmp = () => {
        setRtmp(!rtmp);
    };

    const handleRtmpDisabled = () => {
        setRtmpDisabled(!rtmpDisabled);
    };

    const handleRtmpAddress = (event) => {
        setRtmpAddress(event.target.value);
    };

    const handleRtmpEncryption = (event) => {
        setRtmpEncryption(event.target.value);
    };

    const handleRtmpsAddress = (event) => {
        setRtmpsAddress(event.target.value);
    };

    const handleRtmpServerKey = (event) => {
        setRtmpServerKey(event.target.value);
    };

    const handleRtmpServerCert = (event) => {
        setRtmpServerCert(event.target.value);
    };

    useEffect(() => {
        setRtmp(settings.rtmp || true);
        setRtmpDisabled(settings.rtmpDisabled || false);
        setRtmpAddress(settings.rtmpAddress || ":1935");
        setRtmpsAddress(settings.rtmpAddress || ":1936");
        setRtmpEncryption(settings.rtmpEncryption || "no");
        setRtmpServerKey(settings.rtmpServerKey || "server.key");
        setRtmpServerCert(settings.rtmpServerCert || "server.crt");
    }, [settings]);

    const handleSaveConfig = () => {
        const updatedSettings = {
            ...settings,
            rtmp: rtmp,
            rtmpDisabled: rtmpDisabled,
            rtmpAddress: rtmpAddress,
            rtmpEncryption: rtmpEncryption,
            rtmpsAddress: rtmpsAddress,
            rtmpServerKey: rtmpServerKey,
            rtmpServerCert: rtmpServerCert
        };
        onSave(updatedSettings);
        patchSetting(updatedSettings);
    };

    return (
        <>
            <div className="w-3/4 mx-auto flex justify-center items-start ">
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {settings && (
                        <div className="">
                            <h2 className="mx-auto text-center font-bold text-3xl">
                                RTMP Setting
                            </h2>
                            <div className="grid grid-cols-2 content-between place-content-start mt-6 gap-4">
                                <div className="col-span-1">
                                    <div className="flex flex-col align-baseline text-justify items-end">
                                        <label className="my-2">RTMP:</label>
                                        <label className="my-2">
                                            RTMP Disabled:
                                        </label>
                                        <label className="my-2">
                                            RTMP Address:
                                        </label>
                                        <label className="my-3">
                                            RTMP Encryption:
                                        </label>
                                        <label className="my-2">
                                            RTMPS Address:
                                        </label>
                                        <label className="my-2">
                                            RTMP Server Key:
                                        </label>
                                        <label className="my-4">
                                            RTMP Server Cert:
                                        </label>
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div className="flex flex-col">
                                        <Checkbox
                                            className="my-3"
                                            value={rtmp.toString()}
                                            checked={rtmp}
                                            onChange={handleRtmp}
                                        />
                                        <Checkbox
                                            className="my-3"
                                            value={rtmpDisabled.toString()}
                                            checked={rtmpDisabled}
                                            onChange={handleRtmpDisabled}
                                        />
                                        <input
                                            type="text"
                                            className="appearance-none my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={rtmpAddress}
                                            onChange={handleRtmpAddress}
                                        />
                                        <input
                                            type="text"
                                            className="appearance-none my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={rtmpEncryption}
                                            onChange={handleRtmpEncryption}
                                        />
                                        <input
                                            type="text"
                                            className="appearance-none my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={rtmpsAddress}
                                            onChange={handleRtmpsAddress}
                                        />
                                        <input
                                            type="text"
                                            className="appearance-none my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={rtmpServerKey}
                                            onChange={handleRtmpServerKey}
                                        />
                                        <input
                                            type="text"
                                            className="appearance-none my-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={rtmpServerCert}
                                            onChange={handleRtmpServerCert}
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
            </div>
        </>
    );
}
