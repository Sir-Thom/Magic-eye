import SuccessAlert from "../src/components/alert/sucessAlert";

import { test, describe, expect } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
describe("Success Alert Component", () => {
    test("renders success alert with correct message", () => {
        render(
            <SuccessAlert
                timer={1000}
                message="This is a success message"
                OnClose={() => {}}
            />
        );
        const messageElement = document.getElementById("message");
        expect(messageElement).toBeTruthy();
    });

    test("dismisses success alert after a certain time", () => {
        render(
            <SuccessAlert
                timer={1000}
                message="This is a success message"
                OnClose={() => {}}
            />
        );
        const messageElement = document.getElementById("message");
        expect(messageElement).toBeTruthy();
    });

    test("dismisses success alert on close button click", async () => {
        const { getByTestId } = render(
            <SuccessAlert
                timer={1000}
                message="This is a success message"
                OnClose={() => {}}
            />
        );

        const closeButton = getByTestId("close-button");
        await waitFor(() => {
            expect(closeButton).toBeTruthy();
        });

        fireEvent.click(closeButton);
    });
});
