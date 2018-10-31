const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ChromeMachinesSchema = new Schema ({
	user: { type: String },
	location: { type: String },
	serial_number: { type: String },
	mac_address: { type: String },
	mac_address_2: { type: String },
	asset_ID: { type: String },
	labeled: { type: Boolean },
	ram_size: { type: String },
	notes: { type: String },
	last_verified: { type: Date }
});

const ChromeMachines = mongoose.model("ChromeMachines", ChromeMachinesSchema);

module.exports = ChromeMachines;