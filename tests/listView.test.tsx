import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ListView from "../src/components/ListBox/listView";
import { expect,describe,test, vi } from "vitest";

describe("ListView Component", () => {
    const fetchData = [
        { id: 1, name: "Item 1", description: "Description 1" },
        { id: 2, name: "Item 2", description: "Description 2" },

    ];

    test("renders ListView component with data", () => {
        render(
            <ListView
                fetchData={fetchData}
                DeleteFunc={() => {}}
                canDelete={true}
            />
        );

        
        const item1Element = screen.getByText(/Item 1/i);
        const item2Element = screen.getByText(/Item 2/i);

        expect(item1Element).toBeDefined();
        expect(item2Element).toBeDefined();
    });

    test("calls DeleteFunc when delete button is clicked", () => {
        const deleteFuncMock = vi.fn();
        render(
            <ListView
                fetchData={fetchData}
                DeleteFunc={deleteFuncMock}
                canDelete={true}
            />
        );

        const deleteButton = screen.getAllByTitle("Delete")[0];
        fireEvent.click(deleteButton);

        expect(deleteFuncMock).toHaveBeenCalledTimes(1);
        expect(deleteFuncMock).toHaveBeenCalledWith(1);
    });
});
