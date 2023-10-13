import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import Checkbox from "../../components/checkBox/checkBox";

export default function SRTSetting({ settings, onSave, postSetting }) {
  const [srt, setSRT] = useState(Boolean(settings.srt));
  const [srtAddress, setSRTAddress] = useState(settings.srtAddress);

  const handleSRTChange = () => {
    setSRT(!srt);
  };

  const handleSRTAddressChange = (event) => {
    setSRTAddress(event.target.value);
  };

  useEffect(() => {
    setSRT(Boolean(settings.srt));
    setSRTAddress(settings.srtAddress);
  }, [settings]);

  const handleSaveConfig = () => {
    const updatedSettings = {
      ...settings,
      srt: srt,
      srtAddress: srtAddress
    };
    onSave(updatedSettings);
    postSetting(updatedSettings);
  };

  return (
    <div className="w-3/4 mx-auto flex justify-center items-start ">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {settings && (
          <div className="my-4">
            <h2 className="text-center font-bold text-3xl">SRT Setting</h2>
            <div className="grid grid-cols-2 mt-6 content-between place-content-start gap-4">
              <div className="col-span-1">
                <div className="flex flex-col text-right items-end">
                  <label className="my-2">SRT:</label>
                  <label className="my-3">SRT Address:</label>
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col">
                  <Checkbox
                    className=" my-3"
                    value={srt.toString()}
                    checked={srt}
                    onChange={handleSRTChange}
                  />
                  <input
                    type="text"
                    className="my-3 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={srtAddress}
                    onChange={handleSRTAddressChange}
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
