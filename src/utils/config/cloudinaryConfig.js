const cloudinary  = require("cloudinary");
const uploader = cloudinary.v2.uploader;

const cloudinaryConfig = (req, res, next) =>{
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});
	next();
}
	
module.exports = { cloudinaryConfig, uploader };
