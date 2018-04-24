const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const options = {
    secretOrKey: 'test',
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    algorithms: ['HS256']
};

const jwtStrategy = new JwtStrategy(options, (payload, done) => {
    done(null, payload.user);
});

module.exports = jwtStrategy;