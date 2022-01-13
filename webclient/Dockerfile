FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm ci --only-production
COPY ./src ./src
EXPOSE 3000
CMD ["npm", "run", "start"]