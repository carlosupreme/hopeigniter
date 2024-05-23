const boom = require("@hapi/boom");
const User = require("../db/models/user.model");
class UserService {
	constructor() {}

	async create(data) {
		const newUser = await User.create(data);
		return newUser;
	}

	async find() {
		try {
			const users = await User.find({});
			return users;
		} catch (error) {
			throw boom.badImplementation();
		}
	}

	async findOne(name) {
		const user = await User.findByName(name);
		return user;
	}
}

module.exports = UserService;
