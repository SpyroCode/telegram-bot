FROM node:12.2.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "migrate"]

CMD ["npm", "seed-all"]

CMD ["npm", "start"]
