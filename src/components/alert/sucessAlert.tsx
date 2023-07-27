import { useState } from "react";

const SuccessAlert = ({ message, onClose }) => {
  const [showAlert, setShowAlert] = useState(true);

  const handleClose = () => {
    setShowAlert(false);
    if (onClose) {
      onClose();
    }
  };

  return showAlert ? (
    <div
      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Success!</strong>
      <span className="block sm:inline">{message}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          onClick={handleClose}
          className="fill-current h-6 w-6 text-green-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 14.849a1 1 0 01-1.414 1.414l-2.83-2.829-2.828 2.83a1 1 0 11-1.415-1.414l2.83-2.828-2.83-2.83a1 1 0 111.414-1.414l2.828 2.83 2.83-2.83a1 1 0 111.415 1.414l-2.83 2.828 2.83 2.83z" />
        </svg>
      </span>
    </div>
  ) : null;
};

export default SuccessAlert;
