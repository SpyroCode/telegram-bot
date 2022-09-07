FROM node:12.2.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD 'tsc'

CMD ["npm", "start"]
