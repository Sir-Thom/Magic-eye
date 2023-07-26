import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidErrorAlt } from "react-icons/bi";

type ToastProps = {
  message: string;
};

const ErrorToast: React.FC<ToastProps> = ({ message }) => {
  const [show, setShow] = useState(true);

  const handleDismiss = () => {
    setShow(false);
  };

  return show ? (
    <div className="fixed bottom-20 right-5 bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
      <BiSolidErrorAlt />
      <div className="flex-1 mx-2 pr-2 overflow-hidden">{message}</div>
      <button className="ml-2" onClick={handleDismiss}>
        <AiOutlineClose />
      </button>
    </div>
  ) : null;
};

export default ErrorToast;
