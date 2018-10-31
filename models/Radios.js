const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var RadiosSchema = new Schema ({
	radio_number: { type: String },
	employee: { type: String },
	actual_employee: { type: String },
	location: { type: String },
	actual_location: { type: String },
	serial_number: { type: String },
	actual_serial_number: { type: String },
	last_checked: { type: Date }
});

const Radios = mongoose.model("Radios", RadiosSchema);

module.exports = Radios;