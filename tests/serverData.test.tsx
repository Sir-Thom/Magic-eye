import { fireEvent, render, renderHook, screen } from "@testing-library/react";

import { beforeAll, expect, test, afterAll, describe, vi } from "vitest";
import { randomFillSync } from "crypto";
import { mockIPC, mockWindows } from "@tauri-apps/api/mocks";
import { invoke } from "@tauri-apps/api/tauri";

import React from "react";
import useServerData from "../src/utils/hooks/ServerData";
import { ISettings } from "../src/interfaces/IServer";

describe("Server Data tests", () => {
    beforeAll(() => {
        Object.defineProperty(window, "crypto", {
            value: {
                getRandomValues: (buffer) => {
                    return randomFillSync(buffer);
                }
            }
        });
    });

    test("renders server data", async () => {
        const mockApiIp = "unable to get API Ip address.";
        const mockConfigData = { "mocked-config-data": "mocked-config-data" };
        mockIPC((cmd: any, args: any) => {
            if (cmd === "get_api_ip") {
                return Promise.resolve(mockApiIp);
            } else if (cmd === "get_server_request") {
                return Promise.resolve(JSON.stringify(mockConfigData));
            }
        });

        const spy = vi.spyOn(window, "__TAURI_IPC__");
        expect(invoke("get_server_request")).resolves.all;

      
    });
});
