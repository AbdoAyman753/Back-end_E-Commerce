const multer  = require('multer')
const DatauriParser = require('datauri/parser');
const path = require('path');
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');


// const dUri = new Datauri();
const parser = new DatauriParser();
/**
* @description This function converts the buffer to data url
* @param {Object} req containing the field object
* @returns {String} The data url from the string buffer
*/
// const dataUri = async req => await DataURI.format(path.extname(req.file.originalname).toString(), req.file.buffer);
const dataUri = req => parser.format(req.file.originalname, req.file.buffer);

module.exports = { multerUploads, dataUri };