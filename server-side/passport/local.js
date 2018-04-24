const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcryptjs');
const knex = require('../knex');

const localStrategy = new LocalStrategy((username, password, done) => {
    
    const validatePassword = function (inputPW, originalPW) {
        return bcrypt.compare(inputPW, originalPW)
    }

    let user;
    knex.select()
        .from('users')
        .where({ username })
        .then((result) => {
            user = result;
            if (!user) {
                return Promise.reject({
                    reason: 'LoginError',
                    message: 'Incorrect username',
                    location: 'username'
                });
            }
            return validatePassword(password, user[0].password);
        })
        .then(isValid => {
            if (!isValid) {
                return Promise.reject({
                    reason: 'LoginError',
                    message: 'Incorrect password',
                    location: 'password'
                });
            }
            return done(null, user);
        })
        .catch(err => {
            if (err.reason === 'LoginError') {
              return done(null, false);
            }
            return done(err);
        });
})

module.exports = localStrategy;