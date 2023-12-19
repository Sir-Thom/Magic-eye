import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, expect, test, afterAll, describe, vi } from "vitest";
import Toggle from "../src/components/toggle/toggle";
import React from "react";

describe("Toggle tests", () => {
    test("renders toggle switch with correct initial state", () => {
        const onChangeMock = vi.fn();

        render(<Toggle enabled={false} onChange={onChangeMock} />);
        const toggleSwitch = screen.getByTestId("toggle");

        expect(toggleSwitch).toBeDefined();
    });

    test("toggle switch changes state when clicked", () => {
        const onChangeMock = vi.fn();

        render(<Toggle enabled={false} onChange={onChangeMock} />);
        const toggleSwitch = screen.getByTestId("toggle");

        fireEvent.click(toggleSwitch);
        expect(onChangeMock).toHaveBeenCalled();
    });
});
