const mongoose = require('mongoose');

const AssignmentSchema = mongoose.Schema({
    module_name: String,//module name
    assignment_name: String,
    studentid: String,// studentid
    start_date: String,
    duedate: String,
    description: String,
    assignmentFile: Object
});

module.exports = mongoose.model('Assignment', AssignmentSchema);