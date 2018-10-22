const express = require("express");
const router = require("express").Router();
const thingsController = require("../../controllers/thingsController");
const computersController = require("../../controllers/computersController");

// Matched with "api/things"
router
	.route("/things")
	.get(thingsController.findAll)
	.post(thingsController.create);

// Matched with "api/things/:id"
router
	.route("/things/:id")
	.put(thingsController.update)
	.get(thingsController.remove)

// Matched with "api/computers"
router
	.route("/computers")
	.get(computersController.findAll)
	.post(computersController.create);

// Matched with "api/computers/:id"
router
	.route("/computers/:id")
	.put(computersController.update)
	.get(computersController.remove)	
	
module.exports = router;