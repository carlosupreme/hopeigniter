const { Router } = require("express");
const ReportService = require("../controllers/report.service");
const router = Router();
const reportService = new ReportService();
const multer = require("multer");
const passport = require("passport");
const { uuid } = require("uuidv4");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/fotos/");
	},
	filename: function (req, file, cb) {
		cb(null, `${uuid()}.${file.originalname.split(".")[1]}`);
	},
});

const upload = multer({ storage: storage });

router.get("/", async (req, res, next) => {
	try {
		const reports = await reportService.findAll();

		res.json({
			status: "success",
			data: reports,
		});
	} catch (error) {
		next(error);
	}
});

router.get("/municipio/", async (req, res, next) => {
	try {
		const { m } = req.query;
		console.log(m);
		const reports = await reportService.findByMunicipio(m);

		res.json({
			status: "success",
			data: reports,
		});
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
			const data = { ...req.body };
			data.userId = req.user.sub;
			data.photos = [
				...req.files.map((file) => {
					return file.path.replace("public/", "");
				}),
			];

			const report = await reportService.create(data);

			res.json({
				status: "success",
				data: report,
			});
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
