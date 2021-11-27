FROM node:12-buster-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 4567
CMD [ "node", "server.js" ]
