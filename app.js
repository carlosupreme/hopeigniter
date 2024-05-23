var createError = require("http-errors");
const debug = require("debug")("api:index");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const morgan = require("morgan");
const { config } = require("./config");
const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.send("Servidor");
});

app.listen(config.port, () => {
	debug(`Servidor ejecutandose en http://localhost:${config.port}`);
});
