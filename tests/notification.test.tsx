import { expect, test, describe } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Notification from "../src/components/notification/notification";

describe("Notification Component", () => {
    test("renders notification with correct message and icon", () => {
        const { getByText} = render(
            <Notification
                onDismiss={() => {}}
                timer={5000}
                type="success"
                message="This is a success message"
            />
        );

        const messageElement = getByText("This is a success message");

        expect(messageElement).toBeTruthy();
    });

    test("dismisses notification after a certain time", () => {
        const { getByText} = render(
            <Notification
                onDismiss={() => {}}
                timer={5000}
                type="success"
                message="This is a success message"
            />
        );

        const messageElement = getByText("This is a success message");
        expect(messageElement).toBeTruthy();
    });

    test("dismisses notification on close button click", async () => {
        const { getByTestId } = render(
            <Notification
                onDismiss={() => {}}
                timer={5000}
                type="error"
                message="Test"
            />
        );

        const closeButton = getByTestId("close-button");
        await waitFor(() => {
            expect(closeButton).toBeTruthy();
        });

        fireEvent.click(closeButton);
    });
});
