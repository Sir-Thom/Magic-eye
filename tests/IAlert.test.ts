import { expect, test, describe } from "vitest";
import { IAlert } from "../src/interfaces/IAlert";
describe("IAlert Interface", () => {
    test("should have the required properties", () => {
        const alert: IAlert = {
            message: "Test Message",
            timer: 5000,
            OnClose: () => {
                // Your onClose implementation or an empty function
            }
        };

        // Perform assertions to check if the properties exist and have the correct types
        expect(alert).to.have.property("message");
        expect(alert).to.have.property("timer");
        expect(alert).to.have.property("OnClose");
        expect(alert.message).to.be.a("string");
        expect(alert.timer).to.be.a("number");
        expect(alert.OnClose).to.be.a("function");
    });
});
