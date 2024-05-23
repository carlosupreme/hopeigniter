const { config } = require("../config");
const router = require("./users.routes");
const jwt = require("jsonwebtoken");

router.post("/login/local", async (req, res, next) => {
	// TODO login
	try {
		const user = req.user;
		const payload = {
			sub: user.id,
			role: user.role,
		};
		const token = jwt.sign(payload, config.secretKey);
		res.json({
			user: token,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
