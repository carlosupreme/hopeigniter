const boom = require("@hapi/boom");
const { Team } = require("../db/models/models");

class TeamService {
	constructor() {}

	async create(data) {
		const team = await Team.create(data);
		return team;
	}

	async find() {
		try {
			return await Team.find();
		} catch (error) {
			throw boom.badImplementation();
		}
	}


}

module.exports = TeamService;
