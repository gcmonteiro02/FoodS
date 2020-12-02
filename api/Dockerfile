FROM node:11-alpine

RUN mkdir -p /usr/app/src/app

WORKDIR ./

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

RUN npm run test

CMD ["npm", "run", "prod"]