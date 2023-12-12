import { appWindow } from "@tauri-apps/api/window";

import { useEffect, useState, useCallback } from "react";
import {
    IconX,
    IconMenu2,
    IconSettings,
    IconInfoCircle,
    IconServer
} from "@tabler/icons-react";

import iconApp from "../../../src-tauri/icons/32x32.png";

import iconApp2 from "../../../src-tauri/icons/128x128.png";
import { AiFillGithub } from "react-icons/ai";
import Modal from "../modals/modalAbout";
import {
    VscChromeRestore,
    VscChromeMaximize,
    VscChromeMinimize,
    VscChromeClose
} from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import { getVersion } from "@tauri-apps/api/app";
import { motion } from "framer-motion";
import { invoke } from "@tauri-apps/api";
import { hamburgerMenuAnimation } from "../../utils/animation/hamburgerMenuAnimation";

export default function Titlebar() {
    const [version, setVersion] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [, setCurrentLocation] = useState(location.pathname);
    const [maximized, setMaximized] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [windowTitle] = useState("Magic Eye");
    const [menuOpen, setMenuOpen] = useState(false);

    const handleOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const ChangeMaximizedIcon = useCallback(() => {
        setMaximized((prevMaximized) => !prevMaximized);
        appWindow.toggleMaximize();
    }, []);

    const handleMenuClick = useCallback(() => {
        setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    }, []);

    useEffect(() => {
        const tauriInterval = setInterval(async () => {
            const isMaximized = await appWindow.isMaximized();
            setMaximized(isMaximized);
            appWindow.setTitle(windowTitle);
            const isFullscreen = await appWindow.isFullscreen();
            setFullscreen(isFullscreen);
        }, 200);

        return () => clearInterval(tauriInterval);
    }, [windowTitle]);

    useEffect(() => {
        invoke("close_splashscreen");

        const getInfoVersion = async () => {
            const version = await getVersion();
            setVersion(version);
        };

        getInfoVersion();
    }, []);

    useEffect(() => {
        setCurrentLocation(location.pathname);
    }, [location]);

    function openBrowser(): void {
        invoke("open_web_browser", {
            link: "https://github.com/Sir-Thom/Magic-eye"
        });
    }

    return (
        !fullscreen && (
            <div
                data-tauri-drag-region
                className=" z-50   overflow-hidden flex top-0 justify-between items-center h-12 border-b-2  border-window-dark-500 dark:bg-[#111111] bg-window-light-50 p-2 text-text-dark w-screen fixed left-0 right-0"
            >
                <Modal isOpen={isOpen} onClose={handleClose}>
                    <img
                        className="inline-flex justify-center item-center dark:text-text-dark text-text-light m-auto h-auto ml-[3.78rem] mb-4"
                        src={iconApp2}
                        alt="IconApp"
                    />
                    <h1 className="flex justify-center items-center text-center font-bold text-2xl dark:text-text-dark text-text-light m-auto mb-4">
                        Magic Eye
                    </h1>
                    <h2 className="flex justify-center m-auto text-center text-sm font-semibold dark:text-text-dark text-text-light mb-2">
                        Version {version}
                    </h2>
                    <button
                        onClick={openBrowser}
                        className="flex justify-center items-center text-center text-sm dark:text-text-dark text-text-light hover:text-accent-color1-900"
                    >
                        <AiFillGithub className="mr-2" size={20} />
                        https://github.com/Sir-Thom/Magic-eye
                    </button>

                    <hr className="my-4 m-auto text-center text-sm border-gray-700 dark:text-text-dark text-text-light" />
                    <p className="mb-2 mx-auto text-center text-sm dark:text-text-dark text-text-light">
                        Developed by Sir Thom
                    </p>
                    <p className="mb-2 m-auto text-center text-sm dark:text-text-dark text-text-light">
                        MIT license
                    </p>
                </Modal>
                {/* window title and controls */}
                <div className="flex items-center">
                    <div className="flex items-center">
                        <img
                            className="justify-items-center flex justify-center items-center mr-2"
                            src={iconApp}
                            alt="IconApp"
                        />
                        <span className="object-center dark:text-text-dark text-text-light text-sm">
                            {windowTitle}
                        </span>
                    </div>

                    <div
                        data-tauri-drag-region
                        className="justify-end fixed flex space-x-2 w-screen items-center -left-2 right-10"
                    >
                        {/* window icons */}
                        <button
                            type="button"
                            title="Menu"
                            className="inline-flex items-center dark:text-text-dark text-text-light justify-center w-8 h-8 rounded-full hover:dark:bg-window-dark-600 hover:bg-window-light-600"
                            onClick={handleMenuClick}
                        >
                            {!menuOpen ? (
                                <IconMenu2 size={20} />
                            ) : (
                                <IconX size={20} />
                            )}
                        </button>

                        {menuOpen && (
                            <motion.div
                                className="flex flex-col absolute z-50 mt-10 top-0 right-9 w-56 rounded-lg shadow-lg py-1 dark:bg-window-dark-700 bg-window-light-300"
                                variants={hamburgerMenuAnimation}
                                initial="hidden"
                                animate="visible"
                                exit={"exit"}
                            >
                                <a
                                    title="About"
                                    href="#"
                                    onClick={handleOpen}
                                    className="flex justify-start item-center rounded-lg px-4 py-2 dark:text-text-dark text-text-light hover:dark:bg-window-dark-100 hover:bg-window-light-600"
                                >
                                    <IconInfoCircle
                                        className="flex justify-center item-center dark:text-text-dark text-text-light text-center pr-2"
                                        size={26}
                                    />
                                    About
                                </a>

                                <Link
                                    to="/server"
                                    title="Server"
                                    className="flex rounded-lg px-4 py-2 text-md dark:text-text-dark text-text-light hover:dark:bg-window-dark-100 hover:bg-window-light-600"
                                >
                                    <IconServer
                                        className="flex justify-center item-center dark:text-text-dark text-text-light text-center pr-2"
                                        size={26}
                                    />
                                    Server
                                </Link>

                                <Link
                                    to="/settings"
                                    title="Setting"
                                    className="flex rounded-lg px-4 py-2 text-md dark:text-text-dark text-text-light hover:dark:bg-window-dark-100 hover:bg-window-light-600"
                                >
                                    <IconSettings
                                        size={26}
                                        className="flex justify-center item-center dark:text-text-dark text-text-light text-center pr-2"
                                    />
                                    Setting
                                </Link>
                            </motion.div>
                        )}

                        <button
                            type="button"
                            title="Minimize"
                            className="flex items-center justify-center dark:text-text-dark text-text-light w-8 h-8 rounded-full hover:dark:bg-window-dark-600 hover:bg-window-light-600"
                            onClick={() => appWindow.minimize()}
                        >
                            <VscChromeMinimize size={20} />
                        </button>
                        <>
                            {maximized ? (
                                <button
                                    type="button"
                                    title="Restore Down"
                                    className="flex items-center justify-center dark:text-text-dark text-text-light w-8 h-8 rounded-full hover:dark:bg-window-dark-600 hover:bg-window-light-600"
                                    onClick={ChangeMaximizedIcon}
                                >
                                    <VscChromeRestore size={20} className=" " />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    title="Maximize"
                                    className="flex items-center justify-center dark:text-text-dark text-text-light w-8 h-8 rounded-full hover:dark:bg-window-dark-600 hover:bg-window-light-600"
                                    onClick={ChangeMaximizedIcon}
                                >
                                    <VscChromeMaximize size={20} />
                                </button>
                            )}
                        </>

                        <button
                            type="button"
                            title="Close"
                            className="flex items-center justify-center w-8 h-8 right-4 left-5 rounded-full hover:dark:bg-window-dark-600 hover:bg-window-light-600"
                            onClick={() => appWindow.close()}
                        >
                            <VscChromeClose
                                size={20}
                                className="text-problem-500"
                            />
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}
