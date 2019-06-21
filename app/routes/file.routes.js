module.exports = (app) => {
    const files = require('../controller/file.controller.js');

    app.post('/files/upload', files.save);

    app.get('/files', files.findAll);

    app.get('/files/:filename', files.findByFilename);

    app.put('/files/:filename', files.update);

    app.delete('/files/:filename', files.delete);

}