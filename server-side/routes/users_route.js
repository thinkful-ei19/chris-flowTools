const express = require('express');
const knex = require('../knex');
const router = express.Router();
const bcrypt = require('bcryptjs')

router.get('/users', (req, res, next) => {

    knex.select()
        .from('users')
        .then((results) => {
            if (results) {
                res.json(results)
            } else {
                next();
            }
        })
        .catch(err => next(err));
})

router.get('/users/:id', (req, res, next) => {
    const { id } = req.params

    knex.select()
        .from('users')
        .where('users.id', id)
        .then((results) => {
            console.log(results);
            if (results) {
                res.json(results)
            } else {
                next();
            }
        })
        .catch(err => next(err));
})

router.post('/users', (req,res,next) => {
    const { username, password } = req.body;

    const hashPassword = function (password) {
        return bcrypt.hash(password, 10)
    }

    knex.select()
        .from('users')
        .where('users.username', username)
        .then((results) => {
            if (results.length > 0) {
                const err = new Error('That username already exists!');
                err.status = 400;
                return next(err);
            } else {

                return hashPassword(password)
                    .then((digest) => {
                        const newUser = {
                            username,
                            password: digest,
                            settings: {"scheme": "light"},
                            widgets: {"pomodoro": "off", "MixCloud": "off"}
                        }
                        return knex('users')
                        .insert(newUser).returning(['id', 'username', 'password'])
                        .then((result) => {
                            res.json(result);
                        })
                        .catch(err => next(err));
                    })
            }
        })
        .catch(err => next(err))
})

router.put('/users/:id', (req,res,next) => {
    const { id } = req.params;
    const { username, password, settings, widgets } = req.body;

    const hashPassword = function (password) {
        return bcrypt.hash(password, 10)
    }
    
    return hashPassword(password)
        .then((digest) => {
            const updateUser = {
                username,
                password: digest,
                settings,
                widgets
            }
            knex.select()
                .from('users')
                .where({id})
                .update(updateUser)
                .returning(['id', 'username', 'password', 'settings', 'widgets'])
                .then((result) => {
                    res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
                })
                .catch(err => next(err));
        })
})

router.delete('/users/:id', (req,res,next) => {
    const { id } = req.params;

    knex.select()
        .from('users')
        .where({id})
        .del()
        .then((results) => {
            if (results) {
                res.status(204).end();
            } else {
                next()
            }
        })
        .catch(err => next(err))
})

module.exports = router;