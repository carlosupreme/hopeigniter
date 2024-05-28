const passport = require("passport");
const { config } = require("../config");
const router = require("./users.routes");
const jwt = require("jsonwebtoken");
const UserService = require("../controllers/user.service");
const { hash } = require("bcrypt");
const service = new UserService()

router.post(
	"/login/local",
	passport.authenticate("local", { session: false }),
	async (req, res, next) => {
		try {
			const user = req.user;
			const payload = {
				sub: user.id,
				user: user,
			};
			const token = jwt.sign(payload, config.secretKey);
			res.json({
				user,
				token,
			});
		} catch (error) {
			next(error);
		}
	},


);

router.post("/register", async (req,res, next)=>{
	try {
		let data = req.body
		const newUser = await service.create(data)
		// const usrobj = newUser.toObject()
		// delete usrobj.password
		res.status(201).json(newUser)
	} catch (error) {
		next(error)
	}
})

module.exports = router;
