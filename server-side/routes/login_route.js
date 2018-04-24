const express = require('express');
const knex = require('../knex');
const router = express.Router();
const passport = require('passport');
const config = require('../config')
const jwt = require('jsonwebtoken');

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

const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });

router.post('/refresh', jwtAuth, (req, res) => {
    const authToken = createAuthToken(req.user);
    res.json({ authToken })
});

module.exports = router;