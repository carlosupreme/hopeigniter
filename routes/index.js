const { Router } = require("express");
const UsersRouter = require("./users.routes");
const AuthRouter = require("./auth.routes");
const TeamRouter = require("./team.routes");
const EventsRotuer = require('./events.routes');

function routerAPI(app) {
	const router = Router();
	app.use("/api", router);
	router.use("/users", UsersRouter);
	router.use("/auth", AuthRouter);
	router.use("/teams", TeamRouter);
	router.use("/events", EventsRotuer)
}

module.exports = routerAPI;
