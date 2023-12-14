
import { IDropdown } from "../../interfaces/IDropdown";

function Dropdown({ options, value, onChange, className }: IDropdown) {



    // Define the default class and allow it to be overridden by the parent
    const dropdownClass =
        "border-0 py-1.5 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 " +
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
                        <option
                            key={index}
                            value={option.toString()}
                            className="bg-white"
                        >
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Dropdown;
