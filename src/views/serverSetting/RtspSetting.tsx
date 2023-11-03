import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Checkbox from "../../components/checkBox/checkBox";
import { fadeIn } from "../../utils/animation/screenAnimation";

export default function RtspSetting({ settings, onSave, patchSetting }) {
    const [rtsp, setRtsp] = useState(settings.rtsp || true);
    const [rtspDisable, setRtspDisable] = useState(
        settings.rtspDisable || false
    );
    const [protocols, setProtocols] = useState(
        settings.protocols || ["multicast", "tcp", "udp"]
    );
    const [encryption, setEncryption] = useState(settings.encryption || "no");
    const [rtspAddress, setRtspAddress] = useState(
        settings.rtspAddress || ":8554"
    );
    const [rtspsAddress, setRtspsAddress] = useState(
        settings.rtspsAddress || ":8322"
    );
    const [rtpAddress, setRtpAddress] = useState(
        settings.rtpAddress || ":8000"
    );
    const [rtcpAddress, setRtcpAddress] = useState(
        settings.rtcpAddress || ":8001"
    );
    const [multicastIPRange, setMulticastIPRange] = useState("224.1.0.0/16");
    const [multicastRTPPort, setMulticastRTPPort] = useState(8002);
    const [multicastRTCPPort, setMulticastRTCPPort] = useState(8003);

    const handleRtsp = () => {
        setRtsp(!rtsp);
    };

    const handleRtspDisable = () => {
        setRtspDisable(!rtspDisable);
    };

    const handleProtocols = (event) => {
        setProtocols(event.target.value);
    };

    const handleEncryption = () => {
        setEncryption(!encryption);
    };

    const handleRtspAddress = (event) => {
        setRtspAddress(event.target.value);
    };

    const handleRtspsAddress = (event) => {
        setRtspsAddress(event.target.value);
    };

    const handleRtpAddress = (event) => {
        setRtpAddress(event.target.value);
    };

    const handleRtcpAddress = (event) => {
        setRtcpAddress(event.target.value);
    };

    const handleMulticastIPRange = (event) => {
        setMulticastIPRange(event.target.value);
    };

    const handleMulticastRTPPort = (event) => {
        setMulticastRTPPort(event);
    };

    const handleMulticastRTCPPort = (event) => {
        setMulticastRTCPPort(event);
    };

    useEffect(() => {
        setRtsp(settings.rtsp);
        setRtspDisable(settings.rtspDisable || false);
        setProtocols(settings.protocols || ["multicast", "tcp", "udp"]);
        setEncryption(settings.encryption || "no");
        setRtspAddress(settings.rtspAddress || ":8554");
        setRtspsAddress(settings.rtspsAddress || ":8322");
        setRtpAddress(settings.rtpAddress || ":8000");
        setRtcpAddress(settings.rtcpAddress || ":8001");
        setMulticastIPRange(settings.multicastIPRange || "224.1.0.0/16");
        setMulticastRTPPort(settings.multicastRTPPort || 8002);
        setMulticastRTCPPort(settings.multicastRTCPPort || 8003);
    }, [settings]);

    const handleSaveConfig = () => {
        const updatedSettings = {
            ...settings,
            rtsp: rtsp,
            rtspDisable: rtspDisable,
            protocols: protocols,
            encryption: encryption,
            rtspAddress: rtspAddress,
            rtspsAddress: rtspsAddress,
            rtpAddress: rtpAddress,
            rtcpAddress: rtcpAddress,
            multicastIPRange: multicastIPRange,
            multicastRTPPort: multicastRTPPort,
            multicastRTCPPort: multicastRTCPPort
        };
        onSave(updatedSettings);
        patchSetting(updatedSettings);
    };

    return (
        <div className="w-3/4 mx-auto flex justify-center items-start min-h-screen">
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {settings && (
                    <div className="my-4">
                        <h2 className="text-center font-bold text-3xl">
                            RTSP Setting
                        </h2>
                        <div className="grid grid-cols-2 mt-5 content-between place-content-start gap-4">
                            <div className="col-span-1">
                                <div className="flex flex-col text-right items-end">
                                    <label className="my-2">RTSP:</label>
                                    <label className="my-2">
                                        RTSP Disable:
                                    </label>
                                    <label className="mt-5 mb-3">Protocols:</label>
                                    <label className="mt-7 mb-2">
                                        RTSP Encryption:
                                    </label>
                                    <label className="mt-4 mb-3">
                                        RTSP Address:
                                    </label>
                                    <label className="mt-5 mb-3">
                                        RTSPs Address:
                                    </label>
                                    <label className="mt-6 mb-4">RTP Address:</label>
                                    <label className="mt-5 mb-3">
                                        RTCP Address:
                                    </label>
                                    <label className="mt-7 mb-3">
                                        Multicast IP Range:
                                    </label>
                                    <label className="mt-5 mb-3">
                                        Multicast RTP Port:
                                    </label>
                                    <label className="mt-7 mb-3">
                                        Multicast RTCP Port:
                                    </label>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="flex flex-col">
                                    <Checkbox
                                        className="my-3"
                                        value={rtsp.toString()}
                                        checked={rtsp}
                                        onChange={handleRtsp}
                                    />
                                    <Checkbox
                                        className="my-3"
                                        value={rtspDisable.toString()}
                                        checked={rtspDisable}
                                        onChange={handleRtspDisable}
                                    />
                                    <textarea
                                        className="my-2  pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        value={protocols}
                                        onChange={handleProtocols}
                                    />
                                    <Checkbox
                                        className="my-2"
                                        value={encryption.toString()}
                                        checked={encryption}
                                        onChange={handleEncryption}
                                    />
                                    <input
                                        type="text"
                                        className="my-2  pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        value={rtspAddress}
                                        onChange={handleRtspAddress}
                                    />
                                    <input
                                        type="text"
                                        className="my-2  pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        value={rtspsAddress}
                                        onChange={handleRtspsAddress}
                                    />
                                    <input
                                        type="text"
                                        className="my-2  pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        value={rtpAddress}
                                        onChange={handleRtpAddress}
                                    />
                                    <input
                                        type="text"
                                        className="my-3  pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        value={rtcpAddress}
                                        onChange={handleRtcpAddress}
                                    />
                                    <input
                                        type="text"
                                        className="my-2  pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        value={multicastIPRange}
                                        onChange={handleMulticastIPRange}
                                    />
                                    <input
                                        type="number"
                                        className="my-2  pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        value={multicastRTPPort}
                                        onChange={(event) =>
                                            handleMulticastRTPPort(
                                                event.target.value
                                            )
                                        }
                                    />
                                    <input
                                        type="number"
                                        className="my-3  pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        value={multicastRTCPPort}
                                        onChange={(event) =>
                                            handleMulticastRTCPPort(
                                                event.target.value
                                            )
                                        }
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
    );
}
