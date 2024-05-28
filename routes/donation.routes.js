const { Router } = require("express");
const DonationService = require("../controllers/donation.service");
const passport = require("passport");
const router = Router();
const service = new DonationService();

router.get(
	"/:eventId",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const { eventId } = req.params;
			const donations = await service.getByEventId(eventId);
			res.status(201).json(donations);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	"/:eventId",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const { eventId } = req.params;
			const userId = req.user?.user._id;
			const { amount, stripeCustomerId, stripePaymentMethodId } = req.body;
			console.log("ID", userId);
			const donation = await service.donate({
				userId,
				eventId,
				amount,
				stripeCustomerId,
				stripePaymentMethodId,
			});

			res.status(201).json(donation);
		} catch (error) {
			next(error);
		}
	}
);
module.exports = router;
