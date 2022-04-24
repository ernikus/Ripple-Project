FROM node

WORKDIR /usr/src/hotseat-backend

COPY package*.json .

RUN npm install && npm install -g nodemon

COPY . .

CMD ["nodemon", "main"]
