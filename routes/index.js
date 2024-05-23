const { Router } = require("express");
const UsersRouter = require("./users.routes");
const AuthRouter = require("./auth.routes");
const ReportRoute = require("./report.routes");

function routerAPI(app) {
	const router = Router();
	app.use("/api", router);
	router.use("/users", UsersRouter);
	router.use("/auth", AuthRouter);
	router.use("/report", ReportRoute);
}

module.exports = routerAPI;
