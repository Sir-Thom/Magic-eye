import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const NumericInput = ({ value, onChange, placeholder }) => {
  const handleChange = (e) => {
    const inputValue = parseFloat(e.target.value);

    if (!isNaN(inputValue)) {
      onChange(inputValue);
    } else {
      // Handle invalid input, e.g., display an error message
    }
  };

  const handleIncrement = () => {
    // Increment the value by 1
    onChange(value + 1);
  };

  const handleDecrement = () => {
    // Decrement the value by 1
    onChange(value - 1);
  };

  return (
    <div className="relative inline-flex  items-center">
      <input
        type="text"
        className="w-32 h-8 pl-2 pr-8  border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <div className="absolute flex-col inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <button
          type="button"
          className="focus:outline-none"
          onClick={handleIncrement}
        >
          <FaCaretUp color="white" />
        </button>
        <button
          type="button"
          className="focus:outline-none"
          onClick={handleDecrement}
        >
          <FaCaretDown color="white" />
        </button>
      </div>
    </div>
  );
};

export default NumericInput;
