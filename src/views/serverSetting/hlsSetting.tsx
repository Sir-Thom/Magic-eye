import { useState } from "react";
import { motion } from "framer-motion";

import { fadeIn } from "../../utils/animation/screenAnimation";

import Checkbox from "../../components/checkBox/checkBox";

export default function HlsSetting({ settings, onSave }) {
  const [hlsEnabled, setHlsEnabled] = useState(settings.hls || true);
  const [hlsAddress, setHlsAddress] = useState(settings.hlsAddress || ":8888");
  const [hlsAllowOrigin, setHlsAllowOrigin] = useState(
    settings.hlsAllowOrigin || "*"
  );
  const [hlsAlwaysRemux, setHlsAlwaysRemux] = useState(
    settings.hlsAlwaysRemux || false
  );
  const [hlsDirectory, setHlsDirectory] = useState(settings.hlsDirectory || "");
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

  const handleHlsEnabledChange = (event) => {
    setHlsEnabled(event.target.checked);
  };

  const handleHlsAddressChange = (event) => {
    setHlsAddress(event.target.value);
  };
  const handleHlsAllowOriginChange = (event) => {
    setHlsAllowOrigin(event.target.value);
  };

  const handleHlsAlwaysRemuxChange = (event) => {
    setHlsAlwaysRemux(event.target.checked);
  };

  const handleHlsDirectoryChange = (event) => {
    setHlsDirectory(event.target.value);
  };

  const handleHlsDisableChange = (event) => {
    setHlsDisable(event.target.checked);
  };

  const handleHlsEncryptionChange = (event) => {
    setHlsEncryption(event.target.checked);
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
                HLS Setting
              </h2>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  HLS:
                  <Checkbox
                    value={hlsEnabled.toString()}
                    checked={hlsEnabled}
                    onChange={handleHlsEnabledChange}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  HLS Address:
                  <input
                    type="text"
                    className="appearance-none   border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                    value={hlsAddress}
                    onChange={handleHlsAddressChange}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  HLS Allow Origin:
                  <input
                    type="text"
                    className="appearance-none   border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                    value={hlsAllowOrigin}
                    onChange={handleHlsAllowOriginChange}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  HLS Always Remux:
                  <Checkbox
                    value={hlsAlwaysRemux.toString()}
                    onChange={handleHlsAlwaysRemuxChange}
                    checked={hlsAlwaysRemux}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  HLS Directory:
                  <input
                    type="text"
                    className="appearance-none   border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                    value={hlsDirectory}
                    onChange={handleHlsDirectoryChange}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  HLS Disable:
                  <Checkbox
                    value={hlsDisable.toString()}
                    onChange={handleHlsDisableChange}
                    checked={hlsDisable}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  HLS Encryption:
                  <Checkbox
                    value={hlsEncryption.toString()}
                    onChange={handleHlsEncryptionChange}
                    checked={hlsEncryption}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  HLS Part Duration:
                  <input
                    type="text"
                    className="appearance-none   border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                    value={hlsPartDuration}
                    onChange={handleHlsPartDurationChange}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  HLS Segment Count:
                  <input
                    type="number"
                    className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                    value={hlsSegmentCount}
                    onChange={handleHlsSegmentCountChange}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  HLS Segment Duration:
                  <input
                    type="text"
                    className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                    value={hlsSegmentDuration}
                    onChange={handleHlsSegmentDurationChange}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  HLS Segment Max Size:
                  <input
                    type="text"
                    className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                    onChange={handleHlsSegmentMaxSizeChange}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  HLS Server Cert:
                  <input
                    type="text"
                    className="appearance-none   border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                    value={hlsServerCert}
                    onChange={handleHlsServerCertChange}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  HLS Server Key:
                  <input
                    type="text"
                    className="appearance-none   border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                    value={hlsServerKey}
                    onChange={handleHlsServerKeyChange}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  HLS Trusted Proxies:
                  <textarea
                    name="hlsTrustedProxies"
                    style={{ resize: "none" }}
                    className="appearance-none   border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                    value={hlsTrustedProxies}
                    onChange={handleHlsTrustedProxiesChange}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  HLS Variant:
                  <input
                    type="text"
                    className="appearance-none   border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                    value={hlsVariant}
                    onChange={handleHlsVariantChange}
                  />
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
