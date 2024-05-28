const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	accountType: String,
	created_at: { type: Date, default: Date.now },
}, {
	timestamps: true
});

const TeamSchema = new mongoose.Schema({
	name: String,
	description: String,
	members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	created_at: { type: Date, default: Date.now },
}, {
	timestamps: true
});

const EventSchema = new mongoose.Schema({
	name: String,
	description: String,
	team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
	representative: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	required_amount: Number,
	collected_amount: { type: Number, default: 0 },
	created_at: { type: Date, default: Date.now }
});

const DonationSchema = new mongoose.Schema({
	event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	amount: Number,
	payment_method: String,
	created_at: { type: Date, default: Date.now },
},  {
	timestamps: true
});

const User = mongoose.model("User", UserSchema);
const Team = mongoose.model("Team", TeamSchema);
const Event = mongoose.model("Event", EventSchema);
const Donation = mongoose.model("Donation", DonationSchema);

module.exports = {
	User,
	Team,
	Event,
	Donation,
};
