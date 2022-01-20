FROM node:16

WORKDIR /usr/healthchecker/backend

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]