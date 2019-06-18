const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    course_name: String,
    course_ID: String, // EG: SE3040
    course_dec: String,
    subjects: Array
});

module.exports = mongoose.model('Course', CourseSchema);