const mongoose = require('mongoose');

module.exports = function() {
	// If deployed, use the deployed database.  Otherwise use the local mongo database
	var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/inventory";

	// Configure mongoose to use promises instead of callbacks
	mongoose.Promise = global.Promise;
	// Connect to the Mongo DB
	return mongoose.connect(MONGODB_URI);
}