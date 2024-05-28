const { Router } = require("express");
const TeamService = require("../controllers/team.service");
const passport = require("passport");
const router = Router();
const service = new TeamService();

router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const body = req.body;
            const representative = req.user.sub;
            console.log({ ...body, representative });
            const team = await service.create({ ...body, representative });

            res.status(201).json(team);
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
