   
FROM node:14-buster-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

ENV NODE_ENV production
ENV PORT 4000

EXPOSE 4000

RUN npm install\
    && npm install typescript -g
COPY . .
RUN tsc
CMD ["node", "./dist/server.js"]