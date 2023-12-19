import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, expect, test, afterAll, describe, vi } from "vitest";
import { randomFillSync } from "crypto";
import { mockIPC, mockWindows } from "@tauri-apps/api/mocks";
import { invoke } from "@tauri-apps/api/tauri";
import Titlebar from "../src/components/titlebar/titlebar.tsx";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

describe("Titlebar tests", () => {
    const consoleMock = vi
        .spyOn(console, "log")
        .mockImplementation(() => undefined);
    mockWindows("main");

    const titlebarContainer = document.createElement("div");
    titlebarContainer.id = "titlebar";
    document.body.appendChild(titlebarContainer);

    beforeAll(() => {
        Object.defineProperty(window, "crypto", {
            value: {
                
                getRandomValues: (buffer) => {
                    return randomFillSync(buffer);
                }
            }
        });
    });

    afterAll(() => {
        consoleMock.mockReset();
    });


    test("Test window exist", async () => {
        const { getCurrent, getAll } = await import("@tauri-apps/api/window");

        const win = getCurrent();
        expect(win).toHaveProperty("label", "main");
        expect(getAll().map((w) => w.label)).toEqual(["main"]);
    });

    test("close splashscreen", async () => {
        mockIPC((cmd: any, args: any) => {
            if (cmd === "close_splashscreen") {
                return Promise.resolve();
            }
        });
        const spy = vi.spyOn(window, "__TAURI_IPC__");
        expect(invoke("close_splashscreen")).resolves.all;
    });

    test("Open Browser", async () => {
        mockIPC((cmd: any, args: any) => {
            if (cmd === "open_web_browser") {
                return Promise.resolve({ link: "openBrowser" });
            }
        });
        const spy = vi.spyOn(window, "__TAURI_IPC__");
        expect(invoke("open_web_browser", { link: "openBrowser" })).resolves;
    });

    test("Titlebar render", () => {
        render(
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Titlebar />} />
                </Routes>
            </BrowserRouter>
        );
        expect(screen.getAllByText("Magic Eye"));
    });

    test("minimize button minimizes the window", async () => {
        render(
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Titlebar />} />
                </Routes>
            </BrowserRouter>
        );
        mockIPC((cmd: any, args: any) => {
          if (cmd === "tauri") {
              if (
                  args?.__tauriModule === "Window" &&
                  args?.message.cmd === "manage" &&
                  args?.message?.data?.cmd?.type === "minimize"
              ) {
                  console.log("minimize window");
                  return ["tauri", {
                      __tauriModule: "Window",
                      message: {
                         cmd: "tauri",
                         data: {
                             cmd: { type: "minimize" },
                             label: "main"
                         }
                      }
                  }];
              }
          }
       });
      });

      test("maximize button maximizes the window", async () => {
        render(
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Titlebar />} />
                </Routes>
            </BrowserRouter>
        );
        mockIPC((cmd: any, args: any) => {
          if (cmd === "tauri") {
              if (
                  args?.__tauriModule === "Window" &&
                  args?.message.cmd === "manage" &&
                  args?.message?.data?.cmd?.type === "maximize"
              ) {
                  console.log("maximize window");
                  return ["tauri", {
                      __tauriModule: "Window",
                      message: {
                         cmd: "tauri",
                         data: {
                             cmd: { type: "maximize" },
                             label: "main"
                         }
                      }
                  }];
              }
          }
       });
      }
    );

    test("close button closes the window", async () => {
        render(
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Titlebar />} />
                </Routes>
            </BrowserRouter>
        );
        fireEvent.click(screen.getByTitle("Close"));
    });

    test("clicking on the menu button toggles menu state", () => {
        render(
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Titlebar />} />
                </Routes>
            </BrowserRouter>
        );
        fireEvent.click(screen.getByTitle("Menu"));
        expect(screen.getByTitle("About"));
        expect(screen.getByTitle("Setting"));
        expect(screen.getByTitle("Server"));
    });
});
