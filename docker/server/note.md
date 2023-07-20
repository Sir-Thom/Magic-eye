to build the docker image run the following command:
``` 
docker build -t nginx_hls_converter .
docker run -it -p 127.0.0.1:8080:80 -p 127.0.0.1:1935:1935 --name nginx_hls nginx_hls_converter
```

to run it you can use the following command: 
```
videotestsrc ! videoconvert ! videoscale ! video/x-raw,width=800,height=800 ! x264enc tune=zerolatency ! flvmux ! rtmpsink location=rtmp://127.0.0.1:1935/live/stream
```