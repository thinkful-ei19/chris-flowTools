const express = require('express');
const knex = require('../knex');
const router = express.Router();
const passport = require('passport');
const config = require('../config')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const localStrategy = require('../passport/local');

function createAuthToken (user) {
    return jwt.sign({ user }, 'test');
}

const options = { session: false, failWithError: true };
const localAuth = passport.authenticate('local', options);

router.post('/login', localAuth, (req, res) => {

    const authToken = createAuthToken(req.user);
    return res.json({ authToken });
    res.json('Access Granted')
})

router.post('/signup', (req,res,next) => {
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

const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });

router.post('/refresh', jwtAuth, (req, res) => {
    const authToken = createAuthToken(req.user);
    res.json({ authToken })
});

module.exports = router;