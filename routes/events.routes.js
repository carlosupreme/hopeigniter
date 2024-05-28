const { Router } = require("express");
const EventService = require("../controllers/event.service");
const passport = require("passport");

const router = Router();

const service = new EventService();
router.get("/", async (req, res, next) => {
	try {
		const events = await service.find();
		res.json(events);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const event = await service.findOne(id);
		res.json(event);
	} catch (error) {
		next(error);
	}
});

router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const data = req.body;
            const idUser= req.user?.user._id

            // console.log(req.user.sub);
            // console.log("id usuario login ",idUser?.user._id);
            console.log("USUARIO ID",idUser);
			const newEvent = await service.create(data, idUser);
			res.status(201).json(newEvent);
		} catch (error) {
			next(error);
		}
	}
);

router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const rta = await service.deleteOne(id);
		res.json(rta);
	} catch (error) {
		next(error);
	}
});

router.patch("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const data = req.body;
		const rta = await service.update(id, body);
		res.json(rta);
	} catch (error) {
		next(error);
	}
});
module.exports = router;
