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
   
    const renderWebrtcSectionAddress = () => (
             <div className="grid  w-full  grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 bg-window-dark-800">
      <div>
        <h2 className="text-base font-semibold leading-7 text-white">Webrtc Address</h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
             
        </p>
      </div>
          <div className="col-span-1 ">
            <div className="flex flex-col align-baseline items-end">
              <label className="my-2">Webrtc:</label>
              <label className="mt-4 mb-3">Webrtc Address:</label>
              </div>
          </div>
          <div className=" flex flex-col">
            <Toggle
              className="my-3"
              value={webrtc.toString()}
              enabled={webrtc}
              onChange={handleWebrtc}
            />
            <input
              type="text"
              className="my-2 h-8  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
              value={webrtcAddress}
              onChange={handleWebrtcAddress}
            />
               </div>

        </div>
        );

        const renderWebrtcSectionSecurity = () => (
            <div className="grid grid-cols-1 w-full gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 bg-window-dark-800">
     <div>
       <h2 className="text-base font-semibold leading-7 text-white">Security</h2>
       <p className="mt-1 text-sm leading-6 text-gray-400">
            
       </p>
     </div>
         <div className="col-span-1 ">
           <div className="flex flex-col align-baseline items-end">
           <label className="my-3">Webrtc Encryption:</label>
              <label className="mt-4 mb-3">Webrtc Server Key:</label>
              <label className="mt-6 mb-4">Webrtc Server Certificate:</label>
              <label className="mt-5 mb-3">Webrtc Allow Origin:</label>
              <label className="mt-8 mb-6">Webrtc Trusted Proxies:</label>
             </div>
         </div>
         <div className=" flex flex-col">
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
              onChange={handleWebrtcTrustedProxies}
            />
              </div>

       </div>
       );

       const renderWebrtcSectionICEServers = () => (
        <div className="grid  w-full grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 bg-window-dark-800">
          <div className="col-span-3">
            <h2 className="text-base font-semibold leading-7 text-white mb-4">ICE Servers</h2>
          </div>
          <div className="col-span-1 grid grid-rows-5 gap-y-2">
            <label className="mt-16 mb-16">Webrtc ICE Servers:</label>
            <label className="mt-16 mb-32">Webrtc ICE Servers2:</label>
            <label className="mt-28 mb-38">Webrtc ICE Host NAT 1 To 1 IPs:</label>
            <label className="mt-2">Webrtc ICE UDP Mux Address:</label>
            <label className="mt-2">Webrtc ICE TCP Mux Address:</label>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-x-4">
            <textarea
              name="webrtcICEServers"
              className="resize-none my-2 h-40 col-span-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
              value={webrtcICEServers}
              onChange={handleWebrtcICEServers}
            />
            <div className="grid grid-cols-1 gap-x-4">
              <div className="flex flex-col my-2">
                <label className="my-2">URL:</label>
                <input
                  title="url"
                  type="text"
                  className="my-2 h-8 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  value={webrtcICEServers2.url}
                  onChange={handleWebrtcICEServers2}
                />
              </div>
              <div className="flex flex-col my-2">
                <label className="my-2">Username:</label>
                <input
                  title="username"
                  type="text"
                  className="my-2 h-8 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  value={webrtcICEServers2.username}
                  onChange={handleWebrtcICEServers2}
                />
              </div>
              <div className="flex flex-col my-2">
                <label className="my-2">Password:</label>
                <input
                  title="password"
                  type="password"
                  className="my-2 h-8 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  value={webrtcICEServers2.password}
                  onChange={handleWebrtcICEServers2}
                />
              </div>
            </div>
            <textarea
              name="webrtcICEHostNAT1To1IPs"
              className="resize-none my-2 h-16 col-span-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
              value={webrtcICEHostNAT1To1IPs}
              onChange={handleWebrtcICEHostNAT1To1IPs}
            />
            <input
              type="text"
              className="my-2 h-8 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
              value={webrtcICEUDPMuxAddress}
              onChange={handleWebrtcICEUDPMuxAddress}
            />
            <input
              type="text"
              className="my-3 h-8 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
              value={webrtcICETCPMuxAddress}
              onChange={handleWebrtcICETCPMuxAddress}
            />
          </div>
        </div>
      );
      
      
      
      
    
      
      return (
        <>
    <div className="mx-auto  w-full h-full flex justify-center items-start">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full  rounded-md"
      >
        {settings && (
          <div className="mx-auto w-full">
            <h2 className="text-center mb-4 font-bold text-3xl">Webrtc Setting</h2>
            <div className="divide-y divide-window-dark-500">
            {renderWebrtcSectionAddress()}
            {renderWebrtcSectionSecurity()}
            {renderWebrtcSectionICEServers()}
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