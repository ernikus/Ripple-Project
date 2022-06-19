const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Desk = require('./models/desk');
const Employee = require('./models/employee');
const Department = require('./models/department');
const Position = require('./models/position');
const Reservation = require('./models/reservation')
const get_url = require('./utils');
const { db } = require('./models/desk');

username = "zespol";
password = "projektzespolowy";
db_name = "bazaprojekt";
server_port = 50000;

const app = express();
app.use(express.json());
// In order to run frontend and backend on the same host (localhost)
app.use(cors());

// MOCK DATA
const employees = JSON.parse(fs.readFileSync(`${__dirname}/data/employees.json`, 'utf-8'))
const departments = JSON.parse(fs.readFileSync(`${__dirname}/data/departments.json`, 'utf-8'));
const positions = JSON.parse(fs.readFileSync(`${__dirname}/data/positions.json`, 'utf-8'));

// connect to database
var url = get_url(username, password, db_name);
mongoose.connect(url)
    .then((result) => {
        Employee.create(employees);
        Department.create(departments);
        Position.create(positions);
        app.listen(server_port);
    })
    .catch((err) => console.log(err));

app.get('/', (request, response) => {
    response.send('Hello!');
});

app.get('/departments', (request, response) => {
    Department.find(request.query)
        .setOptions({ sanitizeFilter: true })
        .then((result) => {
            response.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/positions', (request, response) => {
    Position.find(request.query)
        .setOptions({ sanitizeFilter: true })
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
        depID: request.body.departament,
	email: request.body.email,
        name: request.body.name,
        login: request.body.email,
        //TODO: Hashing and security in general
        passwordHash: request.body.password,
	phone: request.body.phone,
        posID: request.body.position,
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
app.put('/edit-employee/:id', (request, response) => {
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

app.delete('/delete-employee/:id', (request, response) => {
    Employee.findByIdAndUpdate(request.params.id, {"isDeleted": true})
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

app.get('/desks', (request, response) => {
    Desk.find()
        .then((result) => {
            response.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/add-desk', (request, response) => {
    const newDesk = new Desk({
        floor: request.body.floor,
        number: request.body.number
    });

    newDesk.save()
        .then((result) => {
            response.send(result);

        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/report-day-floor', (request, response) => {
    const searchedFloor = request.body.searchedFloor
    const searchedDay = request.body.searchedDay
    var foundDeskIDs = []
    Reservation.find({ $and: [{ reservationStart: { $lt: searchedDay } }, { reservationEnd: { $gt: searchedDay } }] }, { deskID: 1, _id: 0 })
        .then((result) => {
            for (var i = 0; i < result.length; i++) {
                foundDeskIDs.push(result[i].deskID)
            }
            Desk.count({ floor: searchedFloor })
                .then((allDesksOnFloor) => {
                    Desk.count({ $and: [{ _id: { $in: foundDeskIDs } }, { floor: searchedFloor }] })
                        .then((matchingDesks) => {
                            //Sends back percentage of used desks, if there are no desks on floor it returns -1
                            if (allDesksOnFloor != 0) { deskPercentageTaken = matchingDesks / allDesksOnFloor * 100 }
                            else { deskPercentageTaken = -1; }
                            response.send({ deskPercentageTaken });
                        })
                        .catch((err3) => {
                            console.log(err3);
                        });
                })
                .catch((err2) => {
                    console.log(err2);
                });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/report-day', (request, response) => {
    const searchedDay = request.body.searchedDay
    var foundDeskIDs = []
    Reservation.find({ $and: [{ reservationStart: { $lt: searchedDay } }, { reservationEnd: { $gt: searchedDay } }] }, { deskID: 1, _id: 0 })
        .then((result) => {
            for (var i = 0; i < result.length; i++) {
                foundDeskIDs.push(result[i].deskID)
            }
            Desk.count({})
                .then((allDesks) => {
                    Desk.count({ _id: { $in: foundDeskIDs } })
                        .then((matchingDesks) => {
                            //Sends back percentage of used desks, if there are no desks it returns -1
                            if (allDesks != 0) { deskPercentageTaken = matchingDesks / allDesks * 100 }
                            else deskPercentageTaken = -1;
                            response.send({ deskPercentageTaken });
                        })
                        .catch((err3) => {
                            console.log(err3);
                        });
                })
                .catch((err2) => {
                    console.log(err2);
                });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.use((request, response) => {
    response.status(404).send("This page does not exist!");
});
