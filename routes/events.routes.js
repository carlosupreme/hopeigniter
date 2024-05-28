const { Router } = require("express");
const EventService = require("../controllers/event.service");
const passport = require("passport");
const {upload} = require('../middlewares/multer');

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
    upload.array("photos", 3),
	async (req, res, next) => {
		try {
			let data = req.body;
            data.photos = req.files.map((file) => {
				return file.path.replace("public/", "");
			});

			const idUser = req.user?.user._id;
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
		const rta = await service.update(id, data);
		res.json(rta);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
