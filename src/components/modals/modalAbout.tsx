import "./modal.css";

import { motion } from "framer-motion";

import { IconX } from "@tabler/icons-react";

function Modal({ isOpen, onClose, children }) {
  const slideToScreen = {
    hidden: {
      y: "100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,

      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "-100vh",
      opacity: 0,
    },
  };
  const showHideClassName = isOpen
    ? "fixed z-10 inset-0 overflow-y-auto"
    : "hidden";
  return (
    <div className={showHideClassName}>
      <div className="flex items-center  justify-center min-h-screen pt-4 px-4  text-center">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute rounded-lg inset-0 bg-black opacity-50"></div>
        </div>
        <motion.div
          variants={slideToScreen}
          initial="hidden"
          animate="visible"
          exit={"exit"}
        >
          <div className="inline-block align-bottom     text-left  shadow-xl  transform transition-all">
            <button
              type={"button"}
              className="absolute transition ease-in-out delay-150 hover:scale-110 rounded-full top-0 right-0 p-2 dark:text-text-dark text-text-light hover:outline-none hover:text-problem-500"
              onClick={onClose}
            >
              <IconX size={20} />
            </button>
            <div className=" dark:bg-window-dark-700  bg-window-light-500 rounded-xl px-4 pt-5 pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center items-center sm:mt-0 sm:ml-4 sm:text-left">
                  <div className="mt-2">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Modal;
