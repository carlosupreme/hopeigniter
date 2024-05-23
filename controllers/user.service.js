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
			const users = await User.find({}).select("-password");
			return users;
		} catch (error) {
			throw boom.badImplementation();
		}
	}

	async findOne(id) {
		const user = await User.findOne(id).select("-password");
		if (!user) throw boom.notFound("Usuario no encotnrado");
		return user;
	}
	async findByName(name) {
		try {
			const regex = new RegExp(name, "i");
			const users = await User.find({
				$or: [{ firstname: regex }, { lastname: regex }],
			}).select("-password");
			return users;
		} catch (error) {
			throw boom.notFound("No se encuentra ninguna coincidencia");
		}
	}
	async findByEmail(email) {
		try {
			const user = await User.findOne({ email });
			if (!user) throw boom.notFound();
			return user;
		} catch (error) {
			throw boom.badGateway();
		}
	}
}

module.exports = UserService;
