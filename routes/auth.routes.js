const passport = require("passport");
const { config } = require("../config");
const router = require("./users.routes");
const jwt = require("jsonwebtoken");

router.post(
	"/login/local",
	passport.authenticate("local", { session: false }),
	async (req, res, next) => {
		try {
			const user = req.user;
			const payload = {
				sub: user.id,
				role: user.role,
			};
			const token = jwt.sign(payload, config.secretKey);
			res.json({
				user,
				token,
			});
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
