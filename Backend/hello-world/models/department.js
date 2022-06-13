const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

// model name is important, mongoose will look for 'departments' collection based on the model name
const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
