const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CompletedPCsSchema = new Schema ({
	user: { type: String },
	department: { type: String },
	location: { type: String },
	model: { type: String },
	serial_number: { type: String },
	mac_address: { type: String },
	mac_address_2: { type: String },
	pc_description: { type: String },
	pc_name: { type: String },
	GPupdate: { type: Boolean },
	RDPwrap: { type: Boolean },
	VNC: { type: Boolean },
	bluetech: { type: Boolean },
	OS_WOL: { type: Boolean },
	bios_WOL: { type: Boolean },
	labeled: { type: Boolean },
	completed: { type: Boolean },
	notes: { type: String },
	last_verified: { type: Date }
});

const CompletedPCs = mongoose.model("CompletedPCs", CompletedPCsSchema);

module.exports = CompletedPCs;