# Docker File for Node Backend

FROM node:12-buster-slim


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

#Copy app source code
COPY  . .

# Create Envs
ENV NODE_ENV production

#Exports
EXPOSE 5000

CMD ["node", "server.js"]