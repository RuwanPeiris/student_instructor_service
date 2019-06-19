const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    course_name: String,
    course_id: String,
    course_dec: String,
    course_modules: {
        year1: Array,//Add first year subjects 
        year2: Array, //Add second year sunjects
        year3: Array, // Add third year subjects
        year4: Array // Add forth year subjects
    }

});

module.exports = mongoose.model('Course', CourseSchema);