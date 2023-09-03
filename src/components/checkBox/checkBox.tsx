import { FaCheck } from "react-icons/fa";

export default function Checkbox({ checked, onChange, value }) {
  return (
    <div className="cursor-pointer flex items-center">
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <div
        className={`outline-none outline-2 focus:outline-accent-color1-700 text-text-dark w-4 h-4 border border-gray-400 rounded-sm transition duration-100 mx-2 ease-in-out ${
          checked ? "bg-accent-color1-700" : "bg-window-dark-300"
        }`}
      >
        {checked && (
          <FaCheck
            size={14}
            className="font-bold dark:text-text-dark text-text-light"
          />
        )}
      </div>
    </div>
  );
}
