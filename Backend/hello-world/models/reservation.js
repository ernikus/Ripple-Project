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
    //Consider implementing check to see validity of input before
    reservationStart: {
        required: true,
        type: Date
    },
    //Same as reservationStart
    reservationEnd: {
        required: true,
        type: Date
    }


});

// model name is important, mongoose will look for 'employees' collection based on the model name
const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
