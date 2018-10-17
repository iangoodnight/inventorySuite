const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Custom error handling middleware that logs the error to console, then renders an error page describing the error.
app.use((err, req, res, next) => {
	console.error(error);
	res.json({
		error
	})
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Configure mongoose
require('./middleware/mongoose')()
	.then(() => {
		// mongo is connected, so now we can start our express server.
		app.listen(PORT, => console.log(`🌎 ==> Server now on port ${PORT}!`));
	})
	.catch(err => {
		// an error occurred connecting to mongo
		// log error and exit
		console.error('Unable to connect to Mongo.')
		console.error(err);
	});

