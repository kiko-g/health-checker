FROM node:16

WORKDIR /usr/healthchecker/frontend

COPY . .

RUN npm install

EXPOSE 5000

CMD [ "npm", "start" ]