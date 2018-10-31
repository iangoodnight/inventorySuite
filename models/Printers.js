const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PrintersSchema = new Schema ({
	model: { type: String },
	printer_name: { type: String },
	location: { type: String },
	mac_address: { type: String },
	mac_address_2: { type: String},
	host_name: { type: String },
	static_IP: { type: String },
	username_password: {type: String },
	last_verified: { type: Date },
	notes: { type: String },
	server_hosted_on: { type: String },
	possibly_removed: { type: Boolean },
	removed: { type: Boolean }
});

const Printers = mongoose.model("Printers", PrintersSchema);

module.exports = Printers;