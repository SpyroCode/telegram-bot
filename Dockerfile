FROM node:12.2.0

ENV NODE_ENV='production'
ENV DB_PORT='5432'
ENV DB_DIALECT='postgres'
ENV DB_HOST='challengebot.cluster-ccdimwbyk7wd.us-east-1.rds.amazonaws.com'
ENV DB_USER='challenge-user'
ENV DB_PASSWORD='dOcFF29D4dxjyqF1BeGRA'
ENV DB_DATABASE='challenge_bot'
ENV BOT_TOKEN='5711349031:AAFXKlzdurmvcI-F1ltEMw78A4MqvGomB7A'
ENV TELEGRAM_API_BOT='https://api.telegram.org/bot'

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "migrate"]

CMD ["npm", "seed-all"]

CMD ["npm", "start"]
