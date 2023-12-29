import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, test, describe, beforeAll, afterAll, vi } from "vitest";
import Server from "../src/views/Server";
import RtspServerInfo from "../src/views/ServerInfoView/RtspServerInfo";

import { mockIPC, mockWindows } from "@tauri-apps/api/mocks";
import { invoke } from "@tauri-apps/api/core";
import Setting from "../src/views/Settings";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { randomFillSync } from "crypto";

import { ISettings } from "../src/interfaces/IServer";
import { spyOn } from "@vitest/spy";

describe("Setting Component", () => {
    const titlebarContainer = document.createElement("div");
    titlebarContainer.id = "titlebar";
    document.body.appendChild(titlebarContainer);

  
 
    test("renders Setting component", () => {
      render(
        <MemoryRouter>
      <Setting />
      </MemoryRouter>
      );
      // Adjust the following assertions based on your component's structure
      const titlebarElement = screen.getByTitle("Menu");
     expect(titlebarElement).toBeTruthy();

    });

    test("get default setting", () => {
        render(
          <MemoryRouter>
        <Setting />
        </MemoryRouter>
        );

           const configData = {
                apiSettings: {
                    api:  true,
                    metrics: false,
                    metricsAddress: "127.0.0.1:9998",
                    pprof: false,
                    pprofAddress: "127.0.0.1:9999",
                    runOnConnect: "",
                    runOnConnectRestart: false
                },
                loggingSettings: {
                    logLevel: "info",
                    logDestinations: ["stdout"],
                    logFile:"mediamtx.log"
                },
                hlsSettings: {
                    hls: true,
                    hlsAddress:":8888",
                    hlsAllowOrigin:"*",
                    hlsAlwaysRemux: false,
                    hlsDirectory:  "",
                    hlsDisable:  false,
                    hlsEncryption: false,
                    hlsPartDuration: "200ms",
                    hlsSegmentCount:  7,
                    hlsSegmentDuration: "1s",
                    hlsSegmentMaxSize:  "50M",
                    hlsServerCert: "server.crt",
                    hlsServerKey:  "server.key",
                    hlsTrustedProxies: [],
                    hlsVariant: "lowLatency"
                },
                rtspSettings: {
                    rtsp: true,
                    rtspDisable:  false,
                    protocols:["multicast", "tcp", "udp"],
                    encryption: "no",
                    rtspAddress:  ":8554",
                    rtspsAddress:  ":8322",
                    rtpAddress: ":8000",
                    rtcpAddress: ":8001",
                    multicastIPRange: "224.1.0.0/16",
                    multicastRTPPort: 8002,
                    multicastRTCPPort: 8003
                },
                rtmpSettings: {
                    rtmp:  true,
                    rtmpAddress: ":1935",
                    rtmpEncryption:  "no",
                    rtmpsAddress: ":1936",
                    rtmpServerKey: "server.key",
                    rtmpServerCert:  "server.crt"
                },
                srtSettings: {
                    srt: true,
                    srtAddress:":8890"
                },
                webrtcSettings: {
                    webrtc:  true,
                    webrtcAddress:  ":8080",
                    webrtcEncryption: false,
                    webrtcServerKey:  "server.key",
                    webrtcAllowOrigin: "*",
                    webrtcTrustedProxies: [],
                    webrtcICEServers:  null,
                    webrtcICEServers2: null,
                    webrtcICEHostNAT1To1IPs: [],
                    webrtcICEUDPMuxAddress:  "",
                    webrtcICETCPMuxAddress:  ""
                },
                recordSettings: {
                    record:  false,
                    recordPath: "",
                    recordFormat: "fmp4",
                    recordPartDuration:  "200ms",
                    recordSegmentDuration:  "1h",
                    recordDeleteAfter:  "24h"
                }
            };
            expect(configData).toBeTypeOf("object");
            expect(configData.apiSettings).toBeTypeOf("object");
            expect(configData.apiSettings.api).toBeTypeOf("boolean");
            expect(configData.apiSettings.metrics).toBeTypeOf("boolean");
            expect(configData.apiSettings.metricsAddress).toBeTypeOf("string");
            expect(configData.apiSettings.pprof).toBeTypeOf("boolean");
            expect(configData.apiSettings.pprofAddress).toBeTypeOf("string");
            expect(configData.apiSettings.runOnConnect).toBeTypeOf("string");
            expect(configData.apiSettings.runOnConnectRestart).toBeTypeOf("boolean");
            expect(configData.loggingSettings).toBeTypeOf("object");
            expect(configData.loggingSettings.logLevel).toBeTypeOf("string");
            expect(configData.loggingSettings.logDestinations).toBeTypeOf("object");
            expect(configData.loggingSettings.logFile).toBeTypeOf("string");
            expect(configData.hlsSettings).toBeTypeOf("object");
            expect(configData.hlsSettings.hls).toBeTypeOf("boolean");
            expect(configData.hlsSettings.hlsAddress).toBeTypeOf("string");
            expect(configData.hlsSettings.hlsAllowOrigin).toBeTypeOf("string");
            expect(configData.hlsSettings.hlsAlwaysRemux).toBeTypeOf("boolean");
            expect(configData.hlsSettings.hlsDirectory).toBeTypeOf("string");
            expect(configData.hlsSettings.hlsDisable).toBeTypeOf("boolean");
            expect(configData.hlsSettings.hlsEncryption).toBeTypeOf("boolean");
            expect(configData.hlsSettings.hlsPartDuration).toBeTypeOf("string");
            expect(configData.hlsSettings.hlsSegmentCount).toBeTypeOf("number");
            expect(configData.hlsSettings.hlsSegmentDuration).toBeTypeOf("string");
            expect(configData.hlsSettings.hlsSegmentMaxSize).toBeTypeOf("string");
            expect(configData.hlsSettings.hlsServerCert).toBeTypeOf("string");
            expect(configData.hlsSettings.hlsServerKey).toBeTypeOf("string");
            expect(configData.hlsSettings.hlsTrustedProxies).toBeTypeOf("object");
            expect(configData.hlsSettings.hlsVariant).toBeTypeOf("string");
            expect(configData.rtspSettings).toBeTypeOf("object");
            expect(configData.rtspSettings.rtsp).toBeTypeOf("boolean");
            expect(configData.rtspSettings.rtspDisable).toBeTypeOf("boolean");
            expect(configData.rtspSettings.protocols).toBeTypeOf("object");
            expect(configData.rtspSettings.encryption).toBeTypeOf("string");
            expect(configData.rtspSettings.rtspAddress).toBeTypeOf("string");
            expect(configData.rtspSettings.rtspsAddress).toBeTypeOf("string");
            expect(configData.rtspSettings.rtpAddress).toBeTypeOf("string");
            expect(configData.rtspSettings.rtcpAddress).toBeTypeOf("string");
            expect(configData.rtspSettings.multicastIPRange).toBeTypeOf("string");
            expect(configData.rtspSettings.multicastRTPPort).toBeTypeOf("number");
            expect(configData.rtspSettings.multicastRTCPPort).toBeTypeOf("number");
            expect(configData.rtmpSettings).toBeTypeOf("object");
            expect(configData.rtmpSettings.rtmp).toBeTypeOf("boolean");
            expect(configData.rtmpSettings.rtmpAddress).toBeTypeOf("string");
            expect(configData.rtmpSettings.rtmpEncryption).toBeTypeOf("string");
            expect(configData.rtmpSettings.rtmpsAddress).toBeTypeOf("string");
            expect(configData.rtmpSettings.rtmpServerKey).toBeTypeOf("string");
            expect(configData.rtmpSettings.rtmpServerCert).toBeTypeOf("string");
            expect(configData.srtSettings).toBeTypeOf("object");
            expect(configData.srtSettings.srt).toBeTypeOf("boolean");
            expect(configData.srtSettings.srtAddress).toBeTypeOf("string");
            expect(configData.webrtcSettings).toBeTypeOf("object");
            expect(configData.webrtcSettings.webrtc).toBeTypeOf("boolean");
            expect(configData.webrtcSettings.webrtcAddress).toBeTypeOf("string");
            expect(configData.webrtcSettings.webrtcEncryption).toBeTypeOf("boolean");
            expect(configData.webrtcSettings.webrtcServerKey).toBeTypeOf("string");
            expect(configData.webrtcSettings.webrtcAllowOrigin).toBeTypeOf("string");
            expect(configData.webrtcSettings.webrtcTrustedProxies).toBeTypeOf("object");
            expect(configData.webrtcSettings.webrtcICEServers).toBeTypeOf("object");
            expect(configData.webrtcSettings.webrtcICEServers2).toBeTypeOf("object");
            expect(configData.webrtcSettings.webrtcICEHostNAT1To1IPs).toBeTypeOf("object");
            expect(configData.webrtcSettings.webrtcICEUDPMuxAddress).toBeTypeOf("string");
            expect(configData.webrtcSettings.webrtcICETCPMuxAddress).toBeTypeOf("string");
            expect(configData.recordSettings).toBeTypeOf("object");
            expect(configData.recordSettings.record).toBeTypeOf("boolean");
            expect(configData.recordSettings.recordPath).toBeTypeOf("string");
            expect(configData.recordSettings.recordFormat).toBeTypeOf("string");
            expect(configData.recordSettings.recordPartDuration).toBeTypeOf("string");
            expect(configData.recordSettings.recordSegmentDuration).toBeTypeOf("string");
            expect(configData.recordSettings.recordDeleteAfter).toBeTypeOf("string");
        
        });
        
     
    });
  