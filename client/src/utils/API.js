import axios from "axios";

export default {
	// Cameras functions
	submitCameras: function(data) {
		return axios.post("/api/cameras", data);
	},
	getCameras: function(){
		return axios.get("/api/cameras");
	},
	changeCameras: function(id, data) {
		return axios.put("/api/cameras/" + id, data);
	},
	deleteCameras: function(delId) {
		return axios.get("/api/cameras/" + delId);
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

	// Network Devices functions
	submitNetwork: function(data) {
		return axios.post("api/network", data);
	},

	getNetwork: function() {
		return axios.get("/api/network");
	},

	changeNetwork: function(id, data) {
		return axios.put("/api/network/" + id, data);
	},

	deleteNetwork: function(delId) {
		return axios.get("/api/network/" + delId);
	},

	// Others functions
	submitOthers: function(data) {
		return axios.post("/api/others", data);
	},

	getOthers: function(){
		return axios.get("/api/others");
	},

	changeOthers: function(id, data){
		return axios.put("/api/others/" + id, data);
	},

	deleteOthers: function(delId){
		return axios.get("/api/others/" + delId);
	},

	// Phones functions
	submitPhones: function(data) {
		return axios.post("/api/phones", data);
	},

	getPhones: function(){
		return axios.get("/api/phones");
	},

	changePhones: function(id, data){
		return axios.put("/api/phones/" + id, data);
	},

	deletePhones: function(delId){
		return axios.get("/api/phones/" + delId);
	},

	// Printers functions
	submitPrinters: function(data) {
		return axios.post("/api/printers", data);
	},

	getPrinters: function(){
		return axios.get("/api/printers");
	},

	changePrinters: function(id, data){
		return axios.put("/api/printers/" + id, data);
	},

	deletePrinters: function(delId){
		return axios.get("/api/printers/" + delId);
	},

	// Radios functions
	submitRadios: function(data) {
		return axios.post("/api/radios", data);
	},

	getRadios: function(){
		return axios.get("/api/radios");
	},

	changeRadios: function(id, data){
		return axios.put("/api/radios/" + id, data);
	},

	deleteRadios: function(delId){
		return axios.get("/api/radios/" + delId);
	},

	// Servers functions
	submitServers: function(data) {
		return axios.post("/api/servers", data);
	},

	getServers: function(){
		return axios.get("/api/servers");
	},

	changeServers: function(id, data){
		return axios.put("/api/servers/" + id, data);
	},

	deleteServers: function(delId){
		return axios.get("/api/servers/" + delId);
	},

	// Tablets functions
	submitTablets: function(data) {
		return axios.post("/api/tablets", data);
	},

	getTablets: function(){
		return axios.get("/api/tablets");
	},

	changeTablets: function(id, data){
		return axios.put("/api/tablets/" + id, data);
	},

	deleteTablets: function(delId){
		return axios.get("/api/tablets/" + delId);
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
	}

};