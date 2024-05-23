require("dotenv").config();

const config = {
	port: process.env.PORT,
	secretKey: process.env.SECRET,
	dbUri: process.env.DBURI,
};

module.exports = { config };
