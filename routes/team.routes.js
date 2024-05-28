const { Router } = require("express");
const TeamService = require("../controllers/team.service");
const passport = require("passport");
const router = Router();
const service = new TeamService();

router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const teams = await service.find();
			res.status(201).json(teams);
		} catch (error) {
			next(error);
		}
	}
);

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

router.get(
	"/my-teams",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const userId = req.user.sub;
			const teams = await service.findTeamsByMemberId(userId);

			res.status(201).json(teams);
		} catch (error) {
			next(error);
		}
	}
);

router.get(
	"/:teamId",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const { teamId } = req.params;
			const teams = await service.findById(teamsId);

			res.status(201).json(team);
		} catch (error) {
			next(error);
		}
	}
);

router.patch(
	"/:teamId",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const { teamId } = req.params;
			const { name, description, representative } = req.body;
			const team = await service.updateById(teamId, {
				name,
				description,
				representative,
			});

			res.status(201).json(team);
		} catch (error) {
			next(error);
		}
	}
);

router.put(
	"/add-members/:teamId",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const { teamId } = req.params;
			const { members } = req.body;
			const team = await service.addMembers(teamId, members);

			res.status(201).json(team);
		} catch (error) {
			next(error);
		}
	}
);

router.put(
	"/remove-members/:teamId",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const { teamId } = req.params;
			const { members } = req.body;
			const team = await service.removeMembers(teamId, members);

			res.status(201).json(team);
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
