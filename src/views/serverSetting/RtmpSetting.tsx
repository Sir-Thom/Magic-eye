import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import Checkbox from "../../components/checkBox/checkBox";

export default function RtmpSetting({ settings, onSave }) {
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

  const handleRtmp = (event) => {
    setRtmp(event.target.checked);
  };

  const handleRtmpDisabled = (event) => {
    setRtmpDisabled(event.target.checked);
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
                RTMP Setting
              </h2>
              <div className="flex justify-between flex-col items-center my-4 flex-1 ">
                <label className="flex text-justify items-center">
                  RTSP
                  <Checkbox
                    value={rtmp.toString()}
                    checked={rtmp}
                    onChange={handleRtmp}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col items-center my-4 flex-1 ">
                <label className="flex text-justify items-center">
                  RTSP Disabled
                  <Checkbox
                    value={rtmpDisabled.toString()}
                    checked={rtmpDisabled}
                    onChange={handleRtmpDisabled}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Rtmp Address:
                  <div className="mx-2">
                    <input
                      type="text"
                      className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={rtmpAddress}
                      onChange={handleRtmpAddress}
                    />
                  </div>
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Rtmp Encryption:
                  <div className="mx-2">
                    <input
                      type="text"
                      className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={rtmpEncryption}
                      onChange={handleRtmpEncryption}
                    />
                  </div>
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Rtmps Address:
                  <div className="mx-2">
                    <input
                      type="text"
                      className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={rtmpsAddress}
                      onChange={handleRtmpsAddress}
                    />
                  </div>
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Rtmp Server Key:
                  <div className="mx-2">
                    <input
                      type="text"
                      className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={rtmpServerKey}
                      onChange={handleRtmpServerKey}
                    />
                  </div>
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  rtmp Server Cert:
                  <div className="mx-2">
                    <input
                      type="text"
                      className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={rtmpServerCert}
                      onChange={handleRtmpServerCert}
                    />
                  </div>
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
