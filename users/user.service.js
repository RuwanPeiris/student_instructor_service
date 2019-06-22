const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');
const mongoose = require('./user.model');
const userSchema = mongoose.model('User');

// users hardcoded for simplicity, store in a db for production applications
const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Kasun', lastName: 'Atulugama', role: Role.Admin },
    { id: 2, username: 'student', password: 'student', firstName: 'Chathura', lastName: 'Madusanka', role: Role.User },
    { id: 3, username: 'instructor', password: 'instructor', firstName: 'Ravindu', lastName: 'Bandara', role: Role.Instructor }
];

module.exports = {
    insert,
    authenticate,
    getAll,
    getById
};

async function insert (data){
    return new Promise(resolve, reject => {
        var users = new userSchema({
            username: data.username,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            role: Role.User
        });
        subject.save().then(() => {
            resolve({status: 200, message: "Added new student"});
        }).catch(err => {
            reject({status: 500, message: "Error" + err});
        })
    });
}

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function getById(id) {
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}