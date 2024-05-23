const { hash } = require("bcrypt");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		fullname: {
			type: String,
			get: function () {
				return this.firstname + " " + this.lastname;
			},
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["ciudadano", "municipio", "equipo"],
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		municipalityId: {
			type: Schema.Types.ObjectId,
			ref: "Municipality",
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

userSchema.pre("save", async function (next) {
	try {
		if (!this.isModified("password")) return next();
		const hashedPassword = await hash(this.password, 10);
		this.password = hashedPassword;
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.statics.findByName = async function (name) {
	const regex = new RegExp(name, "i");
	return this.find({ $or: [{ firstname: regex }, { lastname: regex }] });
};

const User = model("User", userSchema);

module.exports = User;
