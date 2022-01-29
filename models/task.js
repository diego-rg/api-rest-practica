const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
    default: false
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model("Task", TaskSchema);