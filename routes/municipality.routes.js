const { Router } = require("express");
const MunicipalityService = require("../controllers/municipality.service");
const router = Router();
const municipalityService = new MunicipalityService();

router.post("/", async (req, res, next) => {
	try {
		const data = req.body;
		const municipality = await municipalityService.create(data);

		res.json({
			status: "success",
			data: municipality,
		});
	} catch (error) {
		next(error);
	}
});

router.get("/", async (req, res, next) => {
	try {
		const municipalities = await municipalityService.findAll();

		res.json({
			status: "success",
			data: municipalities,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
