module.exports = (app) => {
    const files = require('../controller/file.controller.js');

    app.post('/files/upload', files.save);

    app.get('/files', files.findAll);

    app.get('/files/:assignmentname', files.findFilesByAssignmentName);

    app.get('/files/:assignmentname/:studentid', files.findFilesByAssignmentNameStudentId);

    app.put('/files/:assignmentname/:studentid', files.update);

    app.delete('/files/:assignmentname/:studentid', files.delete);

}