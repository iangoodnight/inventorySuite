const express = require("express");
const path = require("path");
const router = express.Router();

// Serve up static assets
router.use(express.static("client/build"));

// Send every request to the React app
// Define any API routes before this runs
router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

module.exports = router;

// there is a redundancy between line 6 and the scripts for server.js --> look into that later