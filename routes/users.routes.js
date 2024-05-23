const { Router } = require("express");
const UserService = require("../controllers/user.service");

const router = Router();
const service = new UserService();
router.get("/", async (req, res, next) => {
	try {
		const users = await service.find();
		res.json(users);
	} catch (error) {
		console.log(error.message);
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const body = req.body;
		const newUser = await service.create(body);
		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
