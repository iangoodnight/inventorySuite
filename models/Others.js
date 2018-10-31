const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var OthersSchema = new Schema ({
	location: { type: String },
	device_name: { type: String },
	mac_address: { type: String },
	IP: { type: String },
	firmware_version: { type: String },
	serial_number: { type: String },
	IMEI: { type: String },
	model: { type: String },
	brand: { type: String },
	notes: { type: String }
});

const Others = mongoose.model("Others", OthersSchema);

module.exports = Others;