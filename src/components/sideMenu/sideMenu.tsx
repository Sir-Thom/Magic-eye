import React from "react";
import { IMenuItem } from "../../interfaces/IMenuItem";
import { Link } from "react-router-dom";

interface SideMenuProps {
  menuItems: IMenuItem[];
}

const SideMenu: React.FC<SideMenuProps> = ({ menuItems }) => {
  return (
    <div className="bg-gray-800  h-full w-64 p-4">
      <h1 className="text-2xl font-semibold mb-4">Side Menu</h1>
      <ul>
        {menuItems.map((menuItem, index) => (
          <li key={index} className="mb-2">
            <Link
              to={menuItem.link}
              title={menuItem.label}
              className="block rounded-lg  px-4 py-2 text-md  dark:text-text-dark text-text-light hover:dark:bg-window-dark-100 hover:bg-window-light-600"
            >
              {menuItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
