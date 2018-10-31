const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ServersSchema = new Schema ({
	location: { type: String },
	computer_name: { type: String },
	network_adaptor_1: { type: String },
	network_adaptor_2: { type: String },
	network_adaptor_3: { type: String },
	MGMT_port_IP: { type: String },
	model: { type: String },
	serial_number: { type: String },
	bluetech: { type: Boolean },
	OS_WOL: { type: Boolean },
	bios_WOL: { type: Boolean },
	labeled: { type: Boolean },
	whats_running: { type: String },
	notes: { type: String }
});

const Servers = mongoose.model("Servers", ServersSchema);

module.exports = Servers;