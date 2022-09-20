FROM nginx:stable-alpine
COPY . /usr/share/nginx/html
RUN rm nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]