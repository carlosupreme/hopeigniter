var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const { config } = require("./config");
const {
	logErrors,
	boomErrorHandler,
	errorHandler,
} = require("./middlewares/errorHandler");
const routerAPI = require("./routes");
const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

require("./libs/mongoose");
require("./utils/auth");
app.get("/", (req, res) => {
	res.send("Servidor");
});

routerAPI(app);

// middlewares de errores
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(config.port, () => {
	console.log(`Servidor ejecutandose en http://localhost:${config.port}/api`);
});
