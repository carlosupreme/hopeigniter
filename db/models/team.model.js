const { Schema, model } = require("mongoose");

const TeamSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	municipalityId: {
		type: Schema.Types.ObjectId,
		ref: "Municipality",
		required: true,
	},
	members: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
});

const Team = model("Team", TeamSchema);
module.exports = Team;
