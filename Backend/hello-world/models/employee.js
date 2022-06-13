const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    phone: {
	type: String,
	required: true
    },
    email: {
	type: String,
	required: true
    },
    depID: {
        type: Number,
        required: true
    },
    posID: {
    	type: Number,
	required: true
    }
});

// model name is important, mongoose will look for 'employees' collection based on the model name
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
