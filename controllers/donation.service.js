const { default: mongoose } = require("mongoose");
const { Donation, Event, User } = require("../db/models/models");
const { notFound } = require("@hapi/boom");

class DonationService {
	constructor() {}

	async getByEventId(eventId) {
		const event = await Event.findById(eventId);

		if (!event) throw { err: "event not found" };

		const donations = await Donation.find({
			event: eventId,
		}).populate({
			path: "event",
			model: "Event",
			populate: {
				path: "team",
				model: "Team",
				populate: {
					path: "members",
					model: "User",
					select: "-password",
				},
			},
		});

		return donations;
	}

	async donate(data) {
		const event = await Event.findById(data.eventId);

		if (!event) throw { err: "event not found" };
		const user = await User.findById(data.userId);

		if (!user) throw notFound("User not found");

		const session = await mongoose.startSession();
		session.startTransaction();
		let donation = null;

		try {
			event.collected_amount += data.amount;
			donation = await Donation.create({
				event: data.eventId,
				amount: data.amount,
				user: data.userId,
				stripeCustomerId: data.stripeCustomerId,
				stripePaymentMethodId: data.stripePaymentMethodId,
			});
			await event.save();
			await session.commitTransaction();
		} catch (err) {
			console.log(err);
			await session.abortTransaction();
		}

		session.endSession();

		return donation;
	}
}

module.exports = DonationService;
