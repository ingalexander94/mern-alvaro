FROM node:16.10.0-alpine3.14
RUN mkdir -p /client
WORKDIR /client
COPY src/package*.json ./
RUN npm install
COPY src .
EXPOSE 3000
RUN npm start
 