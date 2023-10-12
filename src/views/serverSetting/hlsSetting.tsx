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
      <div className="w-3/4 mx-auto flex justify-center items-start min-h-screen">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {settings && (
            <div className="">
              <h2 className=" mx-auto text-center font-bold text-3xl">
                HLS Setting
              </h2>
              <div className="grid grid-cols-2 content-between place-content-start mt-6 gap-4">
                {/* Labels column */}

                <div className="col-span-1">
                  <div className="flex flex-col align-baseline text-justify items-end">
                    <label className="mb-2">HLS:</label>
                    <label className="mb-2">HLS Address:</label>
                    <label className="mb-2">HLS Allow Origin:</label>
                    <label className="mb-2">HLS Always Remux:</label>
                    <label className="mb-2">HLS Directory:</label>
                    <label className="mb-2">HLS Disable:</label>
                    <label className="mb-2">HLS Encryption:</label>
                    <label className="mb-2">HLS Part Duration:</label>
                    <label className="mb-2">HLS Segment Count:</label>
                    <label className="mb-2">HLS Segment Duration:</label>
                    <label className="mb-2">HLS Segment Max Size:</label>
                    <label className="mb-2">HLS Server Cert:</label>
                    <label className="mb-2">HLS Server Key:</label>
                    <label className="mb-2">HLS Trusted Proxies:</label>
                    <label className="mb-2">HLS Variant:</label>
                  </div>
                </div>
                {/* Inputs column */}
                <div className="col-span-1">
                  <div className="flex flex-col">
                    <Checkbox
                      className="my-1"
                      value={hlsEnabled.toString()}
                      checked={hlsEnabled}
                      onChange={handleHlsEnabledChange}
                    />
                    <input
                      type="text"
                      className="appearance-none my-2  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={hlsAddress}
                      onChange={handleHlsAddressChange}
                    />
                    <input
                      type="text"
                      className="appearance-none my-2   border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={hlsAllowOrigin}
                      onChange={handleHlsAllowOriginChange}
                    />
                    <Checkbox
                      className="mb-2"
                      value={hlsAlwaysRemux.toString()}
                      onChange={handleHlsAlwaysRemuxChange}
                      checked={hlsAlwaysRemux}
                    />
                    <input
                      type="text"
                      className="appearance-none  my-2  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={hlsDirectory}
                      onChange={handleHlsDirectoryChange}
                    />
                    <Checkbox
                      className="mb-2"
                      value={hlsDisable.toString()}
                      onChange={handleHlsDisableChange}
                      checked={hlsDisable}
                    />
                    <Checkbox
                      className="mb-2"
                      value={hlsEncryption.toString()}
                      onChange={handleHlsEncryptionChange}
                      checked={hlsEncryption}
                    />
                    <input
                      type="text"
                      className="appearance-none my-2  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={hlsPartDuration}
                      onChange={handleHlsPartDurationChange}
                    />
                    <input
                      type="number"
                      className="appearance-none my-2  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={hlsSegmentCount}
                      onChange={handleHlsSegmentCountChange}
                    />
                    <input
                      type="text"
                      className="appearance-none  my-2 pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={hlsSegmentDuration}
                      onChange={handleHlsSegmentDurationChange}
                    />
                    <input
                      type="text"
                      className="appearance-none  my-2  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      onChange={handleHlsSegmentMaxSizeChange}
                    />
                    <input
                      type="text"
                      className="appearance-none my-2  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={hlsServerCert}
                      onChange={handleHlsServerCertChange}
                    />
                    <input
                      type="text"
                      className="appearance-none my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={hlsServerKey}
                      onChange={handleHlsServerKeyChange}
                    />
                    <textarea
                      name="hlsTrustedProxies"
                      style={{ resize: "none" }}
                      className="appearance-none my-2   border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={hlsTrustedProxies}
                      onChange={handleHlsTrustedProxiesChange}
                    />
                    <input
                      type="text"
                      className="appearance-none  my-2  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={hlsVariant}
                      onChange={handleHlsVariantChange}
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
