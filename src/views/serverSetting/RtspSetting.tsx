import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import Checkbox from "../../components/checkBox/checkBox";
import NumericInput from "../../components/inputNumber/inputNumber";

export default function RtspSetting({ settings, onSave }) {
  const [rtsp, setRtsp] = useState(settings.rtsp || true);
  const [rtspDisable, setRtspDisable] = useState(settings.rtspDisable || false);
  const [protocols, setProtocols] = useState(
    settings.protocols || ["multicast", "tcp", "udp"]
  );
  const [encryption, setEncryption] = useState(settings.encryption || false);
  const [rtspAddress, setRtspAddress] = useState(
    settings.rtspAddress || ":8554"
  );
  const [rtspsAddress, setRtspsAddress] = useState(
    settings.rtspsAddress || ":8322"
  );
  const [rtpAddress, setRtpAddress] = useState(settings.rtpAddress || ":8000");
  const [rtcpAddress, setRtcpAddress] = useState(
    settings.rtcpAddress || ":8001"
  );
  const [multicastIPRange, setMulticastIPRange] = useState("224.1.0.0/16");
  const [multicastRTPPort, setMulticastRTPPort] = useState(8002);
  const [multicastRTCPPort, setMulticastRTCPPort] = useState(8003);

  const handleRtsp = (event) => {
    setRtsp(event.target.checked);
  };

  const handleRtspDisable = (event) => {
    setRtspDisable(event.target.checked);
  };

  const handleProtocols = (event) => {
    setProtocols(event.target.value);
  };

  const handleEncryption = (event) => {
    setEncryption(event.target.checked);
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

  const handleSaveConfig = () => {
    // Update the settings state with the modified values
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
                RTSP Setting
              </h2>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  RTSP:
                  <Checkbox
                    value={rtsp.toString()}
                    onChange={handleRtsp}
                    checked={rtsp}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Rtsp Disable:
                  <Checkbox
                    value={rtspDisable.toString()}
                    onChange={handleRtspDisable}
                    checked={rtspDisable}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Protocols:
                  <div className="mx-2">
                    <textarea
                      name="protocols"
                      style={{ resize: "none" }}
                      className="mx-2"
                      value={protocols}
                      onChange={handleProtocols}
                    />
                  </div>
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Rtsp Encryption:
                  <Checkbox
                    value={encryption.toString()}
                    onChange={handleEncryption}
                    checked={encryption}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Rtsp Address:
                  <input
                    type="text"
                    className="appearance-none py-2 pl-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                    value={rtspAddress}
                    onChange={handleRtspAddress}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Rtsps Address:
                  <input
                    type="text"
                    className="appearance-none py-2 pl-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                    value={rtspsAddress}
                    onChange={handleRtspsAddress}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Rtp Address:
                  <input
                    type="text"
                    className="appearance-none py-2 pl-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                    value={rtpAddress}
                    onChange={handleRtpAddress}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Rtcp Address:
                  <input
                    type="text"
                    className="appearance-none py-2  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                    value={rtcpAddress}
                    onChange={handleRtcpAddress}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  MulticastIPRange:
                  <input
                    type="text"
                    className="appearance-none  py-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                    value={multicastIPRange}
                    onChange={handleMulticastIPRange}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  multicastRTPPort:
                  <div className=" mx-2">
                    <NumericInput
                      value={multicastRTPPort}
                      onChange={handleMulticastRTPPort}
                      placeholder={undefined}
                    />
                  </div>
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  multicastRTCPPort:
                  <div className="mx-2">
                    <NumericInput
                      value={multicastRTCPPort}
                      onChange={handleMulticastRTCPPort}
                      placeholder={undefined}
                    />
                  </div>
                </label>
              </div>
              <div className="absolute bottom-0 right-0 mb-4 flex justify-end items-end">
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
