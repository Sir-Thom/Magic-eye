import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { alertAnimation } from "../../utils/animation/alertAnimation";

type SuccessProps = {
  message: string;
  timer: number; // Duration for which the toast should be visible
  OnClose: () => void; // New prop to handle the dismiss action
};

const SuccessAlert: React.FC<SuccessProps> = ({ message, timer, OnClose }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [showAlert, setShowAlert] = useState(true);
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
    }, 300); // Duration of exit animation, adjust as needed
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
      <strong className="font-bold">Success! </strong>
      <span className="block sm:inline">{message}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <AiOutlineClose
          className="fill-current h-6 w-6 text-green-100"
          onClick={handleClose}
        />
      </span>
    </motion.div>
  );
};

export default SuccessAlert;
