const boom = require("@hapi/boom");
const Report = require("../db/models/report.model");

class ReportService {
	constructor() {}

	async create(data) {
		return await Report.create(data);
	}

	async findAll() {
		try {
			return await Report.find({});
		} catch (error) {
			throw boom.badImplementation();
		}
	}

	async findById(id) {
		return await Report.findById(id);
	}
}

module.exports = ReportService;
