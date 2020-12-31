const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String, unique: true},
    mobileNo: {type: String},
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);