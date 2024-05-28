
const multer = require('multer');
const {uuid} = require('uuidv4');   
const SharpMulter = require("sharp-multer");

const newFilenameFunction = (f, options) => {
	return `${uuid()}.${f.split(".")[1]}`;
};

const storage = SharpMulter({
	destination: (req, file, callback) => callback(null, "public/fotos"),

	imageOptions: {
		fileFormat: "png",
		quality: 80,
		resize: { width: 500, height: 500, resizeMode: "contain" },
	},

	filename: newFilenameFunction, 
});
const upload = multer({storage})
module.exports = {upload}