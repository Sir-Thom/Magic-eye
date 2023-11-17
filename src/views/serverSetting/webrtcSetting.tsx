import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import { ICEServer } from "../../interfaces/IServer";
import Toggle from "../../components/toggle/toggle";

export default function WebrtcSetting({ settings, onSave, patchSetting }) {
    const [webrtc, setWebrtc] = useState(settings.webrtc || true);
     
    const [webrtcAddress, setWebrtcAddress] = useState(
        settings.webrtcAddress || ":8889"
    );
    const [webrtcEncryption, setWebrtcEncryption] = useState(
        settings.webrtcEncryption || false
    );
    const [webrtcKey, setWebrtcKey] = useState(
        settings.webrtcServerKey || "server.key"
    );
    const [webrtcCert, setWebrtcCert] = useState(
        settings.webrtcServerCert || "server.crt"
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

    const handleWebrtc = () => {
        setWebrtc(!webrtc);
    };
    console.log(webrtc);

    const handleWebrtcAddress = (event) => {
        setWebrtcAddress(event.target.value);
    };

    const handleWebrtcEncryption = () => {
        setWebrtcEncryption(!webrtcEncryption);
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

    useEffect(() => {
        setWebrtc(settings.webrtc);
        setWebrtcAddress(settings.webrtcAddress || ":8889");
        setWebrtcEncryption(settings.webrtcEncryption || false);
        setWebrtcKey(settings.webrtcServerKey || "server.key");
        setWebrtcCert(settings.webrtcServerCert || "server.crt");
        setWebrtcAllowOrigin(settings.webrtcAllowOrigin || "*");
        setWebrtcTrustedProxies(settings.webrtcTrustedProxies || []);
        setWebrtcICEServers(settings.webrtcICEServers || null);
        setWebrtcICEServers2(
            settings.webrtcICEServers2 || {
                url: "",
                username: "",
                password: ""
            }
        );
        setWebrtcICEHostNAT1To1IPs(settings.webrtcICEHostNAT1To1IPs || []);
        setWebrtcICEUDPMuxAddress(settings.webrtcICEUDPMuxAddress || "");
        setWebrtcICETCPMuxAddress(settings.webrtcICETCPMuxAddress || "");
    }, [settings]);
    console.log(settings);

    const handleSaveConfig = () => {
        // Create an updated settings object with the modified logging settings
        const updatedSettings = {
            ...settings,
            webrtc: webrtc,
            webrtcAddress: webrtcAddress,
            webrtcEncryption: webrtcEncryption,
            webrtcServerKey: webrtcKey,
            webrtcServerCert: webrtcCert,
            webrtcAllowOrigin: webrtcAllowOrigin,
            webrtcTrustedProxies: webrtcTrustedProxies,
            webrtcICEServers: webrtcICEServers,
            webrtcICEServers2: webrtcICEServers2,
            webrtcICEHostNAT1To1IPs: webrtcICEHostNAT1To1IPs,
            webrtcICEUDPMuxAddress: webrtcICEUDPMuxAddress,
            webrtcICETCPMuxAddress: webrtcICETCPMuxAddress
        };
        onSave(updatedSettings);
        patchSetting(updatedSettings);
    };

    return (
        <>
              <div className="w-full h-full flex justify-center items-center">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full max-w-2xl p-8 ml-20  rounded-md"
      >
                    {settings && (
                        
                        <div className="space-y-6">
                        <h2 className="text-center font-bold text-3xl">Webrtc Setting</h2>
                       {/* <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                        <div>
                          <h2 className="text-base font-semibold leading-7 text-white">Change password</h2>
                          <p className="mt-1 text-sm leading-6 text-gray-400">
                            Update your password associated with your account.
                          </p>
                        </div>
        
                        <form className="md:col-span-2">
                          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                            <div className="col-span-full">
                              <label htmlFor="current-password" className="block text-sm font-medium leading-6 text-white">
                                Current password
                              </label>
                              <div className="mt-2">
                                <input
                                  id="current-password"
                                  name="current_password"
                                  type="password"
                                  autoComplete="current-password"
                                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div className="col-span-full">
                      <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-white">
                        New password
                      </label>
                      <div className="mt-2">
                        <input
                          id="new-password"
                          name="new_password"
                          type="password"
                          autoComplete="new-password"
                          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-white">
                        Confirm password
                      </label>
                      <div className="mt-2">
                        <input
                          id="confirm-password"
                          name="confirm_password"
                          type="password"
                          autoComplete="new-password"
                          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex">
                    <button
                     
                      className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                    </form>*/}
              
                        <div className="grid place-content-start grid-cols-2 gap-12">
                                <div className="col-span-1">
                                    <div className="flex flex-col align-baseline text-justify items-end">
                                        <label className="my-2">Webrtc:</label>
                                        <label className="mt-4 mb-3">
                                            Webrtc Address:
                                        </label>
                                        <label className="my-3">
                                            Webrtc Encryption:
                                        </label>

                                        <label className="mt-4 mb-3">
                                            Webrtc Server Key:
                                        </label>
                                        <label className="mt-6 mb-4">
                                            Webrtc Server Certificate:
                                        </label>
                                        <label className="mt-5 mb-3">
                                            Webrtc Allow Origin:
                                        </label>
                                        <label className="mt-8 mb-6">
                                            Webrtc Trusted Proxies:
                                        </label>
                                        <label className="mt-8 mb-3">
                                            Webrtc ICE Servers:
                                        </label>
                                        <label className="mt-5 mb-32">
                                            Webrtc ICE Servers2:
                                        </label>
                                        <label className="mt-4
                                         mb-5">
                                            Webrtc ICE Host NAT 1 To 1 IPs:
                                        </label>
                                        <label className="mt-7 mb-5">
                                            Webrtc ICE UDP Mux Address:
                                        </label>
                                        <label className="mt-5 mb-3">
                                            Webrtc ICE TCP Mux Address:
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-4">
                                    <div className="flex flex-col">
                                        <Toggle
                                            className="my-3"
                                            value={webrtc.toString()}
                                            enabled={webrtc}
                                            onChange={handleWebrtc}
                                        />

                                        <input
                                            type="text"
                                            className="my- h-8  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={webrtcAddress}
                                            onChange={handleWebrtcAddress}
                                        />
                                        <Toggle
                                            className="my-3"
                                            value={webrtcEncryption.toString()}
                                            enabled={webrtcEncryption}
                                            onChange={handleWebrtcEncryption}
                                        />
                                        <input
                                            type="text"
                                            className="my-2 h-8  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={webrtcKey}
                                            onChange={handleWebrtcKey}
                                        />
                                        <input
                                            type="text"
                                            className="my-3 h-8  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={webrtcCert}
                                            onChange={handleWebrtcCert}
                                        />
                                        <input
                                            type="text"
                                            className="my-2 h-8  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={webrtcAllowOrigin}
                                            onChange={handleWebrtcAllowOrigin}
                                        />
                                        <textarea
                                            name="webrtcTrustedProxies"
                                            className="resize-none my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={webrtcTrustedProxies}
                                            onChange={
                                                handleWebrtcTrustedProxies
                                            }
                                        />
                                        <textarea
                                            name="webrtcICEServers"
                                            className="resize-none my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={webrtcICEServers}
                                            onChange={handleWebrtcICEServers}
                                        />
                                        <div className="my-6 mx-2">
                                            <label className="my-2 mx-2">
                                                URL:
                                            </label>
                                            <input
                                                title="url"
                                                type="text"
                                                className="s my-2 h-8  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                                value={webrtcICEServers2.url}
                                                onChange={
                                                    handleWebrtcICEServers2
                                                }
                                            />
                                            <label className="my-2 mx-2">
                                                Username:
                                            </label>
                                            <input
                                                title="username"
                                                type="text"
                                                className="my-2 h-8  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                                value={
                                                    webrtcICEServers2.username
                                                }
                                                onChange={
                                                    handleWebrtcICEServers2
                                                }
                                            />
                                            <label className="my-2 mx-2">
                                                Password:
                                            </label>
                                            <input
                                                title="password"
                                                type="text"
                                                className="my-2 h-8  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                                value={
                                                    webrtcICEServers2.password
                                                }
                                                onChange={
                                                    handleWebrtcICEServers2
                                                }
                                            />
                                        </div>
                                        <textarea
                                            name="webrtcICEHostNAT1To1IPs"
                                            className="resize-none my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={webrtcICEHostNAT1To1IPs}
                                            onChange={
                                                handleWebrtcICEHostNAT1To1IPs
                                            }
                                        />
                                        <input
                                            type="text"
                                            className="my-2 h-8  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={webrtcICEUDPMuxAddress}
                                            onChange={
                                                handleWebrtcICEUDPMuxAddress
                                            }
                                        />
                                        <input
                                            type="text"
                                            className="my-3 h-8  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={webrtcICETCPMuxAddress}
                                            onChange={
                                                handleWebrtcICETCPMuxAddress
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
        </>
    );
}
