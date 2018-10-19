const express = require("express");
const router = require("express").Router();
const thingsController = require("../../controllers/thingsController");

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
	
module.exports = router;