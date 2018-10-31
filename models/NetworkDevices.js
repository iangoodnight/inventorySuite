const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var NetworkDevicesSchema = new Schema ({
	location: { type: String },
	manufacturer: { type: String },
	mac_address: { type: String },
	device_type: { type: String },
	model: { type: String },
	host_name: { type: String },
	serial_number: { type: String },
	username: { type: String },
	password: { type: String },
	static_IP: { type: String },
	SNMP_updated: { type: Boolean },
	last_config_backup: { type: Date },
	notes: { type: String },
	in_use: { type: Boolean }
});

const NetworkDevices = mongoose.model("NetworkDevices", NetworkDevicesSchema);

module.exports = NetworkDevices;