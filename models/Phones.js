const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PhonesSchema = new Schema ({
	user: { type: String },
	host_name: { type: String },
	phone_type: { type: String },
	mac_address: { type: String },
	reason_for_wifi: { type: String },
	IMEI: { type: Number },
	asset_ID: { type: String },
	serial_in_google: { type: String },
	device_ID_in_google: { type: String },
	MEID: { type : String },
	case: { type: Boolean },
	device_manager: { type: Boolean },
	OS: { type: String },
	notes: { type: String },
	broken_deactivated: { type: Boolean },
	under_review: { type: Boolean },
	personal: { type: Boolean }
});

const Phones = mongoose.model("Phones", PhonesSchema);

module.exports = Phones;