import axios from "axios";

export default {
	submitThings: function(data) {
		return axios.post("/api/things", data);
	},

	getThings: function(){
		return axios.get("/api/things");
	}
};