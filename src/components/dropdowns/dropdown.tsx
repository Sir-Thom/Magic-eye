import React, { useState } from "react";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";

const Dropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative inline-block">
      <select
        className="appearance-none py-2 pl-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        value={value}
        onChange={onChange}
      >
        {options.map(
          (
            option:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined,
            index: React.Key | null | undefined
          ) => (
            <option onClick={toggleDropdown} key={index} value={option.value}>
              {option}
            </option>
          )
        )}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        {isOpen ? <RxCaretUp color="white" /> : <RxCaretDown color="white" />}
      </div>
    </div>
  );
};

export default Dropdown;
