const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    //bắt buộc nhập name
    email: {type: String, require: true},
    password: {type: String, require: true}
});

module.exports = mongoose.model('User', UserSchema);