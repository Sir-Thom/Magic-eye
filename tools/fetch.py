import requests

# API endpoint and authentication
# Replace with the actual API endpoint
api_url = 'http://127.0.0.1:9997/v2/config/set'

headers = {
    'Content-Type': 'application/json',
}

# New configuration data
new_config = {
    "logLevel": "info",
    "logDestinations": ["stdout"],
    "logFile": "mediamtx.log",
    "readTimeout": "10s",
    "writeTimeout": "10s",
    "readBufferCount": 512,
    "udpMaxPayloadSize": 1472,
    "externalAuthenticationURL": "",
    "api": True,
    "apiAddress": "127.0.0.1:9997",
    "metrics": True,
    "metricsAddress": "127.0.0.1:9998",
    "pprof": False,
    "pprofAddress": "127.0.0.1:9999",
    "runOnConnect": "",
    "runOnConnectRestart": False,
    "rtsp": True,
    "rtspDisable": False,
    "protocols": ["multicast", "tcp", "udp"],
    "encryption": "no",
    "rtspAddress": ":8554",
    "rtspsAddress": ":8322",
    "rtpAddress": ":8000",
    "rtcpAddress": ":8001",
    "multicastIPRange": "224.1.0.0/16",
    "multicastRTPPort": 8002,
    "multicastRTCPPort": 8003,
    # Add other configuration options and values as needed
}

# Make a POST request to update the configuration
response = requests.post(api_url, headers=headers, json=new_config)

# Check the response
if response.status_code == 200:
    print('Response:', str(response.json()))
    print('Configuration updated successfully')
else:
    print('Failed to update configuration')
