const boom = require("@hapi/boom");
const Municipality = require("../db/models/municipality.model");

class MunicipalityService {
	constructor() {}

	async create(data) {
		return await Municipality.create(data);
	}

	async findAll() {
		try {
			return await Municipality.find({});
		} catch (error) {
			throw boom.badImplementation();
		}
	}

	async findById(id) {
		return await Municipality.findById(id);
	}

	async findByName(name) {
		return await Municipality.find({ name });
	}
}

module.exports = MunicipalityService;
