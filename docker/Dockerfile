FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    gstreamer1.0-tools \
    libgstreamer1.0-0 \
    gstreamer1.0-plugins-base \
    gstreamer1.0-plugins-good \
    gstreamer1.0-plugins-ugly \
    gstreamer1.0-plugins-bad \
    libgstrtspserver-1.0-dev \
    gir1.2-gst-rtsp-server-1.0 \
    python3-gi  

WORKDIR /app
COPY server.py .

CMD ["python3", "server.py"]
