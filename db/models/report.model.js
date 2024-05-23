const { Schema, model } = require("mongoose");

const ReportSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	municipalityId: {
		type: Schema.Types.ObjectId,
		ref: "Municipality",
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	teamId: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	photos: {
		type: [String],
		validate: {
			validator: function (v) {
				return v.length >= 1 && v.length <= 3;
			},
			message: "A report must have between 1 and 3 photos.",
		},
		required: true,
	},
	status: {
		type: String,
		enum: ["activo", "proceso", "finalizado", "invalido"],
		default: "activo",
	},
	priority: {
		type: String,
		enum: ["bajo", "medio", "alto"],
		default: "bajo",
	},
	description: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Report = model("Report", ReportSchema);
module.exports = Report;
