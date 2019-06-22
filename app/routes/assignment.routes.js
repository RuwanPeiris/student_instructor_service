module.exports = (app) => {
    const files = require('../controller/assignment.controller.js');

    app.post('/assignments', files.save);

    app.get('/assignments', files.findAll);

    app.get('/assignments/:assignmentname/:studentid', files.findAssignmentByStudentId);

    app.get('/assignments/:assignmentname', files.findFilesByAssignmentName);

}