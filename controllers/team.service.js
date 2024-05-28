const boom = require("@hapi/boom");
const { Team } = require("../db/models/models");

class TeamService {
	constructor() {}

	async create(data) {
		const team = await Team.create(data);
		return team;
	}

	async findById(id) {
		const team = await Team.findById(id).populate({
			path: "members",
			pupulate: {
				path: "members",
				model: "User",
				select: "-password"
			}
		}).populate('representative', "-password");

		if (!team) throw boom.notFound();

		return team;
	}

	async updateById(id, data) {
		const team = await Team.findById(id);

		if (!team) throw boom.notFound();

		for (const field in data) {
			if (data[field] !== undefined) {
				if (field === "representative") {
					// remove if new representative is present
					team.members = team.members.filter((userId) => {
						userId !== data[field];
					});

					//move representative to members
					team.members.push(team.representative);
				}

				team[field] = data[field];
			}
		}

		await team.save();
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
