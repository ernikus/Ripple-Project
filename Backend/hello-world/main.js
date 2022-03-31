const express = require('express');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const Desk = require('./models/desk');
const get_url = require('./utils');

username = "zespol";
password = "projektzespolowy";
db_name = "bazaprojekt";
server_port = 50000;

const app = express();

// connect to database
var url = get_url(username, password, db_name);
mongoose.connect(url)
    .then((result) => app.listen(server_port))
    .catch((err) => console.log(err));

app.get('/', (request, response) => {
    response.send('Hello!');
});

app.get('/desks', (request, response) => {
    Desk.find()
        .then((result) => {
            response.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/add-desk', (request, response) => {
    const desk1 = new Desk({
        floor: Math.floor(Math.random() * 5) + 1,
        number: Math.floor(Math.random() * 100) + 1
    });

    desk1.save()
        .then((result) => {
            response.send(result);

        })
        .catch((err) => {
            console.log(err);
        });
});

app.use((request, response) => {
    response.status(404).send("This page does not exist!");
});
