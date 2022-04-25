const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const Desk = require('./models/desk');
const Employee = require('./models/employee');
const get_url = require('./utils');

username = "zespol";
password = "projektzespolowy";
db_name = "bazaprojekt";
server_port = 50000;

const app = express();
app.use(express.json());

// MOCK DATA
const employees = JSON.parse(fs.readFileSync(`${__dirname}/employees.json`, 'utf-8'))

// connect to database
var url = get_url(username, password, db_name);
mongoose.connect(url)
    .then((result) => {
        Employee.create(employees);
        app.listen(server_port);
    })
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

app.get('/employees', (request, response) => {
    Employee.find(request.query)
        .setOptions({ sanitizeFilter: true })
        .then((result) => {
            response.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

//Adding an employee
app.post('/add-employee', (request, response) => {
    const dodawanyPracownik = new Employee({
        name: request.body.name,
        surname: request.body.surname,
        login: request.body.login,
        //TODO: Ogarnąć hashowanie i te zabezpieczenia
        passwordHash: request.body.passwordHash,
        depID: request.body.depID
    });

    dodawanyPracownik.save()
        .then((result) => {
            response.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

//Editing an employee - add id of employee to end of url e.g. localhost:50000/edit-employee/abcdefg123456 and in request body add elements you want to change
app.patch('/edit-employee/:id', (request, response) => {
    const _id = request.params.id;
    const updateEmployee = Employee.findByIdAndUpdate(_id, request.body, {
        new: true
    })
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
