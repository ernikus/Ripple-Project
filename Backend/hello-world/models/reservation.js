const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    
    employeeID: {
        type: ObjectId,
        required: true
    },
    deskID: {
        type: ObjectId,
        required: true
    },
    //Should be the start of the first day e.g "reservationStart": "2022-05-10T00:00:00.000Z"
    reservationStart: {
        required: true,
        type: Date
    },
    //Should be the end of the last day e.g. "reservationEnd": "2022-05-12T23:59:59.000Z"
    reservationEnd: {
        required: true,
        type: Date
    }


});

// model name is important, mongoose will look for 'employees' collection based on the model name
const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
