FROM node:16

WORKDIR /app

COPY . /app

RUN npm install express axios ejs

CMD ["node", "app.js"]

EXPOSE 3000
