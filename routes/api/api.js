const express = require("express");
const router = require("express").Router();
const thingsController = require("../../controllers/thingsController");

// Matched with "api/things"
router
	.route("/things")
	.get(thingsController.findAll)
	.post(thingsController.create);

module.exports = router;