FROM node:20-alpine

RUN apk add --no-cache python3 make g++
WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
RUN npm install
COPY drizzle.config.ts ./
COPY src ./src

RUN npm run build

EXPOSE 4500

CMD npm run start
