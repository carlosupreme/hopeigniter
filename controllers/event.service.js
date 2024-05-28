const { notFound } = require("@hapi/boom");
const { Event } = require("../db/models/models");
class EventService {
	constructor() {}
	async find() {
		const events = await Event.find({});
		return events;
	}

	async findOne(id) {
		const event = await Event.findById(id);
		if (!event) throw notFound("Evento no encontrado");
		return event;
	}

    async create(data){
        const event = await Event.create(id)
        return event

    }
    async deleteOne(id){
        const event = await Event.findOneAndDelete(id)
        return  {
            message: "Evento eliminado",
            id, event
        }
    }

    async update(id, data){
        const event = await Event.findByIdAndUpdate(id, data)
        return {
            message: "Evento actualizado",
            event
        }
    }
}

module.exports = EventService;
