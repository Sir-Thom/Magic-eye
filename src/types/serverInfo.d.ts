// Define your types here
declare type ServerInfoHLS = {
    path: string,
    created: string,
    lastRequest: string,
    bytesSent: number,
};

declare type ServerInfoRTMP = {
    id: string,
    created: string,
    remoteAddr: string,
    state: string,
    path: string,
    bytesReceived: number,
    bytesSent: number,
};

declare type ServerInfoRTSP = {
    id: string,
    created: string,
    remoteAddr: string,
    bytesReceived: number,
    bytesSent: number,
};
declare type ServerInfoSRT = {
    id: string,
    created: string,
    remoteAddr: string,
    state: string,
    path: string,
    bytesReceived: number,
    bytesSent: number,
};
declare type ServerInfoWebRTC = {
    id: string,
    created: string,
    remoteAddr: string,
    peerConnectionEstablished: boolean,
    localCandidate: string,
    remoteCandidate: string,
    state: string,
    path: string,
    bytesReceived: number,
    bytesSent: number,
};

