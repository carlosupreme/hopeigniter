const { Strategy } = require("passport-local");
const UserService = require("../../../controllers/user.service");
const { badData, unauthorized } = require("@hapi/boom");
const { compare } = require("bcrypt");

const service = new UserService();

const localStrategy = new Strategy(
	{
		usernameField: "email",
		passwordField: "password",
	},
	async (email, password, done) => {
		try {
			if (email === "" && password === "") done(badData(), false);
			const user = await service.findByEmail(email);
			if (!user) done(unauthorized(), false);
			const isMatch = await compare(password, user.password);
			if (!isMatch) done(unauthorized(), false);
			done(null, user);
		} catch (error) {
			console.log();
			done(error, false);
		}
	}
);

module.exports = localStrategy;
