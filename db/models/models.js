const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			index: true,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},

		accountType: {
			type: String,
			enum: ["Empresa", "Normal"],
			default: "Normal",
		},
	},
	{
		timestamps: true,
	}
);

const TeamSchema = new mongoose.Schema(
	{
		name: String,
		description: String,
		members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		representative: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const EventSchema = new mongoose.Schema({
	name: {type: String, required: true},
	description: String,
	team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
	representative: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	required_amount: Number,
	photos:[{type: String}],
	collected_amount: { type: Number, default: 0 },
});

const DonationSchema = new mongoose.Schema(
	{
		event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		amount: Number,
		payment_method: String,
	},
	{
		timestamps: true,
	}
);

const AuditSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
		amount: Number,
		payment_method: String,
	},
	{ timestamps: true }
);

const Audit = mongoose.model("Audit", AuditSchema);
const User = mongoose.model("User", UserSchema);
const Team = mongoose.model("Team", TeamSchema);
const Event = mongoose.model("Event", EventSchema);
const Donation = mongoose.model("Donation", DonationSchema);

module.exports = {
	User,
	Team,
	Event,
	Donation,
	Audit,
};
