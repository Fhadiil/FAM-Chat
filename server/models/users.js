const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    rooms: {
        type: mongoose.Types.ObjectId,
        ref: 'rooms'
    },
    isAdmin: {
        type: Boolean
    }
});

mongoose.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema)