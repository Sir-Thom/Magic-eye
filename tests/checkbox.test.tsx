import { render, screen, fireEvent } from "@testing-library/react";
import Checkbox from "../src/components/checkBox/checkBox";
import { describe, test, expect, vi } from "vitest";
import '@testing-library/jest-dom';

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

        const checkboxElement = screen.getByRole("checkbox");

        expect(checkboxElement).toBeInTheDocument();
        expect(checkboxElement).toHaveClass("hidden");
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

        expect(checkboxElement).not.toBeChecked();

        fireEvent.click(checkboxElement);

        expect(onChangeMock).toHaveBeenCalled();
        expect(onChangeMock.mock.calls[0][0]).toBe(true); // Adjust according to how onChange is called

        // Simulate the state change
        fireEvent.change(checkboxElement, { target: { checked: true } });

        expect(checkboxElement).toBeChecked();
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

        const faCheckElement = screen.getByTestId("checkbox-checked-icon");

        expect(faCheckElement).toBeInTheDocument();
    });
});
