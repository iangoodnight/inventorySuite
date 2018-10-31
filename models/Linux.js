const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var LinuxSchema = new Schema ({
	user: { type: String },
	department: { type: String },
	location: { type: String },
	model: { type: String },
	serial_number: { type: String },
	mac_address: { type: String },
	mac_address_2: { type: String },
	pc_description: { type: String },
	pc_name: { type: String },
	OS: { type: String },
	VNC: { type: Boolean },
	labeled: { type: Boolean },
	SSH: { type: Boolean },
	notes: { type: String },
	last_verified: { type: Date }
});

const Linux = mongoose.model("Linux", LinuxSchema);

module.exports = Linux;