import axios from "axios";

export default {
	submitThings: function(data) {
		return axios.post("/api/things", data);
	},

	getThings: function(){
		return axios.get("/api/things");
	},

	changeThings: function(id, data){
		return axios.put("/api/things/" + id + "/", data);
	},

	deleteThings: function(id){
		return axios.get("/api/things/", id);
	}
};