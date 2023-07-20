FROM tiangolo/nginx-rtmp

RUN apt-get install -y curl 

# Remove default nginx configurations
RUN rm /etc/nginx/nginx.conf

# Copy your custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html /www/


RUN  mkdir www/stream