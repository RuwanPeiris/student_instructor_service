module.exports = (app) => {
    const courses = require('../controller/course.controller.js');

    app.post('/courses', courses.create);

    app.get('/courses', courses.findAll);

    app.get('/courses/:course_ID', courses.findByCourseID);

    app.put('/courses/:course_ID', courses.update);

    app.delete('/courses/:course_ID', courses.delete);

}