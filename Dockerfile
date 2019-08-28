FROM nginx
COPY dist/SmartAngApp/ /usr/share/nginx/html
EXPOSE 80