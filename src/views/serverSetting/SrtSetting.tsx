import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import Checkbox from "../../components/checkBox/checkBox";

export default function SrtSetting({ settings, onSave }) {
  const [srt, setSrt] = useState(settings.srt || true);

  const [srtAddress, setsrtAddress] = useState(settings.srtAddress || ":8890");

  const handleSrt = (event) => {
    setSrt(event.target.checked);
  };

  const handleSrtAddress = (event) => {
    setsrtAddress(event.target.value);
  };

  const handleSaveConfig = () => {
    const updatedSettings = {
      ...settings,
      srt: srt,
      srtAddress: srtAddress
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
                SRT Setting
              </h2>
              <div className="flex justify-between flex-col items-center my-4 flex-1 ">
                <label className="flex text-justify items-center">
                  SRT
                  <Checkbox
                    value={srt.toString()}
                    checked={srt}
                    onChange={handleSrt}
                  />
                </label>
              </div>

              <div className="flex justify-between flex-col text-justify  items-center my-4 flex-1">
                <label className="flex text-justify items-center">
                  Srt Address:
                  <div className="mx-2">
                    <input
                      type="text"
                      className="appearance-none  pr-1  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2 "
                      value={srtAddress}
                      onChange={handleSrtAddress}
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
