FROM node:erbium as builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV REACT_APP_API_URL "http://localhost:8080"
ENV REACT_APP_META_TITLE "Securrency Blockchain Test"
ENV REACT_APP_CONTRACT_NETWORK "ropsten"
ENV REACT_APP_CONTRACT_NETWORK_EXPLORER "https://ropsten.etherscan.io"
ENV REACT_APP_CONTRACT_ADDRESS "0xb5842e2384f5b6f1dbec5e130c75e82d3803c3d3"

RUN npm run build

# production environment
FROM nginx:1.19-alpine as runner
RUN apk add --upgrade curl
RUN apk add --upgrade libxml2
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]