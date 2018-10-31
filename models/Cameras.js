const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CamerasSchema = new Schema ({
	locations: { type: String },
	camera_name: { type: String },
	host_name: { type: String },
	mac_address: { type: String },
	model: { type: String },
	static_IP: { type: String },
	sd_card_size: { type: String },
	SNMP: { type: Boolean },
	notes: { type: String },
	last_verified: { type: Date}
});

const Cameras = mongoose.model("Cameras", CamerasSchema);

module.exports = Cameras;