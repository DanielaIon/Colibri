FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only-production
COPY ./.env ./.env
COPY ./src ./src
CMD ["npm", "run", "start-prod"]