const db = require("../models");

// Defining methods for the 'Things to Remember' controller
module.exports = {
	findAll: function(req,res) {
		db.Things
			.find({})
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},

	create: function(req, res) {
		db.Things
			.create(req.body)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},

	update: function(req, res) {
		db.Things
			.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},

	remove: function(req, res) {
		db.Things
			.findById({ _id: req.params.id })
			.then(dbModel => dbModel.remove())
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	}
	
};