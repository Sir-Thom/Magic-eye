import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import Toggle from "../../components/toggle/toggle";



export default function RtmpSetting({ settings, onSave, patchSetting }) {
    const [rtmp, setRtmp] = useState(settings.rtmp || true);

    const [rtmpAddress, setRtmpAddress] = useState(
        settings.rtmpAddress || ":1935"
    );
    const [rtmpsAddress, setRtmpsAddress] = useState(
        settings.rtmpAddress || ":1936"
    );
    const [rtmpEncryptionToggle, setRtmpEncryptionToggle] = useState(
        false
    );
    const [rtmpEncryption, setRtmpEncryption] = useState(
        settings.rtmpEncryption  || "no"
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

    const handleRtmpAddress = (event) => {
        setRtmpAddress(event.target.value);
    };

    const handleRtmpEncryption = () => {
        console.log("toggle: "+rtmpEncryptionToggle);
        console.log("rtmpEncryption: "+rtmpEncryption);
        setRtmpEncryptionToggle(!rtmpEncryptionToggle);
        setRtmpEncryption(rtmpEncryptionToggle ? "no" : "yes");
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
        setRtmp(settings.rtmp);
        setRtmpAddress(settings.rtmpAddress || ":1935");
        setRtmpsAddress(settings.rtmpAddress || ":1936");
        setRtmpEncryptionToggle(settings.rtmpEncryption == "yes" ? true :  false);
        setRtmpEncryption(settings.rtmpEncryption || "no");
        setRtmpServerKey(settings.rtmpServerKey || "server.key");
        setRtmpServerCert(settings.rtmpServerCert || "server.crt");
    }, [settings]);

    const handleSaveConfig = () => {
        const updatedSettings = {
            ...settings,
            rtmp: rtmp,
            rtmpAddress: rtmpAddress,
            rtmpEncryption: rtmpEncryption,
            rtmpsAddress: rtmpsAddress,
            rtmpServerKey: rtmpServerKey,
            rtmpServerCert: rtmpServerCert
        };
        onSave(updatedSettings);
        patchSetting(updatedSettings);
    };

    const RtmpSection = () => (
        <div className="grid  w-full  grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 ">
        <div>
            <h2 className="text-base font-semibold leading-7 text-white">
                RTMP General
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400"></p>
        </div>
        <div className="col-span-2 gap-4 w-fit   grid-rows-3 grid grid-cols-2">
        <label className="place-content-center  my-auto  col-start-1 row-start-1 row-end-2 ">
                    RTMP:
                </label>
                <label className="place-content-center my-auto col-start-1 row-start-2 row-end-3 ">
                RTMP Address:
                </label>
                <label className="place-content-center col-start-1 row-start-3 row-end-4 my-auto">
                RTMPS Address:
                </label>

                <Toggle
                    className=" row-start-1 my-auto place-content-center row-end-2"
                    enabled={rtmp}
                    onChange={handleRtmp}
                />

                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-2 row-end-3 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={rtmpAddress}
                    onChange={handleRtmpAddress}
                />

                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-3 row-end-4 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={rtmpsAddress}
                    onChange={handleRtmpsAddress}
                />
                
            </div>
        </div>

    );
    const EncryptionSection = () => (
        <div className="grid  w-full  grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 ">
        <div>
            <h2 className="text-base font-semibold leading-7 text-white">
                RTMP Encryption
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400"></p>
        </div>
        <div className="col-span-2 gap-4 w-fit   grid-rows-3 grid grid-cols-2">
        <label className="place-content-center my-auto col-start-1 row-start-1 row-end-2 ">
                RTMP Encryption:
                </label>
        <label className="place-content-center my-auto col-start-1 row-start-2 row-end-3 ">
                RTMP Server Key:
                </label>
                <label className="place-content-center col-start-1 row-start-3 row-end-4 my-auto">
                RTMP Server Cert:
                </label>
                <Toggle
                    className=" row-start-1 my-auto place-content-center row-end-2"
                    enabled={!rtmpEncryptionToggle}
                    onChange={handleRtmpEncryption}
                />

                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-2 row-end-3 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={rtmpServerKey}
                    onChange={handleRtmpServerKey}
                />
                 <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-3 row-end-4 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={rtmpServerCert}
                    onChange={handleRtmpServerCert}
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
                <div className="mx-auto  w-full">
                    <h2 className="text-center py-2.5  mx-auto w-full  bg-center bg-window-dark-900 font-bold text-3xl">
                    RTMP Setting
                    </h2>

                    <div className="divide-y  w-full divide-window-dark-500">
                        {RtmpSection()}
                        {EncryptionSection()}
                     
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
