import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import Toggle from "../../components/toggle/toggle";
import ModalConfirm from "../../components/modals/modalConfirm";

export default function RtspSetting({ settings, onSave, patchSetting }) {
    const [rtsp, setRtsp] = useState(settings.rtsp || true);
    const [rtspDisable, setRtspDisable] = useState(
        settings.rtspDisable || false
    );
    const [protocols, setProtocols] = useState(
        settings.protocols || ["multicast", "tcp", "udp"]
    );
    const [rtspEncryptionToggle, setRtspEncryptionToggle] = useState(false);
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

    const initialSettings = {
        ...settings
    };

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleCancel = () => {
        setRtsp(initialSettings.rtsp);
        setRtspDisable(initialSettings.rtspDisable);
        setProtocols(initialSettings.protocols);
        setEncryption(initialSettings.encryption);
        setRtspAddress(initialSettings.rtspAddress);
        setRtspsAddress(initialSettings.rtspsAddress);
        setRtpAddress(initialSettings.rtpAddress);
        setRtcpAddress(initialSettings.rtcpAddress);
        setMulticastIPRange(initialSettings.multicastIPRange);
        setMulticastRTPPort(initialSettings.multicastRTPPort);
        setMulticastRTCPPort(initialSettings.multicastRTCPPort);
    };

    const showConfirmation = () => {
        setShowConfirmationModal(true);
    };

    const hideConfirmation = () => {
        setShowConfirmationModal(false);
    };

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
        setRtspEncryptionToggle(!rtspEncryptionToggle);
        setEncryption(rtspEncryptionToggle ? "no" : "yes");
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
        setRtspEncryptionToggle(settings.encryption == "yes" ? true : false);
        setRtspAddress(settings.rtspAddress || ":8554");
        setRtspsAddress(settings.rtspsAddress || ":8322");
        setRtpAddress(settings.rtpAddress || ":8000");
        setRtcpAddress(settings.rtcpAddress || ":8001");
        setMulticastIPRange(settings.multicastIPRange || "224.1.0.0/16");
        setMulticastRTPPort(settings.multicastRTPPort || 8002);
        setMulticastRTCPPort(settings.multicastRTCPPort || 8003);
    }, [settings]);

    const handleSaveConfig = () => {
        hideConfirmation();
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

    const RtspSection = () => (
        <div className="grid  w-full  grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 ">
            <div>
                <h2 className="text-base font-semibold leading-7 text-white">
                    RTSP
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400"></p>
            </div>
            <div className="col-span-2 gap-4 w-fit   grid-rows-7 grid grid-cols-2">
                <label className="place-content-center  my-auto  col-start-1 row-start-1 row-end-2 ">
                    Enable RTSP:
                </label>
                <label className="place-content-center my-auto col-start-1 row-start-2 row-end-3 ">
                    RTSP Disable:
                </label>
                <label className="place-content-center col-start-1 row-start-3 row-end-4 my-auto">
                    Protocols:
                </label>
                <label className="place-content-center col-start-1 row-start-4 row-end-5 my-auto">
                    RTSP Encryption:
                </label>
                <label className="place-content-center col-start-1 row-start-5 row-end-6 my-auto">
                    RTSP Address:
                </label>
                <label className="place-content-center col-start-1 row-start-6 row-end-7 my-auto">
                    RTSPS Address:
                </label>
                <label className="place-content-center col-start-1 row-start-7 row-end-8 my-auto">
                    Multicast IP Range:
                </label>
                <Toggle
                    className=" row-start-1 my-auto place-content-center row-end-2"
                    enabled={rtsp}
                    onChange={handleRtsp}
                />
                <Toggle
                    className=" row-start-2 my-auto place-content-center row-end-3"
                    enabled={rtspDisable}
                    onChange={handleRtspDisable}
                />
                <textarea
                    name="Protocols"
                    className="resize-none row-start-3 row-end-4 my-2 h-16 col-span-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                    value={protocols}
                    onChange={handleProtocols}
                />
                <Toggle
                    className=" row-start-4 my-auto place-content-center row-end-5"
                    enabled={rtspEncryptionToggle} // Fix: Set enabled to rtspEncryptionToggle
                    onChange={handleEncryption}
                />

                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-5 row-end-6 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={rtspAddress}
                    onChange={handleRtspAddress}
                />

                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-6 row-end-7 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={rtspsAddress}
                    onChange={handleRtspsAddress}
                />
                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-7 row-end-8 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={multicastIPRange}
                    onChange={handleMulticastIPRange}
                />
            </div>
        </div>
    );

    const RTPSection = () => (
        <div className="grid  w-full  grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 ">
            <div>
                <h2 className="text-base font-semibold leading-7 text-white">
                    RTP
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400"></p>
            </div>
            <div className="col-span-2 gap-4 w-fit   grid-rows-2 grid grid-cols-2">
                <label className="place-content-center  my-auto  col-start-1 row-start-1 row-end-2 ">
                    RTP Address:
                </label>
                <label className="place-content-center  my-auto  col-start-1 row-start-2 row-end-3 ">
                    Multicast RTP Port:
                </label>
                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-1 row-end-2 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={rtpAddress}
                    onChange={handleRtpAddress}
                />
                <input
                    type="number"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-2 row-end-3 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={multicastRTPPort}
                    onChange={handleMulticastRTPPort}
                />
            </div>
        </div>
    );

    const RTCPSection = () => (
        <div className="grid  w-full  grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 ">
            <div>
                <h2 className="text-base font-semibold leading-7 text-white">
                    RTCP
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400"></p>
            </div>
            <div className="col-span-2 gap-4 w-fit   grid-rows-2 grid grid-cols-2">
                <label className="place-content-center  my-auto  col-start-1 row-start-1 row-end-2 ">
                    RTCP Address:
                </label>
                <label className="place-content-center  my-auto  col-start-1 row-start-2 row-end-3 ">
                    Multicast RTCP Port:
                </label>
                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-1 row-end-2 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={rtcpAddress}
                    onChange={handleRtcpAddress}
                />
                <input
                    type="number"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-2 row-end-3 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={multicastRTCPPort}
                    onChange={handleMulticastRTCPPort}
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
                            RTSP Setting
                        </h2>

                        <div className="divide-y  w-full divide-window-dark-500">
                            {RtspSection()}
                            {RTPSection()}
                            {RTCPSection()}
                        </div>
                        <div className="my-6 flex justify-end fixed bottom-0 right-0">
                            <button
                                type="button"
                                className="dark:text-text-dark text-text-light bg-accent-color1-700 hover:bg-accent-color1-800 ml-4 font-bold py-2 px-4 rounded"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="dark:text-text-dark text-text-light bg-accent-color1-700 hover:bg-accent-color1-800 mx-4 font-bold py-2 px-4 rounded"
                                onClick={showConfirmation}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
            <ModalConfirm
                confirmText={"Are you sure you want to apply the changes?"}
                confirmTitle={"Apply RTSP Setting ?"}
                    onConfirm={handleSaveConfig}
                    isOpen={showConfirmationModal}
                    onClose={hideConfirmation}
                />
        </div>
    );
}
