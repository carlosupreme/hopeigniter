const { Router } = require("express");
const ReportService = require("../controllers/report.service");
const router = Router();
const reportService = new ReportService();
const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/fotos/");
	},
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname);
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

router.post("/", upload.array("photos", 3), async (req, res, next) => {
	try {
		const data = req.body;
		data.photos = [...req.files.map((file) => file.path)];
		const report = await reportService.create(data);

		res.json({
			status: "success",
			data: report,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
