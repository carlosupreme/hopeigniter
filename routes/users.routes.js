const { Router } = require("express");

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const users = [];
		res.json(users);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
