const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('_helpers/authorize');
const Role = require('_helpers/role');

// routes
router.post('/signup', addUser); //Signup students
router.post('/authenticate', authenticate);     // public route
router.get('/', authorize(Role.Admin), getAll); // admin only
router.get('/', authorize(Role.Instructor), getAll); // instructors only
router.get('/:id', authorize(), getById);       // all authenticated users
module.exports = router;

function addUser(req, res) {
    userService.insert(req.body)
        .then(data => {
            res.status(data.status).send({message: data.message});
        }).catch(err => {
            res.status(err.status).send({message: err.message});
    })
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}