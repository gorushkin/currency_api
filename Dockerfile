FROM node:19-alpine

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
RUN npm install
COPY src ./src

RUN npm run build

EXPOSE 4500

CMD node dist/index.js
