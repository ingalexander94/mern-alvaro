FROM node:16.7.0-alpine3.14
RUN mkdir -p /server
ENV NODE_ENV=development
WORKDIR /server
COPY src/package*.json ./
RUN npm install
COPY src .
EXPOSE 8000
RUN npm run dev 
 