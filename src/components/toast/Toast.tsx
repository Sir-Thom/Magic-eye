import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidErrorAlt, BiCheck, BiInfoCircle } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { toastAnimationAppear } from "../../utils/animation/toastAnimation";
import { IToast } from "../../interfaces/IToast";

function Toast({ message, timer, type, onDismiss }: IToast) {
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
        return <BiSolidErrorAlt />;
      case "success":
        return <BiCheck />;
      case "info":
        return <BiInfoCircle />;
      default:
        return null;
    }
  };

  const getToastClassName = () => {
    switch (type) {
      case "error":
        return "bg-red-700 text-white";
      case "success":
        return "bg-success text-white";
      case "info":
        return "bg-blue-700 text-white";
      default:
        return "bg-gray-700 text-white";
    }
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
          <div
            className={`absolute bottom-20 right-5 px-4 py-2 rounded-lg shadow-lg flex items-center ${getToastClassName()}`}
          >
            {getIcon()}
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

export default Toast;
