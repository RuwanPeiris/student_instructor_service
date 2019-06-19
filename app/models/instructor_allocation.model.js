const mongoose = require('mongoose');

const InstructorAllocationSchema = mongoose.Schema({
    course_name: String,
    course_id: String,
    module_name: String,
    module_id: String,
    instructors: Array

});

module.exports = mongoose.model('InstructorAllocation', InstructorAllocationSchema);