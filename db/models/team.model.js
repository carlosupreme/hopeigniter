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
			type: String,
		},
	],
});

const Team = model("Team", TeamSchema);
module.exports = Team;
