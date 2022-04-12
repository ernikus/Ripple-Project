FROM node

WORKDIR /usr/src/hotseat-backend

COPY package*.json .

RUN npm install

COPY . .

CMD ["node", "main"]
