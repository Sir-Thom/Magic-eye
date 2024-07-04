import { fireEvent, render, screen } from "@testing-library/react";
import SideMenu from "../src/components/sideMenu/sideMenu";
import { expect, test, describe, vi } from "vitest";
import { IMenuItem } from "../src/interfaces/IMenuItem";
import { MemoryRouter } from "react-router-dom";

// Mock the onMenuItemClick function
const mockOnMenuItemClick = vi.fn();

const menuItems: IMenuItem[] = [
    { label: "Item 1" },
    { label: "Item 2" },
    { label: "Item 3" }
];

describe("SideMenu Component", () => {
    test("renders correctly", () => {
        render(
            <MemoryRouter>
                <SideMenu
                    menuItems={menuItems}
                    onMenuItemClick={mockOnMenuItemClick}
                />
            </MemoryRouter>
        );

        for (const item of menuItems) {
            expect(screen.getByText(item.label)).toBeDefined();
        }
    });

    test("calls onMenuItemClick when a menu item is clicked", () => {
        render(
            <MemoryRouter>
                <SideMenu
                    menuItems={menuItems}
                    onMenuItemClick={mockOnMenuItemClick}
                />
            </MemoryRouter>
        );

        for (const item of menuItems) {
            fireEvent.click(screen.getByText(item.label));
            expect(mockOnMenuItemClick).toHaveBeenCalled();
        }
    });
});
