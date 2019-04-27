const mongoose = require('mongoose');

const  UserSchema = mongoose.Schema({
    // _id: ObjectId(""),
    usr_role : String,
    usr_permission : String,
    usr_name : String,
    usr_faculty: String,
    usr_department: String,
    usr_password: String
});

module.exports = mongoose.model('User', UserSchema);