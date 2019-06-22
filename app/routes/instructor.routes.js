module.exports = (app) => {
    const instructor = require('../controller/instructor.controller');

    app.post('/instructor', instructor.create);

    app.get('/instructor', instructor.findAll);

    app.get('/instructor/:id', instructor.findByID);

    app.put('/instructor/:id', instructor.update);

    app.delete('/instructor/:id', instructor.delete);

}