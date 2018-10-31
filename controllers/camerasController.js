const db = require("../models");

// Defining methods for the 'Cameras' controller
module.exports = {
	findAll: function(req,res) {
		db.Cameras
			.find({})
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},

	create: function(req, res) {
		db.Cameras
			.create(req.body)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},

	update: function(req, res) {
		db.Cameras
			.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},

	remove: function(req, res) {
		db.Cameras
			.findById({ _id: req.params.id })
			.then(dbModel => dbModel.remove())
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	}
	
};