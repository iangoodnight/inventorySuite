import axios from "axios";

export default {
	submitComputers: function(data) {
		return axios.post("/api/computers", data);
	},

	getComputers: function(){
		return axios.get("/api/computers");
	},

	changeComputers: function(id, data) {
		return axios.put("/api/computers/" + id, data);
	},

	deleteComputers: function(delId) {
		return axios.get("/api/computers/" + delId);
	},

	submitCompleted: function(data) {
		return axios.post("api/completed", data);
	},

	getCompleted: function() {
		return axios.get("/api/completed");
	},

	changeCompleted: function(id, data) {
		return axios.put("/api/completed/" + id, data);
	},

	deleteCompleted: function(delId) {
		return axios.get("/api/completed/" + delId);
	},

	submitThings: function(data) {
		return axios.post("/api/things", data);
	},

	getThings: function(){
		return axios.get("/api/things");
	},

	changeThings: function(id, data){
		return axios.put("/api/things/" + id, data);
	},

	deleteThings: function(delId){
		return axios.get("/api/things/" + delId);
	}
};