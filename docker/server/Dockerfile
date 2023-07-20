# Use the official NGINX image as the base image
FROM  tiangolo/nginx-rtmp
# Remove default nginx configurations
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
RUN  mkdir -p  www/stream



