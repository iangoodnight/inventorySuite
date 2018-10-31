import axios from "axios";

export default {
	// Computers functions
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
	// Completed PCs functions
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
	// Linux functions
	submitLinux: function(data) {
		return axios.post("/api/linux", data);
	},

	getLinux: function(){
		return axios.get("/api/linux");
	},

	changeLinux: function(id, data){
		return axios.put("/api/linux/" + id, data);
	},

	deleteLinux: function(delId){
		return axios.get("/api/linux/" + delId);
	},
	// Things functions
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
	},
	// ChromeMachines functions
	submitChrome: function(data) {
		return axios.post("/api/chrome", data);
	},

	getChrome: function(){
		return axios.get("/api/chrome");
	},

	changeChrome: function(id, data){
		return axios.put("/api/chrome/" + id, data);
	},

	deleteChrome: function(delId){
		return axios.get("/api/chrome/" + delId);
	}
};