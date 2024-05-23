const { Schema, model } = require("mongoose");

const municipalitySchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: false,
	},
	contactInfo: {
		type: String,
		required: false,
	},
});

const Municipality = model("Municipality", municipalitySchema);
module.exports = Municipality;
