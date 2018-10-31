const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TabletsSchema = new Schema ({
	location: { type: String },
	mac_address: { type: String },
	asset_ID: { type: String },
	model: { type: String },
	serial_number: { type: String },
	serial_number_in_google: { type: String },
	device_ID: { type: String },
	in_device_manager: { type: Boolean },
	labeled: { type: Boolean },
	notes: { type: String }
});

const Tablets = mongoose.model("Tablets", TabletsSchema);

module.exports = Tablets;