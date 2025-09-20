FROM node:latest

WORKDIR /app

COPY /app/package*.json ./


EXPOSE 3000

COPY /app/.env.* ./
COPY /app/tsconfig.json ./
COPY /app/public ./public
COPY /app/src ./src


RUN npm install

CMD ["npm", "start"]