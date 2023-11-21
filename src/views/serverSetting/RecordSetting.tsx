import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import Toast from "../../components/notification/notification";
import Toggle from "../../components/toggle/toggle";

export default function RecordSetting({ settings, onSave, patchSetting }) {
    const [error, setError] = useState<string | null>(null);
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
    function handleDismissErrorToast() {
        setError(null);
    }
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
        } else {
            setError(
                "Invalid format. Use '1h,' '1m,' '1s,' or a similar format."
            );
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

    return (
        <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {settings && (
                <div className=" my-4">
                    <h2 className="text-center font-bold text-3xl">
                        Record Setting
                    </h2>
                    <div className="grid grid-cols-2  mt-6 content-between place-content-start gap-4">
                        <div className="col-span-1">
                            <div className="flex flex-col text-right items-end">
                                <label className="my-2">Record:</label>
                                <label className="mt-5 mb-3">Record Path:</label>
                                <label className="mt-5 mb-4">Record Format:</label>
                                <label className="mt-4 mb-3">
                                    Record Segment Duration:
                                </label>
                                <label className="mt-5 mb-3">
                                    Record Delete After:
                                </label>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="flex flex-col">
                                <Toggle
                                    className="my-3"
                                    value={record.toString()}
                                    enabled={record}
                                    onChange={handleRecordChange}
                                />
                                <input
                                    type="text"
                                    className="my-3 pr-1 h-8  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    value={recordPath}
                                    onChange={handleRecordPathChange}
                                />
                                <input
                                    type="text"
                                    className="my-3 pr-1 h-8  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    value={recordFormat}
                                    onChange={handleRecordFormatChange}
                                />
                                <input
                                    type="text"
                                    className="my-3 pr-1 h-8  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    value={recordSegmentDuration}
                                    onChange={handleRecordSegmentDurationChange}
                                />
                                <input
                                    type="text"
                                    className="my-3  pr-1 h-8  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    value={recordDeleteAfter}
                                    onChange={handleRecordDeleteAfterChange}
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
                    {error && (
                        <Toast
                            message={error}
                            timer={5000}
                            type={"error"}
                            onDismiss={handleDismissErrorToast}
                        />
                    )}
                </div>
            )}
        </motion.div>
    );
}
