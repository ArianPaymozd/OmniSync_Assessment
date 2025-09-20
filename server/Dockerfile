FROM node:alpine

WORKDIR /server

COPY /server/package*.json ./



RUN npm install

# Copy tsconfig.json
COPY /server/src ./src
COPY /server/tsconfig.json ./
COPY /server/.env.* ./

EXPOSE 8000

RUN npm run build

CMD ["npm", "run", "start:watch"]