import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
type ToastProps = {
  message: string;
};

const Toast: React.FC<ToastProps> = ({ message }) => {
  const [show, setShow] = useState(true);

  const handleDismiss = () => {
    setShow(false);
  };

  return show ? (
    <div className="fixed bottom-5 right-5 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
      <div className="flex-1 pr-2">{message}</div>
      <button className="ml-2" onClick={handleDismiss}>
        <AiOutlineClose />
      </button>
    </div>
  ) : null;
};

export default Toast;
