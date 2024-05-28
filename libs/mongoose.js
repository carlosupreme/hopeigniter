const mongoose = require("mongoose");
const { config } = require("../config");
const debug = require("debug")("hopeignite:mongoose");

mongoose
	.connect(config.dbUri)
	.then(() => {
		debug("DB connection successfully");
	})
	.catch((err) => {
		debug("Error connecting to mongodb", err);
	});
