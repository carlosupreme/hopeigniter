const { notFound } = require("@hapi/boom");
const { Event, Team } = require("../db/models/models");
class EventService {
	constructor() {}
	async find() {
		const events = await Event.find({})
			.populate({
				path: "team",
				populate: {
					path: "members",
					model: "User",
                    select: "-password"
				},
			})
			.populate("representative", "-password");
		return events;
	}

	async findOne(id) {
		const event = await Event.findById(id)
			.populate({
				path: "team",
				populate: {
					path: "members",
					model: "User",
                    select: '-password'
				},
			})
			.populate("representative", "-password");
		if (!event) throw notFound("Evento no encontrado");
		return event;
	}

	async create(data) {
		const team = await Team.findById(data.team);
		if (!team) throw notFound("Equipo no encontrado");
		data = {
			...data,
			representative: team.representative,
		};
		const event = await Event.create(data);
		return event;
	}
	async deleteOne(id) {
		const event = await Event.findOneAndDelete(id);
		return {
			message: "Evento eliminado",
			id,
			event,
		};
	}

	async update(id, data) {
		const event = await Event.findByIdAndUpdate(id, data);
		return {
			message: "Evento actualizado",
			event,
		};
	}
}

module.exports = EventService;