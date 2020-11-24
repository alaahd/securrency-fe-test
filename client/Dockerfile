FROM node:erbium as builder

WORKDIR /home/node/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV REACT_APP_API_URL %REACT_APP_API_URL%
ENV REACT_APP_META_TITLE %REACT_APP_META_TITLE%
ENV REACT_APP_API_DEFI_BRIDGE_URL %REACT_APP_API_DEFI_BRIDGE_URL%
ENV REACT_APP_API_CONVERT_URL %REACT_APP_API_CONVERT_URL%
ENV REACT_APP_API_CONVERT_SIGNATURE_MESSAGE %REACT_APP_API_CONVERT_SIGNATURE_MESSAGE%
ENV REACT_APP_REN_MINT_CONFIRMATIONS %REACT_APP_REN_MINT_CONFIRMATIONS%

RUN npm run build

FROM nginx:1.19-alpine as runner
RUN apk add --upgrade curl
RUN apk add --upgrade libxml2

WORKDIR /var/www/app

EXPOSE 8080

COPY docker/entrypoint.sh /opt/entrypoint.sh
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/node/app/build .

RUN touch /var/run/nginx.pid && \
  chown -R 1000 /var/run/nginx.pid && \
  chown -R 1000 /var/cache/nginx && \
  chown -R 1000 /var/www/app && \
  chown -R 1000 /etc/nginx/conf.d/ && \
  mkdir -p /var/log/nginx && \
  mkdir -p /var/run/nginx && \
  chown -R 1000 /var/log/nginx && \
  chown -R 1000 /var/run/nginx/

USER 1000
ENTRYPOINT ["sh", "/opt/entrypoint.sh"]
CMD ["nginx-fe"]

