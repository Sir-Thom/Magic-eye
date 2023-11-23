import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";

import Toggle from "../../components/toggle/toggle";

export default function RecordSetting({ settings, onSave, patchSetting }) {
    const [record, setRecord] = useState(Boolean(settings.record));
    const [recordPath, setRecordPath] = useState(settings.recordPath);
    const [recordFormat, setRecordFormat] = useState(settings.recordFormat);
    const [recordSegmentDuration, setRecordSegmentDuration] = useState(
        settings.recordSegmentDuration
    );
    const [recordDeleteAfter, setRecordDeleteAfter] = useState(
        settings.recordDeleteAfter
    );

    const handleRecordChange = () => {
        setRecord(!record);
    };

    const handleRecordPathChange = (event) => {
        setRecordPath(event.target.value);
    };

    const handleRecordFormatChange = (event) => {
        setRecordFormat(event.target.value);
    };

    const handleRecordSegmentDurationChange = (event) => {
        setRecordSegmentDuration(event.target.value);
    };

    const handleRecordDeleteAfterChange = (event) => {
        const value = event.target.value;

        let parsedValue = 0;

        // Use regular expressions to validate and parse the input
        const match = value.match(/^(\d+)([hms])$/);
        if (match) {
            const numericValue = parseInt(match[1], 10);
            const unit = match[2];

            switch (unit) {
                case "h":
                    parsedValue = numericValue * 3600;
                    break;
                case "m":
                    parsedValue = numericValue * 60;
                    break;
                case "s":
                    parsedValue = numericValue;
                    break;
            }
        }

        setRecordDeleteAfter(parsedValue);
    };

    useEffect(() => {
        setRecord(Boolean(settings.record));
        setRecordPath(settings.recordPath);
        setRecordFormat(settings.recordFormat);
        setRecordSegmentDuration(settings.recordSegmentDuration);
        setRecordDeleteAfter(settings.recordDeleteAfter);
    }, [settings]);

    const handleSaveConfig = () => {
        const updatedSettings = {
            ...settings,
            record: record,
            recordPath: recordPath,
            recordFormat: recordFormat,
            recordSegmentDuration: recordSegmentDuration,
            recordDeleteAfter: recordDeleteAfter
        };
        onSave(updatedSettings);
        patchSetting(updatedSettings);
    };

    const RecordSection = () => (
        <div className="grid  w-full  grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 ">
            <div>
                <h2 className="text-base font-semibold leading-7 text-white">
                    Record
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400"></p>
            </div>
            <div className="col-span-2 gap-4 w-fit   grid-rows-5 grid grid-cols-2">
                <label className="place-content-center  my-auto  col-start-1 row-start-1 row-end-2 ">
                    Record:
                </label>
                <label className="place-content-center my-auto col-start-1 row-start-2 row-end-3 ">
                    Record Path:
                </label>
                <label className="place-content-center my-auto col-start-1 row-start-3 row-end-4 ">
                    Record Format:
                </label>
                <label className="place-content-center col-start-1 row-start-4 row-end-5 my-auto">
                    Record Segment Duration:
                </label>
                <label className="place-content-center col-start-1 row-start-5 row-end-6 my-auto">
                    Record Delete After:
                </label>

                <Toggle
                    className=" row-start-1 my-auto place-content-center row-end-2"
                    enabled={record}
                    onChange={handleRecordChange}
                />

                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-2 row-end-3 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={recordPath}
                    onChange={handleRecordPathChange}
                />
                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-3 row-end-4 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={recordFormat}
                    onChange={handleRecordFormatChange}
                />
                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-4 row-end-5 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={recordSegmentDuration}
                    onChange={handleRecordSegmentDurationChange}
                />
                <input
                    type="text"
                    className="my-auto h-8 align-text-bottom place-content-center row-start-5 row-end-6 appearance-none pr-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={recordDeleteAfter}
                    onChange={handleRecordDeleteAfterChange}
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
                            Record Setting
                        </h2>

                        <div className="divide-y  w-full divide-window-dark-500">
                            {RecordSection()}
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
