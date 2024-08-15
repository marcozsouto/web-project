FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

EXPOSE ${PORT:-3002}

CMD ["npm", "start"]