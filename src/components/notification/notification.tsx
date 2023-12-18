import { Fragment, useState, useEffect } from "react";

import { Transition } from "@headlessui/react";
import { BiSolidErrorAlt, BiCheck, BiInfoCircle } from "react-icons/bi";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function Notification({ onDismiss, timer, type, message }) {
    const [show, setShow] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
            dismissToast();
        }, timer);

        return () => clearTimeout(timeout);
    }, [timer]);

    const dismissToast = () => {
        setShow(false);
        setTimeout(() => {
            onDismiss();
        }, 300);
    };

    const getIcon = () => {
        switch (type) {
            case "error":
                return (
                    <BiSolidErrorAlt id="icon" className="h-6 w-6 " aria-hidden="true" />
                );
            case "success":
                return (
                    <BiCheck
                        id="icon" 
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                    />
                );
            case "info":
                return (
                    <BiInfoCircle
                        id="icon" 
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                    />
                );
            default:
                return null;
        }
    };

    const getToastClassName = () => {
        switch (type) {
            case "error":
                return "bg-red-700 bottom-20 right-4 text-white";
            case "success":
                return "bg-green-700 text-white bottom-20 right-4";
            case "info":
                return "bg-blue-700 text-white bottom-20 right-4";
            default:
                return "bg-gray-700 text-white bottom-20 right-4";
        }
    };

    return (
        <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div //make it follow the scroll
                className={` w-full fixed max-w-sm rounded-lg ${getToastClassName()}`}
            >
                <div className="p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">{getIcon()}</div>
                        <div className="ml-3 w-0 flex-1 pt-0.5">
                            <p className="text-sm font-medium ">{message}</p>
                        </div>
                        <div className="ml-4 flex flex-shrink-0">
                            <button
                                type="button"
                                title="Dismiss"
                                data-testid="close-button" 
                                className="inline-flex rounded-md  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={dismissToast}
                            >
                                <span className="sr-only">Close</span>
                                <XMarkIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );
}
