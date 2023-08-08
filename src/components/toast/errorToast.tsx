import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidErrorAlt } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { toastAnimationAppear } from "../../utils/animation/toastAnimation";
import { IToast } from "../../interfaces/IToast";

function ErrorToast({ message, timer, onDismiss }: IToast) {
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
}

export default ErrorToast;
