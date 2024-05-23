const mongoose = require("mongoose");
const { config } = require("../config");
const debug = require("debug")("api:mongoose");

mongoose
	.connect(config.dbUri)
	.then(() => {
		console.log("DB connection successfully");
	})
	.catch((err) => {
		console.log("Error connecting to mongodb", err);
	});
