require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport')
const jwt = require('jsonwebtoken');
const { PORT } = require('./config');
const cors = require('cors');

const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');

const loginRouter = require('./routes/login_route.js');
const notesRouter = require('./routes/notes_route.js');
const usersRouter = require('./routes/users_route.js');

const app = express();

app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common', {
    skip: () => process.env.NODE_ENV === 'test'
}));

//Create the static web server;
app.use(express.static('public'));

// Parse request bodies as JSON.
app.use(express.json());

//CORS
// const corsOptions = {
//     origin: `http://localhost:${PORT}`,
//     optionsSuccessStatus: 200
// }
// app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
      return res.send(204);
    }
    next();
  });  

// Routers
app.use('/', loginRouter);

passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(passport.authenticate('jwt', {session: false, failWithError: true}));

app.use('/api', usersRouter);
app.use('/api', notesRouter);

// Catch 404s
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

//Otherwise catch other errors, 500 if no other error.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: app.get('env') === 'development' ? err: {}
    });
});

app.listen(PORT, () => {
    console.info(`Server port opened on ${PORT}`);
}).on('error', err => {
    console.error(err);
});

module.exports = app;