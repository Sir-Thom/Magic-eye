interface IServer {
  logLevel: string;
  logDestinations: string[];
  logFile: string;
  readTimeout: string;
  writeTimeout: string;
  readBufferCount: number;
  udpMaxPayloadSize: number;
  externalAuthenticationURL: string;
  api: boolean;
  apiAddress: string;
  metrics: boolean;
  metricsAddress: string;
  pprof: boolean;
  pprofAddress: string;
  runOnConnect: string;
  runOnConnectRestart: boolean;
  rtsp: boolean;
  rtspDisable: boolean;
  protocols: string[];
  encryption: string;
  rtspAddress: string;
  rtspsAddress: string;
  rtpAddress: string;
  rtcpAddress: string;
  multicastIPRange: string;
  multicastRTPPort: number;
  multicastRTCPPort: number;
  serverKey: string;
  serverCert: string;
  authMethods: string[];
  rtmp: boolean;
  rtmpDisable: boolean;
  rtmpAddress: string;
  rtmpEncryption: string;
  rtmpsAddress: string;
  rtmpServerKey: string;
  rtmpServerCert: string;
  hls: boolean;
  hlsDisable: boolean;
  hlsAddress: string;
  hlsEncryption: boolean;
  hlsServerKey: string;
  hlsServerCert: string;
  hlsAlwaysRemux: boolean;
  hlsVariant: string;
  hlsSegmentCount: number;
  hlsSegmentDuration: string;
  hlsPartDuration: string;
  hlsSegmentMaxSize: string;
  hlsAllowOrigin: string;
  hlsTrustedProxies: string[];
  hlsDirectory: string;
  webrtc: boolean;
  webrtcDisable: boolean;
  webrtcAddress: string;
  webrtcEncryption: boolean;
  webrtcServerKey: string;
  webrtcServerCert: string;
  webrtcAllowOrigin: string;
  webrtcTrustedProxies: string[];
  webrtcICEServers: null;
  webrtcICEServers2: ICEServer[];
  webrtcICEHostNAT1To1IPs: string[];
  webrtcICEUDPMuxAddress: string;
  webrtcICETCPMuxAddress: string;
  srt: boolean;
  srtAddress: string;
  paths: {
    all: PathConfig;
  };
}

interface ICEServer {
  url: string;
  username: string;
  password: string;
}

interface PathConfig {
  source: string;
  sourceFingerprint: string;
  sourceOnDemand: boolean;
  sourceOnDemandStartTimeout: string;
  sourceOnDemandCloseAfter: string;
  maxReaders: number;
  publishUser: string;
  publishPass: string;
  publishIPs: string[];
  readUser: string;
  readPass: string;
  readIPs: string[];
  overridePublisher: boolean;
  disablePublisherOverride: boolean;
  fallback: string;
  sourceProtocol: string;
  sourceAnyPortEnable: boolean;
  rtspRangeType: string;
  rtspRangeStart: string;
  sourceRedirect: string;
  rpiCameraCamID: number;
  rpiCameraWidth: number;
  rpiCameraHeight: number;
  rpiCameraHFlip: boolean;
  rpiCameraVFlip: boolean;
  rpiCameraBrightness: number;
  rpiCameraContrast: number;
  rpiCameraSaturation: number;
  rpiCameraSharpness: number;
  rpiCameraExposure: string;
  rpiCameraAWB: string;
  rpiCameraDenoise: string;
  rpiCameraShutter: number;
  rpiCameraMetering: string;
  rpiCameraGain: number;
  rpiCameraEV: number;
  rpiCameraROI: string;
  rpiCameraHDR: boolean;
  rpiCameraTuningFile: string;
  rpiCameraMode: string;
  rpiCameraFPS: number;
  rpiCameraIDRPeriod: number;
  rpiCameraBitrate: number;
  rpiCameraProfile: string;
  rpiCameraLevel: string;
  rpiCameraAfMode: string;
  rpiCameraAfRange: string;
  rpiCameraAfSpeed: string;
  rpiCameraLensPosition: number;
  rpiCameraAfWindow: string;
  rpiCameraTextOverlayEnable: boolean;
  rpiCameraTextOverlay: string;
  runOnInit: string;
  runOnInitRestart: boolean;
  runOnDemand: string;
  runOnDemandRestart: boolean;
  runOnDemandStartTimeout: string;
  runOnDemandCloseAfter: string;
  runOnReady: string;
  runOnReadyRestart: boolean;
  runOnRead: string;
  runOnReadRestart: boolean;
}

interface ILoggingSettings {
  logLevel: string;
  logDestinations: string[];
  logFile: string;
}

interface IApiSettings {
  api: boolean;
  apiAddress: string;
  metrics: boolean;
  metricsAddress: string;
  pprof: boolean;
  pprofAddress: string;
  runOnConnect: string;
  runOnConnectRestart: boolean;
}

interface IHlsSettings {
  hls: boolean;
  hlsDisable: boolean;
  hlsAddress: string;
  hlsEncryption: boolean;
  hlsServerKey: string;
  hlsServerCert: string;
  hlsAlwaysRemux: boolean;
  hlsVariant: string;
  hlsSegmentCount: number;
  hlsSegmentDuration: string;
  hlsPartDuration: string;
  hlsSegmentMaxSize: string;
  hlsAllowOrigin: string;
  hlsTrustedProxies: string[];
  hlsDirectory: string;
}

interface IRtspSettings {
  rtsp: boolean;
  rtspDisable: boolean;
  protocols: string[];
  encryption: string;
  rtspAddress: string;
  rtspsAddress: string;
  rtpAddress: string;
  rtcpAddress: string;
  multicastIPRange: string;
  multicastRTPPort: number;
  multicastRTCPPort: number;
}

interface IRtmpSettings {
  rtmp: boolean;
  rtmpDisable: boolean;
  rtmpAddress: string;
  rtmpEncryption: string;
  rtmpsAddress: string;
  rtmpServerKey: string;
  rtmpServerCert: string;
}

interface IWebrtcSettings {
  webrtc: boolean;
  webrtcDisable: boolean;
  webrtcAddress: string;
  webrtcEncryption: boolean;
  webrtcServerKey: string;
  webrtcServerCert: string;
  webrtcAllowOrigin: string;
  webrtcTrustedProxies: string[];
  webrtcICEServers: null;
  webrtcICEServers2: ICEServer[];
  webrtcICEHostNAT1To1IPs: string[];
  webrtcICEUDPMuxAddress: string;
  webrtcICETCPMuxAddress: string;
}

interface ISrtSettings {
  srt: boolean;
  srtAddress: string;
}

export type {
  IServer,
  PathConfig,
  ICEServer,
  ILoggingSettings,
  IApiSettings,
  IHlsSettings,
  IRtspSettings,
  IRtmpSettings,
  IWebrtcSettings,
  ISrtSettings
};
