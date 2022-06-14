const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

// model name is important, mongoose will look for 'positions' collection based on the model name
const Position = mongoose.model("Position", positionSchema);
module.exports = Position;
