import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { alertAnimation } from "../../utils/animation/alertAnimation";
import { IAlert } from "../../interfaces/IAlert";

function SuccessAlert({ message, timer, OnClose }: IAlert) {
  const [, setShowAlert] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      dismissToast();
    }, timer);

    return () => clearTimeout(timeout);
  }, [timer]);

  const dismissToast = () => {
    setShowAlert(false);
    setTimeout(() => {
      OnClose();
    }, 300);
  };

  const handleClose = () => {
    setShowAlert(false);
    if (OnClose) {
      OnClose();
    }
  };

  return (
    <motion.div
      initial={"hidden"}
      animate={"visible"}
      exit={"exit"}
      variants={alertAnimation}
      className="bg-success  text-white px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Success!</strong>
      <span className="block sm:inline">{message}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <AiOutlineClose
          className="fill-current h-6 w-6 text-green-100"
          onClick={handleClose}
        />
      </span>
    </motion.div>
  );
}

export default SuccessAlert;
