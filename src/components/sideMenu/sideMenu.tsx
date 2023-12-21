import React, { useState } from "react";
import { IMenuItem } from "../../interfaces/IMenuItem";
import { IconArrowLeft } from "@tabler/icons-react";

interface SideMenuProps {
    menuItems: IMenuItem[];
    // eslint-disable-next-line no-unused-vars
    onMenuItemClick: (menuItem: IMenuItem) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ menuItems, onMenuItemClick }) => {
    const [clickedButton, setClickedButton] = useState<string | null>(null);

    const handleMenuItemClick = (menuItem: IMenuItem) => {
        onMenuItemClick(menuItem);
        setClickedButton(menuItem.label); // Set the clicked button label
    };

    return (
        <div className="bg-gray-800 fixed h-screen shadow-sm shadow-gray-700  overflow-y-auto flex w-1/4  flex-col">
            <div className="flex my-auto py-3 dark:bg-window-dark-900 bg-window-light-50 justify-start items-center">
                <a
                    className="flex  m-auto  mt-2 justify-center items-center my-auto  mx-1 w-10  dark:text-text-dark text-text-light rounded-full hover:dark:bg-window-dark-600 hover:bg-window-light-600"
                    href="/"
                >
                    <IconArrowLeft
                        size={30}
                        className="flex justify-center m-auto   items-center dark:text-text-dark text-text-light"
                    />
                </a>
            </div>
            <ul className="pl-2 flex-1">
                {menuItems.map((menuItem, index) => (
                    <li key={index} className="my-2 mx-2">
                        <button
                            onClick={() => handleMenuItemClick(menuItem)}
                            title={menuItem.label}
                            className={`w-full rounded-lg text-justify  mx-auto py-2 text-md dark:text-text-dark text-text-light hover:dark:bg-window-dark-100 hover:bg-window-light-600 ${
                                clickedButton === menuItem.label
                                    ? "bg-accent-color1-600"
                                    : ""
                            }`}
                        >
                            {menuItem.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideMenu;
