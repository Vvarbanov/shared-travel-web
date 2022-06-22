FROM nginx:latest
COPY dist/shared-travel/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
CMD sed -i -e 's/ENV_PORT/'$PORT'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'
