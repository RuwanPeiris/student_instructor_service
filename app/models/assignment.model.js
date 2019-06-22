const mongoose = require('mongoose');

const AssignmentSchema = mongoose.Schema({
    module_name: String,
    assignment_name: String,
    studentid: String,
    date: String,
    duedate: String,
    description: String,
    assignmentFile: Object
});

module.exports = mongoose.model('Assignment', AssignmentSchema);