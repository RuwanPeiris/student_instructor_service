const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
    studentid: String,
    assignmentname: String,
    date: String,
    filename: String,
    uploadFile: Object
});

module.exports = mongoose.model('File', FileSchema);