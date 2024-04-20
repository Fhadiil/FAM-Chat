const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    roomname: {
        type: String,
        required: true
    },
    users: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    messages: [{
        type: String,
        user: mongoose.Types.ObjectId
    }]
});


module.exports = mongoose.model('room', roomSchema)