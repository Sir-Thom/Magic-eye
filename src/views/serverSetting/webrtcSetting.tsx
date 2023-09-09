import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import Checkbox from "../../components/checkBox/checkBox";
import { ICEServer } from "../../interfaces/IServer";

export default function WebrtcSetting({ settings, onSave }) {
  const [webrtc, setWebrtc] = useState(settings.webrtc || true);
  const [webrtcDisabled, setWebrtcDisabled] = useState(
    settings.webrtcDisabled || false
  );
  const [webrtcAddress, setWebrtcAddress] = useState(
    settings.webrtcAddress || ":8889"
  );
  const [webrtcEncryption, setWebrtcEncryption] = useState(
    settings.webrtcEncryption || false
  );
  const [webrtcKey, setWebrtcKey] = useState(
    settings.webrtcKey || "server.key"
  );
  const [webrtcCert, setWebrtcCert] = useState(
    settings.webrtcCert || "server.crt"
  );
  const [webrtcAllowOrigin, setWebrtcAllowOrigin] = useState(
    settings.webrtcAllowOrigin || "*"
  );
  const [webrtcTrustedProxies, setWebrtcTrustedProxies] = useState(
    settings.webrtcTrustedProxies || []
  );
  const [webrtcICEServers, setWebrtcICEServers] = useState(
    settings.webrtcICEServers || null
  );
  const [webrtcICEServers2, setWebrtcICEServers2] = useState<ICEServer>(
    settings.webrtcICEServers2 || {
      url: "",
      username: "",
      password: ""
    }
  );
  const [webrtcICEHostNAT1To1IPs, setWebrtcICEHostNAT1To1IPs] = useState(
    settings.webrtcICEHostNAT1To1IPs || []
  );
  const [webrtcICEUDPMuxAddress, setWebrtcICEUDPMuxAddress] = useState(
    settings.webrtcICEUDPMuxAddress || ""
  );
  const [webrtcICETCPMuxAddress, setWebrtcICETCPMuxAddress] = useState(
    settings.webrtcICETCPMuxAddress || ""
  );

  const handleWebrtc = (event) => {
    setWebrtc(event.target.checked);
  };

  const handleWebrtcDisabled = (event) => {
    setWebrtcDisabled(event.target.checked);
  };

  const handleWebrtcAddress = (event) => {
    setWebrtcAddress(event.target.value);
  };

  const handleWebrtcEncryption = (event) => {
    setWebrtcEncryption(event.target.checked);
  };

  const handleWebrtcKey = (event) => {
    setWebrtcKey(event.target.value);
  };

  const handleWebrtcCert = (event) => {
    setWebrtcCert(event.target.value);
  };

  const handleWebrtcAllowOrigin = (event) => {
    setWebrtcAllowOrigin(event.target.value);
  };

  const handleWebrtcTrustedProxies = (event) => {
    setWebrtcTrustedProxies(event.target.value);
  };

  const handleWebrtcICEServers = (event) => {
    setWebrtcICEServers(event.target.value);
  };

  const handleWebrtcICEServers2 = (event) => {
    setWebrtcICEServers2(event.target.value);
  };

  const handleWebrtcICEHostNAT1To1IPs = (event) => {
    setWebrtcICEHostNAT1To1IPs(event.target.value);
  };

  const handleWebrtcICEUDPMuxAddress = (event) => {
    setWebrtcICEUDPMuxAddress(event.target.value);
  };

  const handleWebrtcICETCPMuxAddress = (event) => {
    setWebrtcICETCPMuxAddress(event.target.value);
  };

  const handleSaveConfig = () => {
    // Create an updated settings object with the modified logging settings
    const updatedSettings = {
      ...settings,
      webrtc: webrtc,
      webrtcDisabled: webrtcDisabled,
      webrtcAddress: webrtcAddress,
      webrtcEncryption: webrtcEncryption,
      webrtcKey: webrtcKey,
      webrtcCert: webrtcCert,
      webrtcAllowOrigin: webrtcAllowOrigin,
      webrtcTrustedProxies: webrtcTrustedProxies,
      webrtcICEServers: webrtcICEServers,
      webrtcICEServers2: webrtcICEServers2,
      webrtcICEHostNAT1To1IPs: webrtcICEHostNAT1To1IPs,
      webrtcICEUDPMuxAddress: webrtcICEUDPMuxAddress,
      webrtcICETCPMuxAddress: webrtcICETCPMuxAddress
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
                Webrtc Setting
              </h2>
              <div className="flex justify-between flex-col items-center my-4 flex-1 ">
                <label className="flex text-justify items-center">
                  Webrtc
                  <Checkbox
                    value={webrtc.toString()}
                    checked={webrtc}
                    onChange={handleWebrtc}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col items-center my-4 flex-1 ">
                <label className="flex text-justify items-center">
                  Webrtc Disabled
                  <Checkbox
                    value={webrtcDisabled.toString()}
                    checked={webrtcDisabled}
                    onChange={handleWebrtcDisabled}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Webrtc Address:
                  <input
                    type="text"
                    className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                    value={webrtcAddress}
                    onChange={handleWebrtcAddress}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Webrtc Encryption:
                  <Checkbox
                    value={webrtcEncryption.toString()}
                    checked={webrtcEncryption}
                    onChange={handleWebrtcEncryption}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Webrtc Server Key:
                  <input
                    type="text"
                    className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                    value={webrtcKey}
                    onChange={handleWebrtcKey}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Webrtc Server Certificate:
                  <input
                    type="text"
                    className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                    value={webrtcCert}
                    onChange={handleWebrtcCert}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col items-center my-4 flex-2 ">
                <label className="flex text-justify items-center">
                  Webrtc Allow Origin:
                  <input
                    type="text"
                    className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                    value={webrtcAllowOrigin}
                    onChange={handleWebrtcAllowOrigin}
                  />
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Webrtc Trusted Proxies:
                  <div className="mx-2">
                    <textarea
                      name="webrtcTrustedProxies"
                      className="appearance-none resize-none   border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={webrtcTrustedProxies}
                      onChange={handleWebrtcTrustedProxies}
                    />
                  </div>
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Webrtc ICE Servers:
                  <div className="mx-2">
                    <textarea
                      name="webrtcICEServers"
                      className="appearance-none resize-none   border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={webrtcICEServers}
                      onChange={handleWebrtcICEServers}
                    />
                  </div>
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Webrtc ICE Servers2:
                  <div className="mx-2">
                    <label className="flex text-justify items-center">
                      url:
                      <input
                        title="url"
                        type="text"
                        className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                        value={webrtcICEServers2.url}
                        onChange={handleWebrtcICEServers2}
                      />
                    </label>
                    <label className="flex text-justify items-center">
                      username:
                      <input
                        title="username"
                        type="text"
                        className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                        value={webrtcICEServers2.username}
                        onChange={handleWebrtcICEServers2}
                      />
                    </label>
                    <label className="flex text-justify items-center">
                      password:
                      <input
                        title="password"
                        type="text"
                        className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                        value={webrtcICEServers2.password}
                        onChange={handleWebrtcICEServers2}
                      />
                    </label>
                  </div>
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Webrtc ICE Host NAT 1 To 1 IPs:
                  <div className="mx-2">
                    <textarea
                      name="webrtcICEHostNAT1To1IPs"
                      className="appearance-none resize-none   border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={webrtcICEHostNAT1To1IPs}
                      onChange={handleWebrtcICEHostNAT1To1IPs}
                    />
                  </div>
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Webrtc ICE UDP Mux Address:
                  <div className="mx-2">
                    <input
                      type="text"
                      className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={webrtcICEUDPMuxAddress}
                      onChange={handleWebrtcICEUDPMuxAddress}
                    />
                  </div>
                </label>
              </div>
              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Webrtc ICE TCP Mux Address:
                  <div className="mx-2">
                    <input
                      type="text"
                      className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={webrtcICETCPMuxAddress}
                      onChange={handleWebrtcICETCPMuxAddress}
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
