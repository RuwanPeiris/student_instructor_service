module.exports = (app) =>{
    const users = require('../controller/user.controller.js');

    app.post('/users',users.create);

    app.get('/users',users.findAll);

    app.get('/users/:userId', users.findOne);

    app.put('/users/:usr_name', users.update);

    app.delete('/users/:usr_name', users.delete);

    app.post('/user/', users.login);

    app.get('/users/logout',users.logout);

}