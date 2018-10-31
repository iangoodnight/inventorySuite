const express = require("express");
const router = require("express").Router();
const camerasController = require("../../controllers/camerasController");
const chromeMachinesController = require("../../controllers/chromeMachinesController");
const completedPCsController = require("../../controllers/completedPCsController");
const computersController = require("../../controllers/computersController");
const linuxController = require("../../controllers/linuxController");
const networkDevicesController = require("../../controllers/networkDevicesController");
const othersController = require("../../controllers/othersController");
const phonesController = require("../../controllers/phonesController");
const printersController = require("../../controllers/printersController");
const radiosController = require("../../controllers/radiosController");
const serversController = require("../../controllers/serversController");
const tabletsController = require("../../controllers/tabletsController");
const thingsController = require("../../controllers/thingsController");

// Matched with "api/cameras"
router
	.route("/cameras")
	.get(camerasController.findAll)
	.post(camerasController.create);

// Matched with "api/cameras/:id"
router
	.route("/cameras/:id")
	.put(camerasController.update)
	.get(camerasController.remove);

// Matched with "api/chrome"
router
	.route("/chrome")
	.get(chromeMachinesController.findAll)
	.post(chromeMachinesController.create);

// Matched with "api/chrome/:id"
router
	.route("/chrome/:id")
	.put(chromeMachinesController.update)
	.get(chromeMachinesController.remove);

// Matched with "api/completed"
router
	.route("/completed")
	.get(completedPCsController.findAll)
	.post(completedPCsController.create);

// Matched with "api/completed/:id"
router
	.route("/completed/:id")
	.put(completedPCsController.update)
	.get(completedPCsController.remove);	

// Matched with "api/computers"
router
	.route("/computers")
	.get(computersController.findAll)
	.post(computersController.create);

// Matched with "api/computers/:id"
router
	.route("/computers/:id")
	.put(computersController.update)
	.get(computersController.remove);

// Matched with "api/linux"
router
	.route("/linux")
	.get(linuxController.findAll)
	.post(linuxController.create);

// Matched with "api/linux/:id"
router
	.route("/linux/:id")
	.put(linuxController.update)
	.get(linuxController.remove);

// Matched with "api/network"
router
	.route("/network")
	.get(networkDevicesController.findAll)
	.post(networkDevicesController.create);

// Matched with "api/network/:id"
router
	.route("/network/:id")
	.put(networkDevicesController.update)
	.get(networkDevicesController.remove);

// Matched with "api/others"
router
	.route("/others")
	.get(othersController.findAll)
	.post(othersController.create);

// Matched with "api/others/:id"
router
	.route("/others/:id")
	.put(othersController.update)
	.get(othersController.remove);

// Matched with "api/phones"
router
	.route("/phones")
	.get(phonesController.findAll)
	.post(phonesController.create);

// Matched with "api/phones/:id"
router
	.route("/phones/:id")
	.put(phonesController.update)
	.get(phonesController.remove);

// Matched with "api/printers"
router
	.route("/printers")
	.get(printersController.findAll)
	.post(printersController.create);

// Matched with "api/printers/:id"
router
	.route("/printers/:id")
	.put(printersController.update)
	.get(printersController.remove);

// Matched with "api/radios"
router
	.route("/radios")
	.get(radiosController.findAll)
	.post(radiosController.create);

// Matched with "api/radios/:id"
router
	.route("/radios/:id")
	.put(radiosController.update)
	.get(radiosController.remove);

// Matched with "api/servers"
router
	.route("/servers")
	.get(serversController.findAll)
	.post(serversController.create);

// Matched with "api/servers/:id"
router
	.route("/servers/:id")
	.put(serversController.update)
	.get(serversController.remove);

// Matched with "api/tablets"
router
	.route("/tablets")
	.get(tabletsController.findAll)
	.post(tabletsController.create);

// Matched with "api/tablets/:id"
router
	.route("/tablets/:id")
	.put(tabletsController.update)
	.get(tabletsController.remove);

// Matched with "api/things"
router
	.route("/things")
	.get(thingsController.findAll)
	.post(thingsController.create);

// Matched with "api/things/:id"
router
	.route("/things/:id")
	.put(thingsController.update)
	.get(thingsController.remove);
	
module.exports = router;