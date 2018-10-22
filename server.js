const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const routes = require("./routes");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Use morgan for dev
app.use(logger("dev"));
// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
// (probably redundant)
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);
// Custom error handling middleware that logs the error to console, then renders an error page describing the error.
app.use((error, req, res, next) => {
	console.error(error);
	res.json({
		error
	})
});

// Configure mongoose
require('./middleware/mongoose')()
	.then(() => {
		// mongo is connected, so now we can start our express server.
		app.listen(PORT, () => console.log(`🌎 ==> Server now on port ${PORT}!`));
	})
	.catch(err => {
		// an error occurred connecting to mongo
		// log error and exit
		console.error('Unable to connect to Mongo.')
		console.error(err);
	});

