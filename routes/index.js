const { Router } = require("express");
const UsersRouter = require("./users.routes");
const AuthRouter = require("./auth.routes");
const ReportRoute = require("./report.routes");
const MunicipalityRoute = require("./municipality.routes");

function routerAPI(app) {
	const router = Router();
	app.use("/api", router);
	router.use("/users", UsersRouter);
	router.use("/auth", AuthRouter);
	router.use("/report", ReportRoute);
	router.use("/municipality", MunicipalityRoute);
}

module.exports = routerAPI;
