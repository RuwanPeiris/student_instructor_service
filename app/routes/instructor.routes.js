module.exports = (app) => {
    const instructor = require('../controller/instructor.controller');

    app.post('/instructor', instructor.create);

   /* app.get('/instructor_allocations', instructor_allocation.findAll);

    app.get('/instructor_allocations/:course_id/:course_name/:module_id', instructor_allocation.findByCourseIDNCourseNameNModuleId);

    app.put('/instructor_allocations/:module_id', instructor_allocation.update);

    app.delete('/instructor_allocations/:module_id', instructor_allocation.delete);*/

}