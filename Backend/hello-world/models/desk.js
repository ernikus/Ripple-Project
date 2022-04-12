const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deskSchema = new Schema({
    floor: {
        type: Number,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
});

// model name is important, mongoose will look for 'desks' collection based on the model name
const Desk = mongoose.model("Desk", deskSchema);
module.exports = Desk;
