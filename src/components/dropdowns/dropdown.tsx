import { useState } from "react";
import { RxCaretDown } from "react-icons/rx";
import { IDropdown } from "../../interfaces/IDropdown";

function Dropdown({ options, value, onChange, className }: IDropdown) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Define the default class and allow it to be overridden by the parent
  const dropdownClass =
    "pl-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 " +
    className;

  return (
    <div className="relative mx-2 inline-block">
      <div className="select-wrapper relative">
        <select
          className={`${dropdownClass} w-full appearance-none px-2  pr-8 bg-transparent`}
          value={value}
          onChange={onChange}
        >
          {options.map((option, index) => (
            <option key={index} value={option.toString()} className="bg-white">
              {option}
            </option>
          ))}
        </select>
        <div
          className="caret absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          onClick={toggleDropdown}
        >
          <RxCaretDown size={20} color="white" />
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
