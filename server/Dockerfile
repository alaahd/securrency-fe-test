FROM node:12.10.0-alpine

# create app directory
WORKDIR /usr/app

COPY package*.json ./
RUN npm ci -qy

# Bundle app sources 
COPY . .

EXPOSE 8080

# Run when starting container
CMD ["npm", "run", "prod"]