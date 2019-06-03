const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    usr_role: String,
    usr_permission: Number, // 1 for admin, 2 for instructor, 3 for student
    usr_name: String,
    usr_faculty: String,
    usr_department: String,
    usr_password: String
});

module.exports = mongoose.model('User', UserSchema);