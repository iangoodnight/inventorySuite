const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ThingsSchema = new Schema ({
	task: { type: String },
	howTo: { type: String }
});

const Things = mongoose.model("Things", ThingsSchema);

module.exports = Things;