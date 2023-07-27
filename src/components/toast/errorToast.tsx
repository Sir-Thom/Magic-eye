import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidErrorAlt } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { toastAnimationAppear } from "../../utils/animation/toastAnimation";

type ToastProps = {
  message: string;
  onDismiss: () => void; // New prop to handle the dismiss action
};

const ErrorToast: React.FC<ToastProps> = ({ message, onDismiss }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Show the toast for a certain duration before automatically dismissing it
    const timeout = setTimeout(() => {
      dismissToast();
    }, 5000); // Change the duration as needed

    return () => clearTimeout(timeout);
  }, []);

  const dismissToast = () => {
    setShow(false);
    setTimeout(() => {
      onDismiss();
    }, 300); // Duration of exit animation, adjust as needed
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={toastAnimationAppear}
          onClick={dismissToast}
        >
          <div className="fixed bottom-20 right-5 bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
            <BiSolidErrorAlt />
            <div className="flex-1 mx-2 pr-2 overflow-hidden">{message}</div>
            <button className="ml-2" onClick={dismissToast}>
              <AiOutlineClose />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorToast;
