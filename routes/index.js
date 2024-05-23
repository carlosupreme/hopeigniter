const { Router } = require("express");
const UsersRouter = require("./users.routes");
const AuthRouter = require("./auth.routes");
function routerAPI(app) {
	const router = Router();
	app.use("/api", router);
	router.use("/users", UsersRouter);
	router.use("/auth", AuthRouter);
}

module.exports = routerAPI;
