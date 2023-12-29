import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import Toggle from "../../components/toggle/toggle";
import ModalConfirm from "../../components/modals/modalConfirm";

export default function SRTSetting({ settings, onSave, patchSetting }) {
    const [srt, setSRT] = useState(Boolean(settings.srt));
    const [srtAddress, setSRTAddress] = useState(settings.srtAddress);

    const initialSettings = {
        ...settings
    };

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleCancel = () => {
        setSRT(initialSettings.srt);
        setSRTAddress(initialSettings.srtAddress);
    };

    const showConfirmation = () => {
        setShowConfirmationModal(true);
    };

    const hideConfirmation = () => {
        setShowConfirmationModal(false);
    };

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
        hideConfirmation();
        const updatedSettings = {
            ...settings,
            srt: srt,
            srtAddress: srtAddress
        };
        onSave(updatedSettings);
        patchSetting(updatedSettings);
    };

    const SRTSection = () => (
        <div className="grid  w-full  grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 ">
            <div>
                <h2 className="text-base font-semibold leading-7 text-white">
                    SRT
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400"></p>
            </div>
            <div className="col-span-2 gap-4 w-fit   grid-rows-2 grid grid-cols-2">
                <label className="place-content-center  my-auto  col-start-1 row-start-1 row-end-2 ">
                    SRT:
                </label>
                <label className="place-content-center my-auto col-start-1 row-start-2 row-end-3 ">
                    SRT Address:
                </label>

                <Toggle
                    className=" place-content-center  my-auto  row-start-1 row-end-2"
                    value={srt.toString()}
                    enabled={srt}
                    onChange={handleSRTChange}
                />

                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-2 row-end-3 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={srtAddress}
                    onChange={handleSRTAddressChange}
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
                            SRT Setting
                        </h2>

                        <div className="divide-y  w-full divide-window-dark-500">
                            {SRTSection()}
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
                isOpen={showConfirmationModal}
                onClose={hideConfirmation}
                onConfirm={handleSaveConfig}
                confirmText="Are you sure you want to apply the changes?"
                confirmTitle="Apply SRT Changes"
            />
        </div>
    );
}
