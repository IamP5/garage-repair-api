# Base image
FROM node:lts

ENV PUPPETEER_SKIP_DOWNLOAD=true

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY ./prisma prisma
COPY . .

RUN npm install -g prisma
RUN npm run build
RUN prisma generate

CMD [ "node", "dist/main.js" ]
