const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const Desk = require('./models/desk');
const Employee = require('./models/employee');
const Reservation = require('./models/reservation')
const get_url = require('./utils');
const { db } = require('./models/desk');

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
    const newEmployee = new Employee({
        name: request.body.name,
        surname: request.body.surname,
        login: request.body.login,
        //TODO: Hashing and security in general
        passwordHash: request.body.passwordHash,
        depID: request.body.depID
    });

    newEmployee.save()
        .then((result) => {
            response.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

//Editing an employee - add id of employee to end of url e.g. localhost:50000/edit-employee/abcdefg123456 and in request body add elements you want to change
app.patch('/edit-employee/:id', (request, response) => {
    const _editemployeeid = request.params.id;
    const updateEmployee = Employee.findByIdAndUpdate(_editemployeeid, request.body, {
        new: true
    })
    .then((result) => {
        response.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/reservations', (request, response) => {
    Reservation.find(request.query)
        .setOptions({ sanitizeFilter: true })
        .then((result) => {
            response.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/user-reservation/:id', (request, response) => {
    const _userreservationid = request.params.id
    Reservation.find({employeeID: _userreservationid})
        .then((result) => {
            response.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/add-reservation', (request, response) => {
    const newReservation = new Reservation({
        employeeID: request.body.employeeID,
        deskID: request.body.deskID,
        reservationStart: request.body.reservationStart,
        reservationEnd: request.body.reservationEnd
    });
    newReservation.save()
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

db.find

app.use((request, response) => {
    response.status(404).send("This page does not exist!");
});
