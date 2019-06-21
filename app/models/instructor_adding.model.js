const mongoose = require('mongoose');

const InstructorAddingSchema = mongoose.Schema({

    role: String,
    instructor_name: String,
    instructor_email: String,
    instructor_password: String,
    instructor_phone_number: String,
    instructor_address: String

});

module.exports = mongoose.model('Instructors', InstructorAddingSchema);