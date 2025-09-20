FROM node:latest

WORKDIR /server

COPY /server/package*.json ./


EXPOSE 8000


# Copy tsconfig.json
COPY /server/src ./src
COPY /server/tsconfig.json ./
COPY /server/.env.* ./


RUN npm install

RUN npm run build

CMD ["npm", "start"]