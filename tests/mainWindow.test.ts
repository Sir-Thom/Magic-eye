// exemple tauri test file
// https://tauri.app/v1/guides/testing/mocking
import { beforeAll, expect, test, afterAll, describe, vi } from "vitest";
import { randomFillSync } from "crypto";
import { mockIPC, mockWindows } from "@tauri-apps/api/mocks";

describe("Window tests", () => {
    const consoleMock = vi
        .spyOn(console, "log")
        .mockImplementation(() => undefined);
    // jsdom doesn't come with a WebCrypto implementation
    beforeAll(() => {
        Object.defineProperty(window, "crypto", {
            value: {
                // @ts-ignore
                getRandomValues: (buffer) => {
                    return randomFillSync(buffer);
                }
            }
        });
    });
    afterAll(() => {
        consoleMock.mockReset();
    });
    mockWindows("main");
    mockIPC((cmd: any, args: any) => {
        if (cmd === "tauri") {
            if (
                args?.__tauriModule === "Window" &&
                args?.message.cmd === "manage" &&
                args?.message?.data?.cmd?.type === "close"
            ) {
                console.log("closing window");
            }
            if (
                args?.__tauriModule === "Window" &&
                args?.message.cmd === "manage" &&
                args?.message?.data?.cmd?.type === "minimize"
            ) {
                console.log("minize window");
            }
            if (
                args?.__tauriModule === "Window" &&
                args?.message.cmd === "manage" &&
                args?.message?.data?.cmd?.type === "maximize"
            ) {
                console.log("maximize window");
            }
        }
    });

    test("Test window exist", async () => {
        const { getCurrent, getAll } = await import("@tauri-apps/api/window");

        const win = getCurrent();
        expect(win).toHaveProperty("label", "main");
        expect(getAll().map((w) => w.label)).toEqual(["main"]);
    });

    test("Test window minimize", async () => {
        const { getCurrent } = await import("@tauri-apps/api/window");
        const win = getCurrent();
        await win.minimize();
        expect(consoleMock).toHaveBeenCalledWith("minize window");
    });

    test("Test window maximize", async () => {
        const { getCurrent } = await import("@tauri-apps/api/window");
        const win = getCurrent();
        await win.maximize();
        expect(consoleMock).toHaveBeenCalledWith("maximize window");
    });

    test("Test window close", async () => {
        const { getCurrent } = await import("@tauri-apps/api/window");
        const win = getCurrent();
        await win.close();
        expect(consoleMock).toHaveBeenCalledWith("closing window");
    });
});
