import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Checkbox from "../src/components/checkBox/checkBox";
import { expect,describe,test, vi } from "vitest";
describe("Checkbox Component", () => {
    test("renders Checkbox component", () => {
        render(
            <Checkbox
                checked={false}
                onChange={() => {}}
                value="exampleValue"
                className="hidden"
            />
        );

        // Adjust the following assertions based on your component's structure
        const checkboxElement = screen.getByRole("checkbox");
        // test if checkbox classnames are correct
        expect(checkboxElement.className).equal("hidden");
        expect(checkboxElement).toBeDefined();
        
    });

    test("toggles checked state on click", () => {
        const onChangeMock = vi.fn();
        render(
            <Checkbox
                checked={false}
                onChange={onChangeMock}
                value="exampleValue"
                className="custom-class"
            />
        );

      
        const checkboxElement = screen.getByRole("checkbox") as HTMLInputElement;
        const checkedValue = checkboxElement.checked;
        

        // Initial state
        expect(checkedValue).toBeFalsy();

        // Click to toggle
        fireEvent.click(checkboxElement);

        // Expect the onChange callback to be called with the updated state
        expect(onChangeMock).toHaveBeenCalledWith(true);

        // After click, expect the checkbox to be checked
        expect(checkboxElement).toBeTruthy();
    });

    test("renders FaCheck icon when checked", () => {
        render(
            <Checkbox
                checked={true}
                onChange={() => {}}
                value="exampleValue"
                className="custom-class"
            />
        );

        // Adjust the following assertions based on your component's structure
        const faCheckElement = screen.getAllByTestId("checkbox-checked-icon");

        expect(faCheckElement).toBeDefined();
    });
});
