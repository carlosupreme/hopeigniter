const { ExtractJwt } = require("passport-jwt");
const { config } = require("../../../config");
const { Strategy } = require("passport-jwt");
const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.secretKey,
};

const JwtStrategy = new Strategy(options, (payload, done) => {
	return done(null, payload);
});
module.exports = JwtStrategy;
