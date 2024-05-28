const boom = require("@hapi/boom");
const { User } = require("../db/models/models");
const bcrypt = require("bcrypt");
class UserService {
	constructor() {}

	async create(data) {
		const hash = await bcrypt.hash(data.password, 10);
		const newUser = await User.create({
			...data,
			password: hash,
		})
		const usrobj = newUser.toObject()
		
		delete usrobj.password
		return usrobj;	
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
				$or: [{ name: regex }],
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

	async deleteOne(id) {
		try {
			const user = await User.findByIdAndDelete(id)

			return {
				message: "Usuario eliminado",
				id, user
			};
		} catch (error) {}
	}
}

module.exports = UserService;
